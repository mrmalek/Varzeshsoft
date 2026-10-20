import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, BedDouble, Bath, Maximize, Heart, Check, Phone, Mail, Calendar, ChevronLeft, ChevronRight, X, ArrowLeft } from 'lucide-react'
import { getPropertyById, getSimilarProperties } from '../data/properties.js'
import { useFavorites } from '../components/FavoritesContext.jsx'
import PropertyCard from '../components/PropertyCard.jsx'
import Button from '../components/Button.jsx'

export default function PropertyDetail() {
  const { id } = useParams()
  const property = getPropertyById(id)
  const { isFavorite, toggleFavorite } = useFavorites()
  const [activeImg, setActiveImg] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)

  if (!property) {
    return (
      <div style={{ padding: '10rem 0', textAlign: 'center' }} className="container">
        <h1>Property Not Found</h1>
        <p style={{ color: 'var(--gray-500)', margin: '1rem 0 2rem' }}>The property you're looking for doesn't exist.</p>
        <Button to="/properties" variant="primary">Back to Properties</Button>
      </div>
    )
  }

  const fav = isFavorite(property.id)
  const similar = getSimilarProperties(property.id, property.type)

  const nextImg = () => setActiveImg((i) => (i + 1) % property.images.length)
  const prevImg = () => setActiveImg((i) => (i - 1 + property.images.length) % property.images.length)

  return (
    <>
      <div className="detail-hero">
        <div className="container">
          <Link to="/properties" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--gray-500)', marginBottom: '1.5rem', transition: 'color 0.3s' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--navy)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--gray-500)'}
          >
            <ArrowLeft size={16} /> Back to Properties
          </Link>

          <div className="detail-header">
            <div className="detail-title">
              <h1>{property.name}</h1>
              <div className="detail-location">
                <MapPin size={16} /> {property.location}
              </div>
            </div>
            <div className="detail-price-tag">
              <div className="label">Price</div>
              <div className="price">{property.price}</div>
            </div>
          </div>

          <motion.div
            className="gallery-main"
            onClick={() => setFullscreen(true)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img src={property.images[activeImg]} alt={property.name} />
            <div className="gallery-expand">
              <Maximize size={20} />
            </div>
          </motion.div>

          <div className="gallery-thumbs">
            {property.images.map((img, i) => (
              <div
                key={i}
                className={`gallery-thumb${i === activeImg ? ' active' : ''}`}
                onClick={() => setActiveImg(i)}
              >
                <img src={img} alt={`${property.name} view ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>

          <div className="detail-body">
            <div className="detail-content">
              <div className="detail-specs">
                <div className="detail-spec">
                  <div className="val">{property.beds}</div>
                  <div className="lbl">Bedrooms</div>
                </div>
                <div className="detail-spec">
                  <div className="val">{property.baths}</div>
                  <div className="lbl">Bathrooms</div>
                </div>
                <div className="detail-spec">
                  <div className="val">{property.sqft.toLocaleString()}</div>
                  <div className="lbl">Sq Ft</div>
                </div>
                <div className="detail-spec">
                  <div className="val">{property.type}</div>
                  <div className="lbl">Property Type</div>
                </div>
              </div>

              <div className="detail-section">
                <h2>Description</h2>
                <p>{property.description}</p>
              </div>

              <div className="detail-section">
                <h2>Key Features</h2>
                <div className="detail-features">
                  {property.features.map((f) => (
                    <div key={f} className="detail-feature">
                      <Check size={18} /> {f}
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h2>Amenities</h2>
                <div className="detail-amenities">
                  {property.amenities.map((a) => (
                    <span key={a} className="amenity-tag">{a}</span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="agent-card">
                <div className="agent-info">
                  <div className="agent-photo">
                    <img src={property.agent.photo} alt={property.agent.name} />
                  </div>
                  <div>
                    <div className="agent-name">{property.agent.name}</div>
                    <div className="agent-role">{property.agent.role}</div>
                  </div>
                </div>
                <div className="agent-contact">
                  <div className="agent-contact-item">
                    <Phone size={16} /> {property.agent.phone}
                  </div>
                  <div className="agent-contact-item">
                    <Mail size={16} /> {property.agent.email}
                  </div>
                </div>
                <div className="detail-cta-row">
                  <Button href={`tel:${property.agent.phone}`} variant="primary">Contact Agent</Button>
                  <Button variant="outline-dark">Schedule Viewing</Button>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <button
                    className={`btn btn-outline-dark`}
                    style={{ width: '100%' }}
                    onClick={() => toggleFavorite(property.id)}
                  >
                    <Heart size={16} fill={fav ? 'currentColor' : 'none'} />
                    {fav ? 'Saved to Favorites' : 'Save to Favorites'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {similar.length > 0 && (
        <section className="similar-section">
      <div className="container">
        <h2>Similar Properties</h2>
        <div className="properties-grid">
          {similar.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </div>
    </section>
      )}

      {fullscreen && (
        <div className="gallery-fullscreen" onClick={() => setFullscreen(false)}>
          <button className="gallery-fullscreen-close" onClick={() => setFullscreen(false)} aria-label="Close fullscreen">
            <X size={24} />
          </button>
          <img src={property.images[activeImg]} alt={property.name} onClick={(e) => e.stopPropagation()} />
          <button className="gallery-fullscreen-nav prev" onClick={(e) => { e.stopPropagation(); prevImg() }} aria-label="Previous image">
            <ChevronLeft size={24} />
          </button>
          <button className="gallery-fullscreen-nav next" onClick={(e) => { e.stopPropagation(); nextImg() }} aria-label="Next image">
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </>
  )
}
