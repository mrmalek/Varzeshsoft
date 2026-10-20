import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import { serviceImages } from '../data/images.js'

/** کارت هر خدمت تکمیلی؛ تصویر، عنوان و توضیح یک‌خطی + پیوند به صفحهٔ خدمت. */
export default function ServiceCard({ service, delay = 0 }) {
  return (
    <Reveal as="li" className="service-card-item" delay={delay}>
      <Link className="service-card" to={`/services/${service.slug}`}>
        <span className="service-card__media">
          <img
            src={serviceImages[service.slug]}
            alt=""
            loading="lazy"
            decoding="async"
            width="640"
            height="420"
          />
          <span className="service-card__kind">
            <Icon name={service.icon} size={15} />
            {service.kind}
          </span>
        </span>
        <span className="service-card__body">
          <span className="service-card__title">{service.title}</span>
          <span className="service-card__short">{service.short}</span>
          <span className="service-card__more">
            مشاهده خدمت
            <Icon name="ArrowLeft" size={14} />
          </span>
        </span>
      </Link>
    </Reveal>
  )
}
