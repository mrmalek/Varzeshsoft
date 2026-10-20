import { useState } from 'react'
import Button from './Button.jsx'
import Icon from './Icon.jsx'
import { contactMethods, facilityTypes } from '../data/site.js'

const persianDigits = '۰۱۲۳۴۵۶۷۸۹'
const arabicDigits = '٠١٢٣٤٥٦٧٨٩'

/** تبدیل ارقام فارسی/عربی به لاتین برای اعتبارسنجی شماره تماس */
export const normalizeDigits = (value = '') =>
  value.replace(/[۰-۹٠-٩]/g, (char) => {
    const fa = persianDigits.indexOf(char)
    if (fa > -1) return String(fa)
    const ar = arabicDigits.indexOf(char)
    return ar > -1 ? String(ar) : char
  })

const isValidMobile = (value) => /^09\d{9}$/.test(normalizeDigits(value).replace(/[\s-]/g, ''))

const isDemo = (type) => type === 'demo'

function validate(values, type) {
  const errors = {}

  if (!values.name.trim()) errors.name = 'نام و نام خانوادگی را وارد کنید.'
  else if (values.name.trim().length < 3) errors.name = 'نام وارد‌شده کوتاه است.'

  if (!values.mobile.trim()) errors.mobile = 'شماره تماس را وارد کنید.'
  else if (!isValidMobile(values.mobile))
    errors.mobile = 'شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود. مثال: ۰۹۱۲۳۴۵۶۷۸۹'

  if (isDemo(type)) {
    if (!values.facility.trim()) errors.facility = 'نام مجموعه ورزشی را وارد کنید.'
    if (!values.facilityType) errors.facilityType = 'نوع مجموعه را انتخاب کنید.'
    if (!values.city.trim()) errors.city = 'شهر مجموعه را وارد کنید.'
    if (!values.method) errors.method = 'روش تماس موردنظر را انتخاب کنید.'
  } else if (!values.message.trim()) {
    errors.message = 'متن پیام را وارد کنید.'
  }

  if (values.message.trim().length > 600) errors.message = 'متن پیام بیش از حد طولانی است.'

  return errors
}

/**
 * فرم درخواست دمو و فرم تماس.
 * داده‌ها به نقطهٔ پایانی واقعی برنامه (POST /api/demo-request یا /api/contact)
 * فرستاده می‌شوند و پیام موفقیت فقط پس از پاسخ موفق سرور نمایش داده می‌شود.
 */
export default function RequestForm({ type = 'demo', compact = false }) {
  const [values, setValues] = useState({
    name: '',
    mobile: '',
    facility: '',
    facilityType: '',
    city: '',
    method: contactMethods[0],
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [serverMessage, setServerMessage] = useState('')

  const update = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const endpoint = isDemo(type) ? '/api/demo-request' : '/api/contact'

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate(values, type)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle')
      setServerMessage('')
      return
    }

    setStatus('sending')
    setServerMessage('')

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, type }),
      })

      let payload = null
      try {
        payload = await response.json()
      } catch (parseError) {
        payload = null
      }

      if (response.ok && payload && payload.ok === true) {
        setStatus('success')
        setServerMessage(payload.message || '')
        setValues({
          name: '',
          mobile: '',
          facility: '',
          facilityType: '',
          city: '',
          method: contactMethods[0],
          message: '',
        })
        return
      }

      setStatus('error')
      if (payload && payload.errors) setErrors(payload.errors)
      setServerMessage(
        (payload && payload.message) ||
          'ارسال درخواست انجام نشد. لطفاً چند لحظه بعد دوباره تلاش کنید یا با ما تماس بگیرید.',
      )
    } catch (error) {
      setStatus('error')
      setServerMessage('ارتباط با سرور برقرار نشد. اتصال خود را بررسی کنید و دوباره تلاش کنید.')
    }
  }

  const fieldError = (field) =>
    errors[field] ? (
      <span className="field-error" role="alert" id={`${field}-error`}>
        {errors[field]}
      </span>
    ) : null

  const describedBy = (field) => (errors[field] ? `${field}-error` : undefined)

  if (status === 'success') {
    return (
      <div className="form-status form-status--success" role="status">
        <Icon name="CheckCircle2" size={26} />
        <h3 className="form-status__title">درخواست شما ثبت شد</h3>
        <p className="form-status__text">
          {serverMessage ||
            'کارشناسان ورزش سافت در اولین فرصت کاری با شما تماس می‌گیرند.'}
        </p>
        <Button variant="outline" size="sm" onClick={() => setStatus('idle')}>
          ثبت درخواست دیگر
        </Button>
      </div>
    )
  }

  return (
    <form className={`request-form${compact ? ' request-form--compact' : ''}`} onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="name">نام و نام خانوادگی</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={update('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy('name')}
            placeholder="مثال: محمد رضایی"
          />
          {fieldError('name')}
        </div>

        <div className="form-field">
          <label htmlFor="mobile">شماره موبایل</label>
          <input
            id="mobile"
            name="mobile"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.mobile}
            onChange={update('mobile')}
            aria-invalid={Boolean(errors.mobile)}
            aria-describedby={describedBy('mobile')}
            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
          />
          {fieldError('mobile')}
        </div>

        {isDemo(type) ? (
          <>
            <div className="form-field">
              <label htmlFor="facility">نام مجموعه ورزشی</label>
              <input
                id="facility"
                name="facility"
                type="text"
                value={values.facility}
                onChange={update('facility')}
                aria-invalid={Boolean(errors.facility)}
                aria-describedby={describedBy('facility')}
                placeholder="نام باشگاه یا مجموعه"
              />
              {fieldError('facility')}
            </div>

            <div className="form-field">
              <label htmlFor="facilityType">نوع مجموعه</label>
              <select
                id="facilityType"
                name="facilityType"
                value={values.facilityType}
                onChange={update('facilityType')}
                aria-invalid={Boolean(errors.facilityType)}
                aria-describedby={describedBy('facilityType')}
              >
                <option value="">انتخاب کنید…</option>
                {facilityTypes.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              {fieldError('facilityType')}
            </div>

            <div className="form-field">
              <label htmlFor="city">شهر</label>
              <input
                id="city"
                name="city"
                type="text"
                value={values.city}
                onChange={update('city')}
                aria-invalid={Boolean(errors.city)}
                aria-describedby={describedBy('city')}
                placeholder="مثال: تهران"
              />
              {fieldError('city')}
            </div>

            <div className="form-field">
              <label htmlFor="method">روش تماس موردنظر</label>
              <select
                id="method"
                name="method"
                value={values.method}
                onChange={update('method')}
                aria-invalid={Boolean(errors.method)}
                aria-describedby={describedBy('method')}
              >
                {contactMethods.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              {fieldError('method')}
            </div>
          </>
        ) : null}

        <div className="form-field form-field--full">
          <label htmlFor="message">
            {isDemo(type) ? 'توضیحات تکمیلی (اختیاری)' : 'متن پیام'}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={values.message}
            onChange={update('message')}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy('message')}
            placeholder={
              isDemo(type)
                ? 'اگر نیاز مشخصی دارید، مثلاً تعداد اعضا یا ماژول‌های موردنیاز، همین‌جا بنویسید.'
                : 'پرسش یا موضوع موردنظر خود را بنویسید.'
            }
          />
          {fieldError('message')}
        </div>
      </div>

      {status === 'error' && serverMessage ? (
        <p className="form-alert" role="alert">
          <Icon name="AlertCircle" size={16} />
          {serverMessage}
        </p>
      ) : null}

      <div className="form-actions">
        <Button type="submit" variant="gold" size="lg" disabled={status === 'sending'}>
          {status === 'sending' ? 'در حال ارسال…' : isDemo(type) ? 'ارسال درخواست دمو' : 'ارسال پیام'}
        </Button>
        <p className="form-note">
          اطلاعات این فرم فقط برای پاسخ به همین درخواست استفاده می‌شود.
        </p>
      </div>
    </form>
  )
}
