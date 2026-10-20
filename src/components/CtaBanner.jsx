import Button from './Button.jsx'
import Reveal from './Reveal.jsx'
import { ctaImage } from '../data/images.js'
import { site } from '../data/site.js'

/**
 * بنر پایانی سایت.
 *
 * جای آمار و ارقام مشتریان (که هنوز تأیید نشده‌اند)، سه مزیت قابل‌راستی‌آزمایی
 * محصول نمایش داده می‌شود؛ هیچ عدد یا آمار ساختگی در سایت وجود ندارد.
 */
const defaultBlocks = [
  { value: '۱۰', label: 'ماژول یکپارچه در یک نرم‌افزار' },
  { value: '۶', label: 'خدمت تکمیلی و تجهیزات قابل ارائه' },
  { value: 'شبکه داخلی', label: 'نصب روی سرور مجموعه و دسترسی با IP' },
]

export default function CtaBanner({
  title = 'آماده‌اید مجموعه ورزشی خود را به سطح بالاتری ببرید؟',
  description = 'برای دریافت دمو و مشاوره رایگان با ما در ارتباط باشید.',
  primaryLabel = 'درخواست دمو و مشاوره',
  primaryTo = site.demoPath,
  secondaryTo = '/features',
  secondaryLabel = 'مشاهده امکانات',
  blocks = defaultBlocks,
}) {
  return (
    <section className="cta-banner" aria-labelledby="cta-title">
      <img className="cta-banner__bg" src={ctaImage} alt="" aria-hidden="true" loading="lazy" />
      <span className="cta-banner__overlay" aria-hidden="true" />
      <div className="container cta-banner__inner">
        <Reveal className="cta-banner__content">
          <h2 className="cta-banner__title" id="cta-title">
            {title}
          </h2>
          <p className="cta-banner__description">{description}</p>
          <div className="cta-banner__actions">
            <Button to={primaryTo} variant="gold" size="lg">
              {primaryLabel}
            </Button>
            <Button to={secondaryTo} variant="outline-light" size="lg">
              {secondaryLabel}
            </Button>
          </div>
        </Reveal>

        {blocks.length > 0 ? (
          <Reveal className="cta-banner__blocks" delay={0.1}>
            {blocks.map((block) => (
              <div className="cta-block" key={block.label}>
                <span className="cta-block__value">{block.value}</span>
                <span className="cta-block__label">{block.label}</span>
              </div>
            ))}
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}
