import LegalPage from '../components/LegalPage.jsx'
import usePageMeta from '../components/usePageMeta.js'
import { legalNotice, privacy } from '../data/legal.js'

export default function Privacy() {
  usePageMeta({
    title: 'حریم خصوصی',
    description:
      'توضیح ورزش سافت دربارهٔ اطلاعاتی که در وب‌سایت و نرم‌افزار دریافت می‌شود و شیوهٔ نگه‌داری آن‌ها.',
  })

  return (
    <LegalPage
      breadcrumbs={[{ label: 'حریم خصوصی' }]}
      eyebrow="حریم خصوصی"
      title={privacy.title}
      doc={privacy}
      notice={legalNotice}
    />
  )
}
