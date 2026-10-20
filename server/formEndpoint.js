import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

/**
 * نقطهٔ پایانی فرم‌های سایت (درخواست دمو و تماس).
 *
 * در این محیط، درخواست‌ها به‌صورت واقعی دریافت و در یک فایل JSONL بیرون از مخزن
 * ذخیره می‌شوند؛ بنابراین پیام موفقیت فقط پس از ثبت واقعی داده نمایش داده می‌شود.
 *
 * محل ذخیره پیش‌فرض: <tmp>/varzeshsoft-submissions (قابل تغییر با FORM_STORE_DIR)
 * و برای اتصال به ایمیل، CRM یا سامانهٔ داخلی شرکت، همین فایل را جایگزین کنید.
 */
const STORE_DIR = process.env.FORM_STORE_DIR || path.join(os.tmpdir(), 'varzeshsoft-submissions')
const MAX_BODY = 64 * 1024

const persianDigits = '۰۱۲۳۴۵۶۷۸۹'
const arabicDigits = '٠١٢٣٤٥٦٧٨٩'

const normalizeDigits = (value = '') =>
  value.replace(/[۰-۹٠-٩]/g, (char) => {
    const fa = persianDigits.indexOf(char)
    if (fa > -1) return String(fa)
    const ar = arabicDigits.indexOf(char)
    return ar > -1 ? String(ar) : char
  })

const clean = (value) => String(value ?? '').replace(/\s+/g, ' ').trim()

const isValidMobile = (value) => /^09\d{9}$/.test(normalizeDigits(value).replace(/[\s-]/g, ''))

function validate(payload = {}) {
  const errors = {}
  const name = clean(payload.name)
  const mobile = clean(payload.mobile)
  const type = payload.type === 'contact' ? 'contact' : 'demo'

  if (!name) errors.name = 'نام و نام خانوادگی را وارد کنید.'
  else if (name.length < 3) errors.name = 'نام وارد‌شده کوتاه است.'

  if (!mobile) errors.mobile = 'شماره تماس را وارد کنید.'
  else if (!isValidMobile(mobile)) errors.mobile = 'شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود.'

  if (type === 'demo') {
    if (!clean(payload.facility)) errors.facility = 'نام مجموعه ورزشی را وارد کنید.'
    if (!clean(payload.facilityType)) errors.facilityType = 'نوع مجموعه را انتخاب کنید.'
    if (!clean(payload.city)) errors.city = 'شهر مجموعه را وارد کنید.'
    if (!clean(payload.method)) errors.method = 'روش تماس موردنظر را انتخاب کنید.'
  } else if (!clean(payload.message)) {
    errors.message = 'متن پیام را وارد کنید.'
  }

  if (clean(payload.message).length > 600) errors.message = 'متن پیام بیش از حد طولانی است.'

  return {
    errors,
    type,
    record: {
      receivedAt: new Date().toISOString(),
      type,
      name,
      mobile: normalizeDigits(mobile),
      facility: clean(payload.facility) || null,
      facilityType: clean(payload.facilityType) || null,
      city: clean(payload.city) || null,
      method: clean(payload.method) || null,
      message: clean(payload.message) || null,
    },
  }
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0
    const chunks = []
    req.on('data', (chunk) => {
      size += chunk.length
      if (size > MAX_BODY) {
        reject(new Error('payload_too_large'))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8')
      if (!raw) return resolve({})
      try {
        resolve(JSON.parse(raw))
      } catch (error) {
        reject(new Error('invalid_json'))
      }
    })
    req.on('error', reject)
  })
}

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload)
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(body)
}

async function handle(req, res) {
  const url = (req.originalUrl || req.url || '').split('?')[0]
  const route = url.replace(/^\/api/, '')

  if (route !== '/demo-request' && route !== '/contact') {
    sendJson(res, 404, { ok: false, message: 'نقطهٔ پایانی ناشناخته است.' })
    return
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    sendJson(res, 405, { ok: false, message: 'این نقطهٔ پایانی فقط درخواست POST را می‌پذیرد.' })
    return
  }

  let payload
  try {
    payload = await readJsonBody(req)
  } catch (error) {
    const tooLarge = error.message === 'payload_too_large'
    sendJson(res, tooLarge ? 413 : 400, {
      ok: false,
      message: tooLarge ? 'حجم درخواست بیش از حد مجاز است.' : 'داده‌های ارسالی معتبر نیستند.',
    })
    return
  }

  const { errors, record, type } = validate(payload)

  if (Object.keys(errors).length > 0) {
    sendJson(res, 422, {
      ok: false,
      errors,
      message: 'لطفاً خطاهای مشخص‌شده در فرم را برطرف کنید.',
    })
    return
  }

  try {
    fs.mkdirSync(STORE_DIR, { recursive: true })
    fs.appendFileSync(path.join(STORE_DIR, `${type}.jsonl`), `${JSON.stringify(record)}\n`, 'utf8')
  } catch (error) {
    sendJson(res, 500, {
      ok: false,
      message: 'ثبت درخواست در سرور انجام نشد. لطفاً بعداً دوباره تلاش کنید.',
    })
    return
  }

  // ثبت بدون دادهٔ شخصی در لاگ سرور
  console.log(`[forms] ${type} submission stored at ${record.receivedAt}`)

  sendJson(res, 200, {
    ok: true,
    message:
      type === 'demo'
        ? 'درخواست دمو ثبت شد. کارشناسان ورزش سافت در اولین فرصت کاری با شما تماس می‌گیرند.'
        : 'پیام شما ثبت شد. در اولین فرصت کاری پاسخ داده می‌شود.',
  })
}

export default function formEndpoint() {
  const attach = (server) => {
    server.middlewares.use('/api', (req, res, next) => {
      const url = (req.originalUrl || req.url || '').split('?')[0]
      if (!url.startsWith('/api/')) return next()
      handle(req, res).catch(() => {
        if (!res.writableEnded) {
          sendJson(res, 500, { ok: false, message: 'خطای غیرمنتظره در سرور.' })
        }
      })
    })
  }

  return {
    name: 'varzeshsoft-form-endpoint',
    configureServer: attach,
    configurePreviewServer: attach,
  }
}
