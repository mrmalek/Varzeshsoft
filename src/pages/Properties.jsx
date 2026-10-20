import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, Building2 } from 'lucide-react'
import PropertyCard from '../components/PropertyCard.jsx'
import { properties, propertyTypes, locations } from '../data/properties.js'

export default function Properties() {
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('All')
  const [type, setType] = useState('All')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [beds, setBeds] = useState('Any')
  const [sort, setSort] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let result = properties.filter((p) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase()) ||
        p.type.toLowerCase().includes(search.toLowerCase())
      const matchLocation = location === 'All' || p.city === location
      const matchType = type === 'All' || p.type === type
      const matchMin = !minPrice || p.priceValue >= parseInt(minPrice)
      const matchMax = !maxPrice || p.priceValue <= parseInt(maxPrice)
      const matchBeds = beds === 'Any' || p.beds >= parseInt(beds)
      return matchSearch && matchLocation && matchType && matchMin && matchMax && matchBeds
    })

    if (sort === 'price-low') result = [...result].sort((a, b) => a.priceValue - b.priceValue)
    else if (sort === 'price-high') result = [...result].sort((a, b) => b.priceValue - a.priceValue)
    else if (sort === 'beds') result = [...result].sort((a, b) => b.beds - a.beds)
    else result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))

    return result
  }, [search, location, type, minPrice, maxPrice, beds, sort])

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Properties</h1>
          <p>Browse our curated collection of premium homes and investments</p>
        </div>
      </div>

      <div className="container">
        <button
          className="filter-toggle"
          onClick={() => setShowFilters((v) => !v)}
          aria-expanded={showFilters}
        >
          <SlidersHorizontal size={16} />
          {showFilters ? 'Hide Filters' : 'Filters'}
        </button>
        <div className={`filter-bar${showFilters ? ' open' : ''}`}>
          <div className="filter-group">
            <span className="filter-label">Location</span>
            <select className="filter-select" value={location} onChange={(e) => setLocation(e.target.value)}>
              {locations.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div className="filter-group">
            <span className="filter-label">Property Type</span>
            <select className="filter-select" value={type} onChange={(e) => setType(e.target.value)}>
              {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="filter-group">
            <span className="filter-label">Min Price</span>
            <select className="filter-select" value={minPrice} onChange={(e) => setMinPrice(e.target.value)}>
              <option value="">Any</option>
              <option value="1000000">$1M+</option>
              <option value="2000000">$2M+</option>
              <option value="3000000">$3M+</option>
              <option value="5000000">$5M+</option>
            </select>
          </div>
          <div className="filter-group">
            <span className="filter-label">Bedrooms</span>
            <select className="filter-select" value={beds} onChange={(e) => setBeds(e.target.value)}>
              <option value="Any">Any</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
              <option value="6">6+</option>
            </select>
          </div>
          <div className="filter-group">
            <span className="filter-label">Sort By</span>
            <select className="filter-select" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="beds">Most Bedrooms</option>
            </select>
          </div>
          <div className="filter-group">
            <span className="filter-label">&nbsp;</span>
            <span className="results-count"><strong>{filtered.length}</strong> results</span>
          </div>
        </div>

        <div style={{ padding: '2.5rem 0 5rem' }}>
          <div className="search-row">
            <div className="search-input">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search by name, location, or type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="properties-grid">
              {filtered.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <Building2 size={48} strokeWidth={1} />
              <p>No properties match your current filters.</p>
              <p style={{ fontSize: '0.85rem' }}>Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
