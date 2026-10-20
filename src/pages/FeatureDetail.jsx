import { useParams } from 'react-router-dom'
import AppMockup from '../components/AppMockup.jsx'
import DetailPage from '../components/DetailPage.jsx'
import FeatureCard from '../components/FeatureCard.jsx'
import usePageMeta from '../components/usePageMeta.js'
import { getFeature, getFeatures } from '../data/features.js'
import NotFound from './NotFound.jsx'

export default function FeatureDetail() {
  const { slug } = useParams()
  const feature = getFeature(slug)

  usePageMeta({
    title: feature ? feature.title : 'صفحه پیدا نشد',
    description: feature ? feature.short : undefined,
  })

  if (!feature) return <NotFound />

  const related = getFeatures(feature.related)

  return (
    <DetailPage
      breadcrumbs={[{ label: 'امکانات', to: '/features' }, { label: feature.title }]}
      eyebrow="ماژول نرم‌افزار"
      title={feature.title}
      intro={feature.intro}
      visual={
        <AppMockup
          device={feature.visual.device}
          screen={feature.visual.screen}
          label={`نمای شماتیک بخش ${feature.title} در نرم‌افزار ورزش سافت`}
        />
      }
      description={feature.description}
      benefits={feature.benefits}
      subfeatures={feature.subfeatures}
      subfeaturesTitle="جزئیات این بخش"
      subfeaturesNote="موارد زیر ساختار پیشنهادی این بخش از نرم‌افزار است؛ موارد نشان‌دار باید با اطلاعات واقعی محصول تأیید و تکمیل شوند."
      related={related.map((item) => (
        <FeatureCard key={item.slug} feature={item} />
      ))}
      relatedTitle="ماژول‌های مرتبط"
      meta={[
        { label: 'نوع', value: 'ماژول نرم‌افزار ورزش سافت' },
        { label: 'پیش‌نیاز', value: 'نصب روی سرور مجموعه و دسترسی از شبکهٔ داخلی' },
      ]}
    />
  )
}
