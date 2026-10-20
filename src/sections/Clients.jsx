import ClientCarousel from '../components/ClientCarousel.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { clients, showPlaceholders } from '../data/clients.js'

export default function Clients() {
  if (clients.length === 0 && !showPlaceholders) return null

  return (
    <section className="section clients-section" id="clients" aria-labelledby="clients-title">
      <div className="container">
        <SectionHeading
          id="clients-title"
          eyebrow="مشتریان ما"
          title="مشتریان ما"
          description="اعتماد مجموعه‌های ورزشی به ورزش سافت، حاصل همراهی و تجربه همکاری است."
          center
        />
        <ClientCarousel />
      </div>
    </section>
  )
}
