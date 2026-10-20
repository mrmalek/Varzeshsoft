// Property image URLs — high-end architectural photography from Unsplash
const img = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?w=${w}&auto=format&fit=crop&q=80`

// Pool of verified working Unsplash photo IDs for luxury architecture
const arch = [
  '1505843513577-22bb7d21e455', // concrete house at night
  '1613977257363-707ba9348227', // white villa with pool
  '1706808849780-7a04fbac83ef', // house with pool and lounge
  '1580587771525-78b9dba3b914', // concrete building
  '1564078516393-cf04bd966897', // interior chaise couch
  '1593714604578-d9e41b00c6c6', // concrete building near pool
  '1613490493576-7fde63acd811', // concrete building
  '1591474200742-8e512e6f98f8', // wooden house
  '1600047509807-ba8f99d2cdde', // modern architecture
  '1600210492486-724fe5c67fb0', // modern house
  '1502672260266-1c1ef2d93688', // interior
  '1564501049412-61c2a3083791', // architecture
  '1502672023488-70e25813eb80', // architecture
  '1556909114-f6e7ad7d3136', // architecture
]

// Helper: pick 4 images for a property, offset by index to vary across properties
const propImages = (offset) => [
  img(arch[offset % arch.length]),
  img(arch[(offset + 1) % arch.length]),
  img(arch[(offset + 2) % arch.length]),
  img(arch[(offset + 3) % arch.length]),
]

export const properties = [
  {
    id: 'lakeside-modern-villa',
    name: 'Lakeside Modern Villa',
    location: 'Austin, Texas, USA',
    city: 'Austin',
    country: 'USA',
    price: '$2.35 Million',
    priceValue: 2350000,
    type: 'Villa',
    beds: 5,
    baths: 4,
    sqft: 6200,
    featured: true,
    description: 'A stunning modern villa set on the shores of Lake Austin, featuring floor-to-ceiling glass walls, an infinity pool, and seamless indoor-outdoor living. Designed by award-winning architects, this home exemplifies contemporary luxury.',
    features: ['Infinity pool', 'Smart home system', 'Floor-to-ceiling glass', '3-car garage', 'Lakefront views'],
    amenities: ['Wine cellar', 'Home theater', 'Gym', 'Spa', 'Outdoor kitchen', 'Solar panels'],
    images: propImages(0),
    agent: { name: 'Olivia Carter', role: 'Luxury Property Advisor', phone: '(555) 246-7890', email: 'olivia@horizonproperties.com', photo: img('1494790108377-be9c29b29330', 400) },
  },
  {
    id: 'pacific-glass-house',
    name: 'Pacific Glass House',
    location: 'Malibu, California, USA',
    city: 'Malibu',
    country: 'USA',
    price: '$4.8 Million',
    priceValue: 4800000,
    type: 'Modern Home',
    beds: 6,
    baths: 5,
    sqft: 8400,
    featured: true,
    description: 'Perched on the Malibu cliffs, this architectural masterpiece offers panoramic Pacific Ocean views through its glass-walled design. A celebration of light, space, and natural materials.',
    features: ['Ocean views', 'Glass walls', 'Cliffside location', 'Infinity edge pool', 'Private beach access'],
    amenities: ['Wine cellar', 'Home theater', 'Gym', 'Spa', 'Outdoor lounge', 'EV charging'],
    images: propImages(2),
    agent: { name: 'Daniel Morgan', role: 'Managing Director', phone: '(555) 246-7891', email: 'daniel@horizonproperties.com', photo: img('1507003211169-0a1dd7228f2d', 400) },
  },
  {
    id: 'desert-horizon-estate',
    name: 'Desert Horizon Estate',
    location: 'Scottsdale, Arizona, USA',
    city: 'Scottsdale',
    country: 'USA',
    price: '$3.15 Million',
    priceValue: 3150000,
    type: 'Estate',
    beds: 5,
    baths: 4,
    sqft: 7100,
    featured: true,
    description: 'A serene desert retreat that blends raw natural materials with modern design. Expansive terraces frame uninterrupted views of the Sonoran landscape.',
    features: ['Desert views', 'Resort-style pool', 'Natural stone finishes', 'Outdoor fireplace', 'Guest casita'],
    amenities: ['Wine cellar', 'Home theater', 'Gym', 'Spa', 'Outdoor kitchen', 'Solar panels'],
    images: propImages(4),
    agent: { name: 'James Wilson', role: 'Investment Consultant', phone: '(555) 246-7892', email: 'james@horizonproperties.com', photo: img('1500648767791-00dcc994a43e', 400) },
  },
  {
    id: 'oceanfront-residence',
    name: 'Oceanfront Residence',
    location: 'Miami, Florida, USA',
    city: 'Miami',
    country: 'USA',
    price: '$5.2 Million',
    priceValue: 5200000,
    type: 'Waterfront',
    beds: 6,
    baths: 6,
    sqft: 9200,
    featured: true,
    description: 'A bold oceanfront residence in Miami Beach with sweeping Atlantic views, a private dock, and resort-caliber amenities. The epitome of waterfront luxury.',
    features: ['Oceanfront', 'Private dock', 'Rooftop terrace', 'Infinity pool', 'Elevator'],
    amenities: ['Wine cellar', 'Home theater', 'Gym', 'Spa', 'Outdoor kitchen', 'Smart home', 'EV charging'],
    images: propImages(6),
    agent: { name: 'Sophia Bennett', role: 'Senior Property Specialist', phone: '(555) 246-7893', email: 'sophia@horizonproperties.com', photo: img('1438761681033-6461ffad8d80', 400) },
  },
  {
    id: 'modern-hillside-retreat',
    name: 'Modern Hillside Retreat',
    location: 'Los Angeles, California, USA',
    city: 'Los Angeles',
    country: 'USA',
    price: '$3.75 Million',
    priceValue: 3750000,
    type: 'Modern Home',
    beds: 4,
    baths: 4,
    sqft: 5800,
    featured: false,
    description: 'Nestled in the Hollywood Hills, this retreat offers privacy, city views, and a seamless blend of warm wood and cool concrete. A true architectural gem.',
    features: ['City views', 'Hillside location', 'Infinity pool', 'Wood and concrete', 'Private terrace'],
    amenities: ['Wine cellar', 'Home theater', 'Gym', 'Outdoor kitchen', 'Smart home'],
    images: propImages(8),
    agent: { name: 'Olivia Carter', role: 'Luxury Property Advisor', phone: '(555) 246-7890', email: 'olivia@horizonproperties.com', photo: img('1494790108377-be9c29b29330', 400) },
  },
  {
    id: 'palm-garden-residence',
    name: 'Palm Garden Residence',
    location: 'Beverly Hills, California, USA',
    city: 'Beverly Hills',
    country: 'USA',
    price: '$6.4 Million',
    priceValue: 6400000,
    type: 'Mansion',
    beds: 7,
    baths: 7,
    sqft: 11500,
    featured: true,
    description: 'An iconic Beverly Hills estate surrounded by lush palm gardens. Timeless elegance meets modern luxury in this meticulously crafted residence.',
    features: ['Palm gardens', 'Tennis court', 'Motor court', 'Guest house', 'Pool and spa'],
    amenities: ['Wine cellar', 'Home theater', 'Gym', 'Spa', 'Outdoor kitchen', 'Smart home', 'EV charging', 'Staff quarters'],
    images: propImages(10),
    agent: { name: 'Daniel Morgan', role: 'Managing Director', phone: '(555) 246-7891', email: 'daniel@horizonproperties.com', photo: img('1507003211169-0a1dd7228f2d', 400) },
  },
  {
    id: 'contemporary-lake-house',
    name: 'Contemporary Lake House',
    location: 'Lake Tahoe, Nevada, USA',
    city: 'Lake Tahoe',
    country: 'USA',
    price: '$2.95 Million',
    priceValue: 2950000,
    type: 'Lake House',
    beds: 4,
    baths: 3,
    sqft: 4800,
    featured: false,
    description: 'A contemporary lake house with warm wood interiors, panoramic lake views, and a private dock. The perfect year-round mountain retreat.',
    features: ['Lake views', 'Private dock', 'Stone fireplace', 'Wood interiors', 'Hot tub'],
    amenities: ['Wine cellar', 'Gym', 'Outdoor kitchen', 'Smart home', 'Heated driveway'],
    images: propImages(12),
    agent: { name: 'Sophia Bennett', role: 'Senior Property Specialist', phone: '(555) 246-7893', email: 'sophia@horizonproperties.com', photo: img('1438761681033-6461ffad8d80', 400) },
  },
  {
    id: 'architectural-downtown-penthouse',
    name: 'Architectural Downtown Penthouse',
    location: 'Austin, Texas, USA',
    city: 'Austin',
    country: 'USA',
    price: '$1.85 Million',
    priceValue: 1850000,
    type: 'Penthouse',
    beds: 3,
    baths: 3,
    sqft: 3400,
    featured: false,
    description: 'A full-floor downtown penthouse with 360-degree city views, double-height ceilings, and a private rooftop terrace. Urban luxury at its finest.',
    features: ['360° city views', 'Rooftop terrace', 'Double-height ceilings', 'Concierge', 'Private elevator'],
    amenities: ['Wine cellar', 'Gym', 'Smart home', 'EV charging', 'Doorman'],
    images: propImages(1),
    agent: { name: 'James Wilson', role: 'Investment Consultant', phone: '(555) 246-7892', email: 'james@horizonproperties.com', photo: img('1500648767791-00dcc994a43e', 400) },
  },
]

export const team = [
  { name: 'Daniel Morgan', role: 'Managing Director', photo: img('1507003211169-0a1dd7228f2d', 600), email: 'daniel@horizonproperties.com', phone: '(555) 246-7891' },
  { name: 'Olivia Carter', role: 'Luxury Property Advisor', photo: img('1494790108377-be9c29b29330', 600), email: 'olivia@horizonproperties.com', phone: '(555) 246-7890' },
  { name: 'James Wilson', role: 'Investment Consultant', photo: img('1500648767791-00dcc994a43e', 600), email: 'james@horizonproperties.com', phone: '(555) 246-7892' },
  { name: 'Sophia Bennett', role: 'Senior Property Specialist', photo: img('1438761681033-6461ffad8d80', 600), email: 'sophia@horizonproperties.com', phone: '(555) 246-7893' },
]

export const services = [
  { title: 'Luxury Home Sales', description: 'Curated portfolio of the finest homes in prime locations, matched to your lifestyle and aspirations.', icon: 'home' },
  { title: 'Property Investment', description: 'Strategic investment guidance backed by deep market analysis and decades of combined experience.', icon: 'trending-up' },
  { title: 'Property Marketing', description: 'Editorial-grade marketing campaigns including professional photography, film, and digital strategy.', icon: 'camera' },
  { title: 'Real Estate Advisory', description: 'Personalized advisory for buyers, sellers, and investors navigating complex transactions.', icon: 'compass' },
  { title: 'Property Valuation', description: 'Precise, data-driven valuations informed by comparable sales, market trends, and property specifics.', icon: 'calculator' },
  { title: 'Relocation Services', description: 'End-to-end relocation support, from neighborhood discovery to settling into your new home.', icon: 'map-pin' },
]

export const propertyTypes = ['All', 'Villa', 'Modern Home', 'Estate', 'Waterfront', 'Mansion', 'Lake House', 'Penthouse']
export const locations = ['All', 'Austin', 'Malibu', 'Scottsdale', 'Miami', 'Los Angeles', 'Beverly Hills', 'Lake Tahoe']

export function getPropertyById(id) {
  return properties.find((p) => p.id === id)
}

export function getSimilarProperties(id, type) {
  return properties.filter((p) => p.id !== id && (p.type === type || p.featured)).slice(0, 3)
}
