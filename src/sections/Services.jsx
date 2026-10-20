import { motion } from 'framer-motion'
import { Home, TrendingUp, Camera, Compass, Calculator, MapPin } from 'lucide-react'
import SectionLabel from '../components/SectionLabel.jsx'
import { services } from '../data/properties.js'

const iconMap = { home: Home, 'trending-up': TrendingUp, camera: Camera, compass: Compass, calculator: Calculator, 'map-pin': MapPin }

export default function Services() {
  return (
    <section className="section bg-navy" id="services">
      <div className="container">
        <motion.div
          style={{ textAlign: 'center', marginBottom: '3rem' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel>What We Offer</SectionLabel>
          <h2 className="section-title light" style={{ marginTop: '0.75rem' }}>
            Our Services
          </h2>
        </motion.div>
        <div className="services-grid">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Home
            return (
              <motion.div
                key={service.title}
                className="service-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <span className="service-num">0{i + 1}</span>
                <div className="service-icon">
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
