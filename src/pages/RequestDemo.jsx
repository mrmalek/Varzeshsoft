import Icon from '../components/Icon.jsx'
import PageHero from '../components/PageHero.jsx'
import RequestForm from '../components/RequestForm.jsx'
import Reveal from '../components/Reveal.jsx'
import usePageMeta from '../components/usePageMeta.js'

const expectations = [
  {
    icon: 'Calendar',
    title: 'هماهنگی زمان جلسه',
    text: 'پس از ثبت درخواست، برای تعیین زمان جلسهٔ دمو با شما هماهنگ می‌شود.',
  },
  {
    icon: 'LayoutDashboard',
    title: 'نمایش نرم‌افزار',
    text: 'ماژول‌های موردنیاز مجموعهٔ شما نمایش داده می‌شود و می‌توانید پرسش‌های خود را بپرسید.',
  },
  {
    icon: 'Server',
    title: ' بررسی راه‌اندازی',
    text: 'شرایط نصب روی سرور مجموعه، شبکه و خدمات تکمیلی موردنیاز بررسی می‌شود.',
  },
]

export default function RequestDemo() {
  usePageMeta({
    title: 'درخواست دمو و مشاوره',
    description:
      'فرم درخواست دمو ورزش سافت؛ نام، شماره تماس، نام و نوع مجموعه را ثبت کنید تا کارشناسان با شما هماهنگ کنند.',
  })

  return (
    <article>
      <PageHero
        breadcrumbs={[{ label: 'درخواست دمو' }]}
        eyebrow="درخواست دمو و مشاوره"
        title="نرم‌افزار را با نیازهای مجموعهٔ خودتان ببینید"
        description="فرم زیر را تکمیل کنید؛ کارشناسان ورزش سافت در اولین فرصت کاری با شما تماس می‌گیرند و زمان جلسهٔ دمو را هماهنگ می‌کنند."
      />

      <section className="section">
        <div className="container contact-layout">
          <Reveal className="contact-form-wrap">
            <h2 className="detail-heading">فرم درخواست دمو</h2>
            <RequestForm type="demo" />
          </Reveal>

          <Reveal className="contact-info" delay={0.05}>
            <h2 className="detail-heading">بعد از ثبت درخواست</h2>
            <ul className="expect-list">
              {expectations.map((item) => (
                <li className="expect-item" key={item.title}>
                  <span className="expect-item__icon">
                    <Icon name={item.icon} size={19} />
                  </span>
                  <span className="expect-item__body">
                    <span className="expect-item__title">{item.title}</span>
                    <span className="expect-item__text">{item.text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="contact-note">
              جلسهٔ دمو بر پایهٔ امکانات واقعی محصول برگزار می‌شود و هیچ آمار یا وعدهٔ ارزیابی‌نشده‌ای
              ارائه نمی‌شود.
            </p>
          </Reveal>
        </div>
      </section>
    </article>
  )
}
