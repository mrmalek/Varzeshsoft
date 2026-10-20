import { useParams } from 'react-router-dom'
import DetailPage from '../components/DetailPage.jsx'
import Reveal from '../components/Reveal.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import usePageMeta from '../components/usePageMeta.js'
import { serviceImages } from '../data/images.js'
import { getService, getServices, servicesNotice } from '../data/services.js'
import NotFound from './NotFound.jsx'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getService(slug)

  usePageMeta({
    title: service ? service.title : 'صفحه پیدا نشد',
    description: service ? service.short : undefined,
  })

  if (!service) return <NotFound />

  const related = getServices(service.related)

  return (
    <DetailPage
      breadcrumbs={[{ label: 'خدمات', to: '/services' }, { label: service.title }]}
      eyebrow={service.kind}
      title={service.title}
      intro={service.intro}
      notice={servicesNotice}
      visual={
        <Reveal className="service-visual">
          <img
            src={serviceImages[service.slug]}
            alt={`تصویر مرتبط با ${service.title}`}
            loading="lazy"
            decoding="async"
            width="1200"
            height="640"
          />
        </Reveal>
      }
      description={service.description}
      benefits={service.benefits}
      benefitsTitle="مزیت‌های این خدمت"
      subfeatures={service.includes.map((item) => ({ title: item, confirmed: true }))}
      subfeaturesTitle="شرح خدمت"
      subfeaturesNote="این فهرست شرح کلی خدمت است و دامنهٔ دقیق کار در جلسهٔ مشاوره و بازدید مجموعه تعیین می‌شود."
      related={related.map((item) => (
        <ServiceCard key={item.slug} service={item} />
      ))}
      relatedTitle="خدمات مرتبط"
      meta={[
        { label: 'نوع خدمت', value: service.kind },
        { label: 'ارائه', value: 'جدا از لایسنس نرم‌افزار، بر اساس نیاز مجموعه' },
      ]}
    />
  )
}
