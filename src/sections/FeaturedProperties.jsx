import { useRef, useCallback, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SectionLabel from '../components/SectionLabel.jsx'
import PropertyCard from '../components/PropertyCard.jsx'
import { properties } from '../data/properties.js'
import Button from '../components/Button.jsx'

export default function FeaturedProperties() {
  const trackRef = useRef(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const featured = properties.filter((p) => p.featured)
  const allCards = [...featured, ...properties.filter((p) => !p.featured).slice(0, 2)]

  const updateScrollState = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 5)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 5)
  }, [])

  useEffect(() => {
    updateScrollState()
    const el = trackRef.current
    if (!el) return
    el.addEventListener('scroll', updateScrollState, { passive: true })
    return () => el.removeEventListener('scroll', updateScrollState)
  }, [updateScrollState])

  const scroll = (dir) => {
    const el = trackRef.current
    if (!el) return
    const amount = el.clientWidth * 0.75
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  // Mouse drag support
  const dragRef = useRef({ down: false, startX: 0, scrollLeft: 0 })

  const handleMouseDown = (e) => {
    const el = trackRef.current
    dragRef.current = { down: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft }
    el.classList.add('dragging')
  }
  const handleMouseMove = (e) => {
    if (!dragRef.current.down) return
    e.preventDefault()
    const el = trackRef.current
    const x = e.pageX - el.offsetLeft
    const walk = (x - dragRef.current.startX) * 1.5
    el.scrollLeft = dragRef.current.scrollLeft - walk
  }
  const handleMouseUp = () => {
    dragRef.current.down = false
    trackRef.current?.classList.remove('dragging')
  }

  return (
    <section className="section bg-ivory">
      <div className="container">
        <motion.div
          className="featured-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <SectionLabel>Featured</SectionLabel>
            <h2 className="section-title">Featured Properties</h2>
          </div>
          <div className="carousel-nav">
            <button className="carousel-btn" onClick={() => scroll(-1)} disabled={atStart} aria-label="Previous properties">
              <ChevronLeft size={20} />
            </button>
            <button className="carousel-btn" onClick={() => scroll(1)} disabled={atEnd} aria-label="Next properties">
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>
      <div className="container">
        <div
          className="carousel"
        >
          <div
            className="carousel-track"
            ref={trackRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {allCards.map((p, i) => (
              <PropertyCard key={p.id} property={p} wide={i === 0} />
            ))}
          </div>
        </div>
      </div>
      <div className="container" style={{ marginTop: '2.5rem', textAlign: 'center' }}>
        <Button to="/properties" variant="outline-dark" size="lg">
          View All Properties <ChevronRight size={16} />
        </Button>
      </div>
    </section>
  )
}
