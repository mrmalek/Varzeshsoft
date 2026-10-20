import Button from '../components/Button.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import PageHero from '../components/PageHero.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import usePageMeta from '../components/usePageMeta.js'
import { services, servicesNotice } from '../data/services.js'
import { site } from '../data/site.js'

export default function ServicesPage() {
  usePageMeta({
    title: 'خدمات تکمیلی',
    description:
      'خدمات و تجهیزات مکمل ورزش سافت: دستگاه‌های ثبت تردد، قفل‌های آنلاین، راه‌اندازی شبکه، کیوسک پذیرش، گیت‌های کنترل تردد و طراحی سایت و سئو.',
  })

  return (
    <article>
      <PageHero
        breadcrumbs={[{ label: 'خدمات' }]}
        eyebrow="خدمات و تجهیزات"
        title="خدمات تکمیلی"
        description="خدمات و تجهیزات مکمل برای تکمیل فرایندهای مدیریتی و بهبود عملکرد مجموعه ورزشی شما. این خدمات جدا از لایسنس نرم‌افزار ارائه می‌شوند."
        actions={
          <>
            <Button to={site.demoPath} variant="gold">
              درخواست مشاوره
            </Button>
            <Button to="/features" variant="outline-light">
              امکانات نرم‌افزار
            </Button>
          </>
        }
      />

      <section className="section">
        <div className="container">
          <ul className="service-grid service-grid--page">
            {services.map((service, index) => (
              <ServiceCard key={service.slug} service={service} delay={index * 0.04} />
            ))}
          </ul>
          <p className="section-footnote">{servicesNotice}</p>
        </div>
      </section>

      <CtaBanner secondaryTo="/features" secondaryLabel="مشاهده امکانات نرم‌افزار" />
    </article>
  )
}
