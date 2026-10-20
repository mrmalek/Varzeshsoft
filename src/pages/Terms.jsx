import LegalPage from '../components/LegalPage.jsx'
import usePageMeta from '../components/usePageMeta.js'
import { legalNotice, terms } from '../data/legal.js'

export default function Terms() {
  usePageMeta({
    title: 'قوانین و مقررات',
    description:
      'شرایط استفاده از وب‌سایت ورزش سافت و چارچوب خدمات نرم‌افزاری و خدمات تکمیلی این شرکت.',
  })

  return (
    <LegalPage
      breadcrumbs={[{ label: 'قوانین و مقررات' }]}
      eyebrow="قوانین و مقررات"
      title={terms.title}
      doc={terms}
      notice={legalNotice}
    />
  )
}
