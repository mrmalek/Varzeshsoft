import CtaBanner from '../components/CtaBanner.jsx'
import usePageMeta from '../components/usePageMeta.js'
import Benefits from '../sections/Benefits.jsx'
import Clients from '../sections/Clients.jsx'
import ComplementaryServices from '../sections/ComplementaryServices.jsx'
import Hero from '../sections/Hero.jsx'
import SoftwareFeatures from '../sections/SoftwareFeatures.jsx'

export default function Home() {
  usePageMeta({
    title: null,
    description:
      'ورزش سافت، نرم‌افزار یکپارچه مدیریت مجموعه‌های ورزشی؛ ده ماژول نرم‌افزاری، شش خدمت تکمیلی و نصب روی سرور داخلی مجموعه.',
  })

  return (
    <>
      <Hero />
      <Benefits />
      <SoftwareFeatures />
      <ComplementaryServices />
      <Clients />
      <CtaBanner />
    </>
  )
}
