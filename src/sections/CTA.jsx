import { motion } from 'framer-motion'
import { KeyRound, ArrowRight } from 'lucide-react'
import Button from '../components/Button.jsx'

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="container">
        <motion.div
          className="cta-inner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="cta-left">
            <div className="cta-icon">
              <KeyRound size={28} strokeWidth={1.5} />
            </div>
            <div className="cta-text">
              <h2>Ready to Find Your Perfect Property?</h2>
              <p>Let our experts guide you to the right home or investment.</p>
            </div>
          </div>
          <Button to="/#contact" variant="primary" size="lg">
            Get in Touch <ArrowRight size={16} />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
