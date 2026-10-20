import AppMockup from '../components/AppMockup.jsx'
import Button from '../components/Button.jsx'
import { heroImage } from '../data/images.js'
import { site } from '../data/site.js'

export default function Hero() {
  const scrollToFeatures = (event) => {
    event.preventDefault()
    const target = document.getElementById('features')
    if (!target) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const top = target.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <section className="hero" aria-labelledby="hero-title">
      <img className="hero__bg" src={heroImage} alt="" aria-hidden="true" />
      <span className="hero__overlay" aria-hidden="true" />
      <span className="hero__glow" aria-hidden="true" />

      <div className="container hero__inner">
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
            نصب روی سرور مجموعه · دسترسی سیستم‌های متصل به شبکه از طریق IP · بدون وابستگی به سرویس
            ابری
          </p>
        </div>

        <div className="hero__visual">
          <AppMockup device="dashboard" screen="overview" companion />
        </div>
      </div>
    </section>
  )
}
