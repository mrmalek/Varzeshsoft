import Button from '../components/Button.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import Icon from '../components/Icon.jsx'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import usePageMeta from '../components/usePageMeta.js'
import { solutionsImage } from '../data/images.js'
import { solutions, solutionsNote } from '../data/solutions.js'
import { site } from '../data/site.js'

const steps = [
  {
    icon: 'MessageSquare',
    title: 'درخواست دمو',
    text: 'فرم درخواست دمو را تکمیل می‌کنید و کارشناسان با شما هماهنگ می‌کنند.',
  },
  {
    icon: 'LayoutDashboard',
    title: 'بررسی نیازها',
    text: 'با توجه به نوع مجموعه، تعداد اعضا و رویهٔ فعلی، ماژول‌ها و خدمات موردنیاز مشخص می‌شود.',
  },
  {
    icon: 'Server',
    title: 'راه‌اندازی و آموزش',
    text: 'نصب روی سرور مجموعه، تنظیم شبکه و آموزش کارکنان مطابق خدمات شرکت.',
  },
]

export default function Solutions() {
  usePageMeta({
    title: 'راهکارها',
    description:
      'راهکار ورزش سافت برای انواع مجموعه‌های ورزشی: مجموعه‌های چندمنظوره، باشگاه‌های بدنسازی، استخرها، آکادمی‌ها و باشگاه‌های رزمی.',
  })

  return (
    <article>
      <PageHero
        breadcrumbs={[{ label: 'راهکارها' }]}
        eyebrow="راهکارها"
        title="راهکار متناسب با نوع مجموعهٔ ورزشی"
        description="ورزش سافت برای انواع مجموعه‌های ورزشی قابل تنظیم است. تناسب نهایی راهکار با نیاز هر مجموعه، در جلسهٔ مشاوره بررسی می‌شود."
        actions={
          <>
            <Button to={site.demoPath} variant="gold">
              درخواست دمو و مشاوره
            </Button>
            <Button to="/features" variant="outline-light">
              مشاهده امکانات
            </Button>
          </>
        }
      />

      <section className="section">
        <div className="container">
          <ul className="solution-grid">
            {solutions.map((item, index) => (
              <Reveal as="li" className="solution-card" key={item.title} delay={index * 0.04}>
                <span className="solution-card__icon">
                  <Icon name={item.icon} size={24} />
                </span>
                <h2 className="solution-card__title">{item.title}</h2>
                <p className="solution-card__text">{item.text}</p>
              </Reveal>
            ))}
          </ul>
          <p className="section-footnote">{solutionsNote}</p>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container split">
          <Reveal className="split__media">
            <img src={solutionsImage} alt="" loading="lazy" width="1200" height="800" />
          </Reveal>
          <Reveal className="split__content" delay={0.05}>
            <h2 className="detail-heading">از درخواست دمو تا راه‌اندازی</h2>
            <ol className="step-list">
              {steps.map((step, index) => (
                <li className="step-item" key={step.title}>
                  <span className="step-item__number">{['۱', '۲', '۳'][index]}</span>
                  <span className="step-item__icon">
                    <Icon name={step.icon} size={20} />
                  </span>
                  <span className="step-item__body">
                    <span className="step-item__title">{step.title}</span>
                    <span className="step-item__text">{step.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <CtaBanner secondaryTo="/services" secondaryLabel="مشاهده خدمات تکمیلی" />
    </article>
  )
}
