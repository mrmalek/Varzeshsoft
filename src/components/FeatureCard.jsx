import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'

/** کارت هر ماژول نرم‌افزاری؛ کل کارت یک پیوند به صفحهٔ جزئیات است. */
export default function FeatureCard({ feature, delay = 0 }) {
  return (
    <Reveal as="li" className="feature-card-item" delay={delay}>
      <Link className="feature-card" to={`/features/${feature.slug}`}>
        <span className="feature-card__icon">
          <Icon name={feature.icon} size={22} />
        </span>
        <span className="feature-card__title">{feature.title}</span>
        <span className="feature-card__short">{feature.short}</span>
        <span className="feature-card__more">
          مشاهده جزئیات
          <Icon name="ArrowLeft" size={14} />
        </span>
      </Link>
    </Reveal>
  )
}
