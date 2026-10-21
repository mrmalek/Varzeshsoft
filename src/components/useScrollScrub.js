import { useEffect, useRef, useState } from 'react'
import { heroVideo } from '../data/media.js'

/**
 * هیرو اسکرول‌محور: موقعیت اسکرول کاربر تایم‌لاین ویدیو را جلو و عقب می‌برد.
 *
 * اصول پیاده‌سازی
 * ۱) ویدیو هرگز play() نمی‌شود و loop ندارد؛ تنها ابزار ما video.currentTime است.
 * ۲) هندلر scroll فقط «هدف» را ثبت می‌کند و هیچ نوشتنی روی ویدیو انجام نمی‌دهد.
 * ۳) حلقهٔ requestAnimationFrame زمان جاری را با میان‌یابی نمایی به سمت هدف می‌برد
 *    تا حرکت نرم و پیوسته باشد (بدون پرش فریم و بدون تأخیر محسوس).
 * ۴) currentTime تنها وقتی به مرورگر داده می‌شود که اختلاف با فریم فعلی معنادار
 *    باشد و seek قبلی تمام شده باشد؛ این کار سیل درخواست‌های seek را می‌بندد.
 * ۵) پیشرفت اسکرول در state نگه داشته نمی‌شود؛ رندر مجدد React در کار نیست و
 *    همه‌چیز مستقیم روی DOM نوشته می‌شود.
 */

/** اختلاف زمانی کمتر از این مقدار (ثانیه) به مرورگر داده نمی‌شود */
const MIN_SEEK_DELTA = 1 / 48
/** ضریب نرم‌سازی حالت عادی؛ کمتر = نرم‌تر، بیشتر = چسبنده‌تر به اسکرول */
const SMOOTHING = 0.16
/** وقتی فاصلهٔ هدف و فریم جاری زیاد شود (اسکرول سریع یا پرش)، سریع‌تر جبران می‌کنیم */
const SMOOTHING_FAST = 0.34
/** آستانهٔ پیشرفت که از آن به بعد ضریب تندتر استفاده می‌شود */
const SMOOTHING_GAP = 0.05
/** سهم ابتدایی تایم‌لاین که در آن متن هیرو آرام محو می‌شود */
const TEXT_FADE_SPAN = 0.3
const FRAME_MS = 1000 / 60
/** اگر متادیتای ویدیو تا این زمان نرسد، هیرو به تصویر جایگزین برمی‌گردد */
const METADATA_TIMEOUT = 15000
/** اگر تا این زمان بافر کامل نشود با همان بافر موجود شروع می‌کنیم تا کاربر معطل نماند */
const READY_TIMEOUT = 12000

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export default function useScrollScrub({ enabled }) {
  const rootRef = useRef(null)
  const trackRef = useRef(null)
  const stageRef = useRef(null)
  const contentRef = useRef(null)
  const videoRef = useRef(null)
  const barRef = useRef(null)
  /** loading | ready | failed */
  const [status, setStatus] = useState('loading')

  const active = enabled && status !== 'failed'

  useEffect(() => {
    if (!active) return undefined

    const root = rootRef.current
    const track = trackRef.current
    const stage = stageRef.current
    const content = contentRef.current
    const video = videoRef.current
    const bar = barRef.current
    if (!root || !track || !stage || !video) return undefined

    // نسخهٔ سبک برای موبایل یا وقتی کاربر «صرفه‌جویی داده» را روشن کرده است
    const wantsMobile =
      window.matchMedia(`(max-width: ${heroVideo.mobileMaxWidth}px)`).matches ||
      (navigator.connection && navigator.connection.saveData === true)
    const source = wantsMobile ? heroVideo.mobile : heroVideo.desktop
    if (video.getAttribute('src') !== source) {
      video.src = source
      video.load()
    }
    video.pause()

    let duration = Number.isFinite(video.duration) ? video.duration : 0
    let trackTop = 0
    let trackRange = 1
    let target = 0 // پیشرفت خواسته‌شده توسط اسکرول
    let current = 0 // پیشرفت نرم‌شده
    let written = -1 // آخرین زمانی که به currentTime داده شده
    let rafId = 0
    let lastFrameAt = 0
    let ready = false
    let disposed = false

    const measure = () => {
      const rect = track.getBoundingClientRect()
      const stageHeight = stage.getBoundingClientRect().height || window.innerHeight
      trackTop = rect.top + window.scrollY
      trackRange = Math.max(rect.height - stageHeight, 1)
    }

    const readProgress = () => clamp((window.scrollY - trackTop) / trackRange, 0, 1)

    const paintContent = () => {
      const raw = clamp(current / TEXT_FADE_SPAN, 0, 1)
      const eased = raw * raw * (3 - 2 * raw)
      if (content) {
        content.style.opacity = String(1 - eased)
        content.style.transform = `translate3d(0, ${(-26 * eased).toFixed(2)}px, 0)`
      }
      root.classList.toggle('is-dimmed', eased > 0.55)
      if (current > 0.004) root.classList.add('is-scrolled')
    }

    const frame = (now) => {
      rafId = 0
      const elapsed = lastFrameAt ? Math.min(now - lastFrameAt, 64) : FRAME_MS
      lastFrameAt = now

      const delta = target - current
      // فاصلهٔ زیاد (اسکرول سریع یا پرش) تندتر جبران می‌شود تا حس تأخیر ایجاد نشود؛
      // حرکت‌های کوچک با ضریب ملایم‌تر نرم می‌مانند. ضریب به زمان فریم گره خورده
      // است تا نرخ فریم‌های ۶۰/۹۰/۱۲۰ هرتز نتیجهٔ یکسانی بدهند.
      const factor = Math.abs(delta) > SMOOTHING_GAP ? SMOOTHING_FAST : SMOOTHING
      current += delta * (1 - Math.pow(1 - factor, elapsed / FRAME_MS))
      if (Math.abs(target - current) < 0.0004) current = target

      if (duration > 0 && ready) {
        // آخرین فریم را نشان می‌دهیم نه قاب سیاهِ بعد از پایان تایم‌لاین
        const wanted = clamp(current, 0, 1) * duration
        const next = Math.min(wanted, Math.max(duration - 1 / 30, 0))
        // نوشتن در میانهٔ یک seek نادیده گرفته می‌شود؛ مگر هدف خیلی جلو افتاده باشد
        const free = !video.seeking
        if (Math.abs(next - written) >= MIN_SEEK_DELTA && (free || Math.abs(next - written) > 0.5)) {
          written = next
          video.currentTime = next
        }
      }

      paintContent()

      if (Math.abs(target - current) > 0.0004) {
        rafId = requestAnimationFrame(frame)
      } else {
        lastFrameAt = 0
      }
    }

    const requestFrame = () => {
      if (disposed || rafId) return
      rafId = requestAnimationFrame(frame)
    }

    // هندلر اسکرول: فقط هدف را ثبت می‌کند (passive، بدون نوشتن روی ویدیو)
    const onScroll = () => {
      target = readProgress()
      requestFrame()
    }

    const onResize = () => {
      measure()
      target = readProgress()
      requestFrame()
    }

    const updateBar = () => {
      if (!bar || ready) return
      const total = duration || video.duration || 0
      let ratio = 0
      if (total > 0 && video.buffered.length) {
        for (let i = 0; i < video.buffered.length; i += 1) {
          if (video.buffered.start(i) < 0.2) ratio = Math.max(ratio, video.buffered.end(i) / total)
        }
      } else if (video.readyState >= 1) {
        ratio = 0.08
      }
      bar.style.transform = `scaleX(${clamp(ratio, 0.05, 1).toFixed(3)})`
    }

    const markReady = () => {
      if (ready || disposed) return
      ready = true
      measure()
      target = readProgress()
      // اگر کاربر پیش از آماده شدن ویدیو اسکرول کرده باشد، از همان‌جا ادامه می‌دهیم
      current = clamp(current, 0, target)
      written = -1
      requestFrame()
      updateBar()
      setStatus('ready')
    }

    const onLoadedMetadata = () => {
      duration = Number.isFinite(video.duration) ? video.duration : 0
      measure()
      target = readProgress()
      current = target
      written = -1
      requestFrame()
      updateBar()
    }

    const maybeReady = () => {
      if (ready) return
      const total = duration || video.duration || 0
      // تا زمانی که کل تایم‌لاین در دسترس نباشد، اسکرول پشت شبکه می‌لرزد
      const bufferedToEnd =
        video.readyState >= 3 &&
        video.buffered.length > 0 &&
        video.buffered.end(video.buffered.length - 1) >= total - 0.25
      if (bufferedToEnd) markReady()
      else updateBar()
    }

    const onCanPlayThrough = () => markReady()
    const onError = () => {
      if (!disposed) setStatus('failed')
    }
    // محافظ: ویدیو نباید خودش پخش شود
    const onPlay = () => video.pause()

    const metadataTimer = window.setTimeout(() => {
      if (!duration) onError()
    }, METADATA_TIMEOUT)
    const readyTimer = window.setTimeout(() => {
      if (!ready && video.readyState >= 2) markReady()
    }, READY_TIMEOUT)

    measure()
    target = readProgress()
    current = target
    paintContent()
    // اگر افکت پیش از این یک‌بار اجرا شده باشد (تغییر تنظیمات سیستم)، وضعیت را همگام می‌کنیم
    if (video.readyState >= 1) onLoadedMetadata()
    if (video.readyState >= 2) maybeReady()

    video.addEventListener('loadedmetadata', onLoadedMetadata)
    video.addEventListener('loadeddata', updateBar)
    video.addEventListener('canplaythrough', onCanPlayThrough)
    video.addEventListener('progress', maybeReady)
    video.addEventListener('error', onError)
    video.addEventListener('play', onPlay)
    video.addEventListener('playing', onPlay)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)

    return () => {
      disposed = true
      if (rafId) cancelAnimationFrame(rafId)
      window.clearTimeout(metadataTimer)
      window.clearTimeout(readyTimer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      video.removeEventListener('loadeddata', updateBar)
      video.removeEventListener('canplaythrough', onCanPlayThrough)
      video.removeEventListener('progress', maybeReady)
      video.removeEventListener('error', onError)
      video.removeEventListener('play', onPlay)
      video.removeEventListener('playing', onPlay)
      video.pause()
      if (content) {
        content.style.opacity = ''
        content.style.transform = ''
      }
      root.classList.remove('is-scrolled', 'is-dimmed')
    }
  }, [active])

  return { rootRef, trackRef, stageRef, contentRef, videoRef, barRef, active, status }
}
