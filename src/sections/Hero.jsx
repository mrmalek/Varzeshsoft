import { motion } from 'framer-motion'
import Button from '../components/Button.jsx'
import { ChevronDown } from 'lucide-react'

const heroImg = 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=1920&auto=format&fit=crop&q=80'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <img src={heroImg} alt="Luxury modern villa at blue hour" />
      </div>
      <div className="hero-overlay" />
      <div className="hero-content">
        <motion.span
          className="hero-label"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Premium Real Estate
        </motion.span>
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Discover Exceptional<br />Homes & Investments
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          Premium properties in prime locations. Find your dream home or the
          perfect investment with confidence.
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Button to="/properties" variant="gold" size="lg">View Properties</Button>
          <Button href="#about" variant="outline" size="lg">Learn More</Button>
        </motion.div>
      </div>
      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="hero-scroll-line"></div>
      </div>
    </section>
  )
}
