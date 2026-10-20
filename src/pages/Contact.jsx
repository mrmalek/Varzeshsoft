import Icon from '../components/Icon.jsx'
import PageHero from '../components/PageHero.jsx'
import Placeholder from '../components/Placeholder.jsx'
import RequestForm from '../components/RequestForm.jsx'
import Reveal from '../components/Reveal.jsx'
import usePageMeta from '../components/usePageMeta.js'
import { site } from '../data/site.js'

export default function Contact() {
  usePageMeta({
    title: 'تماس با ما',
    description:
      'راه‌های تماس با ورزش سافت و فرم ارسال پیام؛ برای دریافت اطلاعات محصول و مشاوره با کارشناسان در ارتباط باشید.',
  })

  const rows = [
    { icon: 'Phone', label: 'تلفن', value: site.contact.phone, placeholder: 'شماره تماس شرکت' },
    { icon: 'Mail', label: 'ایمیل', value: site.contact.email, placeholder: 'ایمیل شرکت' },
    { icon: 'MapPin', label: 'نشانی', value: site.contact.address, placeholder: 'نشانی دفتر' },
    {
      icon: 'Clock',
      label: 'ساعات پاسخ‌گویی',
      value: site.contact.supportHours,
      placeholder: 'ساعات پاسخ‌گویی',
    },
  ]

  return (
    <article>
      <PageHero
        breadcrumbs={[{ label: 'تماس با ما' }]}
        eyebrow="تماس با ما"
        title="برای هماهنگی دمو و مشاوره با ما در تماس باشید"
        description="پرسش‌های خود دربارهٔ نرم‌افزار، خدمات تکمیلی یا راه‌اندازی را برای ما بفرستید؛ کارشناسان ما پاسخ می‌دهند."
      />

      <section className="section">
        <div className="container contact-layout">
          <Reveal className="contact-info">
            <h2 className="detail-heading">راه‌های تماس</h2>
            <ul className="contact-list">
              {rows.map((row) => (
                <li className="contact-list__item" key={row.label}>
                  <span className="contact-list__icon">
                    <Icon name={row.icon} size={18} />
                  </span>
                  <span className="contact-list__body">
                    <span className="contact-list__label">{row.label}</span>
                    <span className="contact-list__value">
                      {row.value ? row.value : <Placeholder>{row.placeholder}</Placeholder>}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="contact-note">
              اطلاعات تماس تأییدشده در فایل <code>src/data/site.js</code> قابل درج است. تا آن زمان
              می‌توانید از فرم همین صفحه استفاده کنید.
            </p>
          </Reveal>

          <Reveal className="contact-form-wrap" delay={0.05}>
            <h2 className="detail-heading">ارسال پیام</h2>
            <RequestForm type="contact" />
          </Reveal>
        </div>
      </section>
    </article>
  )
}
