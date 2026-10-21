import AppMockup from '../components/AppMockup.jsx'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import usePrefersReducedMotion from '../components/usePrefersReducedMotion.js'
import useScrollScrub from '../components/useScrollScrub.js'
import { heroImage } from '../data/images.js'
import { heroVideo } from '../data/media.js'
import { site } from '../data/site.js'

/**
 * هیرو صفحهٔ اصلی.
 *
 * در حالت عادی (و در حالت «کاهش حرکت») همان هیروی تصویری قبلی نمایش داده می‌شود.
 * در حالت سینمایی، ویدیو جانشین تصویر پس‌زمینه می‌شود و موقعیت اسکرول کاربر
 * تایم‌لاین ویدیو را از فریم اول تا فریم آخر کنترل می‌کند (بدون پخش خودکار).
 * قاب ویدیو در طول مسیر اسکرول چسبان (sticky) می‌ماند تا حس حرکت در صحنه ایجاد شود.
 */
export default function Hero() {
  const reducedMotion = usePrefersReducedMotion()
  const videoEnabled = !reducedMotion
  const { rootRef, trackRef, stageRef, contentRef, videoRef, barRef, active, status } =
    useScrollScrub({ enabled: videoEnabled })

  const className = ['hero', active ? 'hero--cinematic' : '', active && status === 'ready' ? 'is-ready' : '']
    .filter(Boolean)
    .join(' ')

  const scrollToFeatures = (event) => {
    event.preventDefault()
    const target = document.getElementById('features')
    if (!target) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const top = target.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <section
      className={className}
      ref={rootRef}
      style={{ '--hero-track': heroVideo.trackHeight }}
      aria-labelledby="hero-title"
    >
      <div className="hero__track" ref={trackRef}>
        <div className="hero__stage" ref={stageRef}>
          {/* تصویر پایه: هم تا آماده شدن ویدیو دیده می‌شود و هم جانشین ویدیو در صورت خطا */}
          <img className="hero__bg" src={heroImage} alt="" aria-hidden="true" />

          {videoEnabled ? (
            <video
              className="hero__video"
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              tabIndex={-1}
              aria-hidden="true"
            />
          ) : null}

          <span className="hero__overlay" aria-hidden="true" />
          {active ? <span className="hero__scrim" aria-hidden="true" /> : null}
          <span className="hero__glow" aria-hidden="true" />

          <div className="container hero__inner" ref={contentRef}>
            <div className="hero__content">
              <span className="hero__eyebrow">نرم‌افزار مدیریت مجموعه‌های ورزشی</span>
              <h1 className="hero__title" id="hero-title">
                همه چیز تحت کنترل
                <br />
                مدیریت آسان‌تر
                <br />
                مجموعه ورزشی
              </h1>
              <p className="hero__description">
                ورزش سافت، راهکاری جامع برای مدیریت حرفه‌ای مجموعه‌های ورزشی است. با اتوماسیون
                فرایندها، مدیریت امور مالی و عملیاتی مجموعه خود را ساده‌تر و سریع‌تر کنید.
              </p>
              <div className="hero__actions">
                <Button to={site.demoPath} variant="gold" size="lg">
                  درخواست دمو و مشاوره
                </Button>
                <Button href="#features" variant="outline-light" size="lg" onClick={scrollToFeatures}>
                  مشاهده امکانات
                </Button>
              </div>
              <p className="hero__note">
                نصب روی سرور مجموعه · دسترسی سیستم‌های متصل به شبکه از طریق IP · بدون وابستگی به
                سرویس ابری
              </p>
            </div>

            <div className="hero__visual">
              <AppMockup device="dashboard" screen="overview" companion />
            </div>
          </div>

          {active ? (
            <div className="hero__loader" role="status">
              <span className="hero__loader-track">
                <span className="hero__loader-bar" ref={barRef} />
              </span>
              <span className="hero__loader-label">در حال آماده‌سازی تجربهٔ تصویری</span>
            </div>
          ) : null}

          {active ? (
            <span className="hero__hint">
              <Icon name="ChevronDown" size={15} />
              برای حرکت در صحنه اسکرول کنید
            </span>
          ) : null}
        </div>
      </div>
    </section>
  )
}
