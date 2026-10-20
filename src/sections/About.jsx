import { motion } from 'framer-motion'
import SectionLabel from '../components/SectionLabel.jsx'
import Button from '../components/Button.jsx'
import { ArrowRight } from 'lucide-react'

const img1 = 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&auto=format&fit=crop&q=80'
const img2 = 'https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=600&auto=format&fit=crop&q=80'

export default function About() {
  return (
    <section className="section bg-white" id="about">
      <div className="container">
        <div className="about-grid">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionLabel>About Us</SectionLabel>
            <h2 className="section-title">Who We Are</h2>
            <p>
              At Horizon Properties, we connect people with extraordinary homes
              and smart investments. Integrity, transparency, and client
              satisfaction are at the heart of everything we do.
            </p>
            <Button to="/#services" variant="primary">
              Learn More <ArrowRight size={16} />
            </Button>
            <div className="about-stats">
              <div>
                <div className="about-stat-num">25+</div>
                <div className="about-stat-label">Years Experience</div>
              </div>
              <div>
                <div className="about-stat-num">1,200+</div>
                <div className="about-stat-label">Properties Sold</div>
              </div>
              <div>
                <div className="about-stat-num">98%</div>
                <div className="about-stat-label">Client Satisfaction</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-images"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="about-img-main">
              <img src={img1} alt="Luxury modern home with pool" loading="lazy" />
            </div>
            <div className="about-img-secondary">
              <img src={img2} alt="Modern interior living space" loading="lazy" />
            </div>
            <button className="about-arrow" aria-label="Explore properties">
              <ArrowRight size={22} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
