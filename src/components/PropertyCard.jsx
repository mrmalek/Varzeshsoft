import { Link } from 'react-router-dom'
import { MapPin, BedDouble, Bath, Maximize, Heart } from 'lucide-react'
import { useFavorites } from './FavoritesContext.jsx'

export default function PropertyCard({ property, wide = false }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const fav = isFavorite(property.id)

  return (
    <div className={`property-card${wide ? ' wide' : ''}`}>
      <Link to={`/properties/${property.id}`} className="property-card-img">
        <img
          src={property.images[0]}
          alt={property.name}
          loading="lazy"
        />
        {property.featured && (
          <span className="property-card-badge">Featured</span>
        )}
      </Link>
      <button
        className={`property-card-fav${fav ? ' active' : ''}`}
        onClick={(e) => {
          e.preventDefault()
          toggleFavorite(property.id)
        }}
        aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart size={18} fill={fav ? 'currentColor' : 'none'} />
      </button>
      <div className="property-card-body">
        <div className="property-card-type">{property.type}</div>
        <Link to={`/properties/${property.id}`}>
          <h3 className="property-card-name">{property.name}</h3>
        </Link>
        <div className="property-card-location">
          <MapPin size={14} />
          {property.location}
        </div>
        <div className="property-card-specs">
          <span className="property-spec"><BedDouble size={16} /> {property.beds} Beds</span>
          <span className="property-spec"><Bath size={16} /> {property.baths} Baths</span>
          <span className="property-spec"><Maximize size={16} /> {property.sqft.toLocaleString()} ft²</span>
        </div>
        <div className="property-card-price">{property.price}</div>
      </div>
    </div>
  )
}
