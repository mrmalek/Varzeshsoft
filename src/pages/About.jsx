import CtaBanner from '../components/CtaBanner.jsx'
import Icon from '../components/Icon.jsx'
import PageHero from '../components/PageHero.jsx'
import Placeholder from '../components/Placeholder.jsx'
import Reveal from '../components/Reveal.jsx'
import usePageMeta from '../components/usePageMeta.js'
import { aboutImage } from '../data/images.js'
import { site } from '../data/site.js'

const companyRows = [
  { label: 'نام حقوقی شرکت', value: site.brand.legalFa },
  { label: 'سال تأسیس', value: null, placeholder: 'سال تأسیس شرکت' },
  { label: 'تعداد همکاران', value: null, placeholder: 'تعداد همکاران' },
  { label: 'نشانی دفتر', value: site.contact.address, placeholder: 'نشانی دفتر' },
]

export default function About() {
  usePageMeta({
    title: 'درباره ما',
    description:
      'ورزش سافت محصول شرکت رویال مهر رایانه است؛ نرم‌افزار مدیریت مجموعه‌های ورزشی که روی سرور مجموعه نصب می‌شود.',
  })

  return (
    <article>
      <PageHero
        breadcrumbs={[{ label: 'درباره ما' }]}
        eyebrow="درباره ورزش سافت"
        title="نرم‌افزار ورزش سافت، ساختهٔ رویال مهر رایانه"
        description="ورزش سافت برای مدیریت یکپارچهٔ مجموعه‌های ورزشی طراحی شده است؛ از عضویت و قرارداد تا مالی، اطلاع‌رسانی و گزارش‌های مدیریتی."
      />

      <section className="section">
        <div className="container split">
          <Reveal className="split__content">
            <h2 className="detail-heading">درباره ورزش سافت</h2>
            <p className="detail-text">
              ورزش سافت یک نرم‌افزار مدیریت مجموعه‌های ورزشی است که روی سرور داخلی مجموعه نصب
              می‌شود. سیستم‌های متصل به شبکهٔ داخلی، از طریق آدرس IP سرور به نرم‌افزار دسترسی دارند
              و اطلاعات مجموعه در همان سرور نگه‌داری می‌شود.
            </p>
            <p className="detail-text">
              این نرم‌افزار ده ماژول اصلی دارد — از پنل مشتریان و قراردادها تا حسابداری، اتوماسیون و
              پشتیبان‌گیری اتومات — و در کنار آن، خدمات تکمیلی مانند تجهیزات ثبت تردد، شبکه،
              کیوسک‌های پذیرش و طراحی سایت ارائه می‌شود.
            </p>
            <p className="detail-text">
              تولید و توسعهٔ این محصول توسط {site.brand.legalFa} انجام می‌شود. شرح کامل سابقهٔ شرکت
              و تیم توسعه در این بخش قابل تکمیل است.
            </p>
          </Reveal>
          <Reveal className="split__media" delay={0.05}>
            <img src={aboutImage} alt="" loading="lazy" width="1200" height="800" />
          </Reveal>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <h2 className="detail-heading">رویکرد ما</h2>
          <ul className="approach-grid">
            <li className="approach-card">
              <Icon name="Server" size={22} />
              <h3>تمرکز بر شبکهٔ داخلی مجموعه</h3>
              <p>
                محصول برای اجرا روی سرور خود مجموعه طراحی شده است؛ نه به‌عنوان سرویسی وابسته به
                اینترنت.
              </p>
            </li>
            <li className="approach-card">
              <Icon name="Puzzle" size={22} />
              <h3>قابل توسعه بر اساس نیاز</h3>
              <p>امکان افزودن قابلیت‌های موردنیاز مجموعه بر اساس بررسی و هماهنگی.</p>
            </li>
            <li className="approach-card">
              <Icon name="Headphones" size={22} />
              <h3>همراهی در راه‌اندازی و استفاده</h3>
              <p>از نصب و تنظیم شبکه تا آموزش کارکنان، مطابق خدمات واقعی شرکت.</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="detail-heading">اطلاعات شرکت</h2>
          <dl className="info-table">
            {companyRows.map((row) => (
              <div className="info-table__row" key={row.label}>
                <dt>{row.label}</dt>
                <dd>
                  {row.value ? row.value : <Placeholder>{row.placeholder}</Placeholder>}
                </dd>
              </div>
            ))}
          </dl>
          <p className="section-footnote">
            موارد نشان‌دار در فایل <code>src/data/site.js</code> قابل تکمیل هستند؛ هیچ اطلاعات
            ساختگی در سایت درج نشده است.
          </p>
        </div>
      </section>

      <CtaBanner secondaryTo="/features" secondaryLabel="مشاهده امکانات" />
    </article>
  )
}
