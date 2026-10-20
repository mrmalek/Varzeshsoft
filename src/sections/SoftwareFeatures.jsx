import AppMockup from '../components/AppMockup.jsx'
import Button from '../components/Button.jsx'
import FeatureCard from '../components/FeatureCard.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { features } from '../data/features.js'

export default function SoftwareFeatures() {
  return (
    <section className="section section--dark features-section" id="features" aria-labelledby="features-title">
      <span className="section__glow" aria-hidden="true" />
      <div className="container">
        <SectionHeading
          id="features-title"
          tone="dark"
          eyebrow="امکانات نرم‌افزار"
          title="امکانات نرم‌افزار"
          description="تمامی ابزارهای موردنیاز برای مدیریت حرفه‌ای مجموعه ورزشی، در یک بستر جامع و یکپارچه."
          action={
            <Button to="/features" variant="outline-light">
              مشاهده همه امکانات
            </Button>
          }
        />

        <ul className="feature-grid">
          {features.map((feature, index) => (
            <FeatureCard key={feature.slug} feature={feature} delay={index * 0.03} />
          ))}

          <Reveal as="li" className="feature-promo" delay={0.12}>
            <div className="feature-promo__inner">
              <h3 className="feature-promo__title">همهٔ ماژول‌ها، روی یک سرور و یک پایگاه داده</h3>
              <p className="feature-promo__text">
                ماژول‌های ورزش سافت جدا از هم کار نمی‌کنند؛ اطلاعات اعضا، قراردادها و مالی در یک
                بستر مشترک ثبت می‌شود.
              </p>
              <Button to="/features" variant="gold" size="sm">
                مشاهده همه امکانات
              </Button>
              <div className="feature-promo__visual" aria-hidden="true">
                <AppMockup device="tablet" screen="finance" label="نمای شماتیک ماژول‌های مالی" />
              </div>
            </div>
          </Reveal>
        </ul>
      </div>
    </section>
  )
}
