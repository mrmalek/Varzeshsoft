import Button from '../components/Button.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import { services, servicesNotice } from '../data/services.js'

export default function ComplementaryServices() {
  return (
    <section className="section services-section" id="services" aria-labelledby="services-title">
      <div className="container">
        <SectionHeading
          id="services-title"
          eyebrow="خدمات تکمیلی"
          title="خدمات تکمیلی"
          description="خدمات و تجهیزات مکمل برای تکمیل فرایندهای مدیریتی و بهبود عملکرد مجموعه ورزشی شما."
          action={
            <Button to="/services" variant="outline">
              مشاهده همه خدمات
            </Button>
          }
        />

        <ul className="service-grid">
          {services.map((service, index) => (
            <ServiceCard key={service.slug} service={service} delay={index * 0.04} />
          ))}
        </ul>

        <p className="section-footnote">{servicesNotice}</p>
      </div>
    </section>
  )
}
