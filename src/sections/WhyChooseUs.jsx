import { motion } from 'framer-motion'
import { Shield, Award, Users, Clock } from 'lucide-react'
import SectionLabel from '../components/SectionLabel.jsx'

const items = [
  { icon: Shield, title: 'Trusted Expertise', desc: 'Over 25 years of experience in luxury real estate markets.' },
  { icon: Award, title: 'Award Winning', desc: 'Recognized for excellence in property sales and advisory.' },
  { icon: Users, title: 'Client Focused', desc: 'Personalized service tailored to your unique needs and goals.' },
  { icon: Clock, title: 'Always Available', desc: 'Dedicated support throughout your entire property journey.' },
]

export default function WhyChooseUs() {
  return (
    <section className="section bg-white">
      <div className="container">
        <motion.div
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel>Why Horizon</SectionLabel>
          <h2 className="section-title" style={{ marginTop: '0.75rem' }}>
            Why Choose Horizon
          </h2>
        </motion.div>
        <div className="why-grid">
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                className="why-item"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="why-icon">
                  <Icon size={26} strokeWidth={1.5} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
