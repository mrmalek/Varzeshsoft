import Button from '../components/Button.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import FeatureCard from '../components/FeatureCard.jsx'
import PageHero from '../components/PageHero.jsx'
import usePageMeta from '../components/usePageMeta.js'
import { features, featuresNote } from '../data/features.js'
import { site } from '../data/site.js'

export default function Features() {
  usePageMeta({
    title: 'امکانات نرم‌افزار',
    description:
      'ده ماژول نرم‌افزار ورزش سافت برای مدیریت اعضا، قراردادها، مالی، پیامک، پشتیبان‌گیری و گزارش‌های مجموعه ورزشی.',
  })

  return (
    <article>
      <PageHero
        breadcrumbs={[{ label: 'امکانات' }]}
        eyebrow="نرم‌افزار ورزش سافت"
        title="امکانات نرم‌افزار"
        description="تمامی ابزارهای موردنیاز برای مدیریت حرفه‌ای مجموعه ورزشی، در یک بستر جامع و یکپارچه. هر ماژول صفحهٔ اختصاصی خود را دارد."
        actions={
          <>
            <Button to={site.demoPath} variant="gold">
              درخواست دمو و مشاوره
            </Button>
            <Button to="/services" variant="outline-light">
              خدمات تکمیلی
            </Button>
          </>
        }
      />

      <section className="section">
        <div className="container">
          <ul className="feature-grid feature-grid--page">
            {features.map((feature, index) => (
              <FeatureCard key={feature.slug} feature={feature} delay={index * 0.03} />
            ))}
          </ul>
          <p className="section-footnote">{featuresNote}</p>
        </div>
      </section>

      <CtaBanner secondaryTo="/services" secondaryLabel="مشاهده خدمات تکمیلی" />
    </article>
  )
}
