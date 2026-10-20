import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import usePageMeta from '../components/usePageMeta.js'
import { features } from '../data/features.js'
import { services } from '../data/services.js'

const suggestions = [
  { to: '/', label: 'صفحه اصلی' },
  { to: '/features', label: 'امکانات نرم‌افزار' },
  { to: '/services', label: 'خدمات تکمیلی' },
  { to: '/request-demo', label: 'درخواست دمو' },
]

export default function NotFound() {
  usePageMeta({
    title: 'صفحه پیدا نشد',
    description: 'صفحهٔ موردنظر در وب‌سایت ورزش سافت پیدا نشد.',
  })

  return (
    <section className="not-found">
      <span className="not-found__glow" aria-hidden="true" />
      <div className="container not-found__inner">
        <span className="not-found__code">۴۰۴</span>
        <h1 className="not-found__title">این صفحه پیدا نشد</h1>
        <p className="not-found__text">
          ممکن است نشانی تغییر کرده باشد یا این صفحه حذف شده باشد. از راه‌های زیر می‌توانید ادامه
          دهید:
        </p>

        <ul className="not-found__links">
          {suggestions.map((item) => (
            <li key={item.to}>
              <Link to={item.to}>
                <Icon name="ArrowLeft" size={15} />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="not-found__shortcuts">
          <div>
            <h2 className="not-found__subtitle">امکانات پربازدید</h2>
            <ul className="not-found__chip-list">
              {features.slice(0, 5).map((feature) => (
                <li key={feature.slug}>
                  <Link to={`/features/${feature.slug}`}>{feature.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="not-found__subtitle">خدمات تکمیلی</h2>
            <ul className="not-found__chip-list">
              {services.slice(0, 5).map((service) => (
                <li key={service.slug}>
                  <Link to={`/services/${service.slug}`}>{service.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Button to="/request-demo" variant="gold" size="lg">
          درخواست دمو و مشاوره
        </Button>
      </div>
    </section>
  )
}
