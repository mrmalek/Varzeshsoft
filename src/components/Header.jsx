import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Phone, Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Properties', to: '/properties' },
  { label: 'About Us', to: '/#about' },
  { label: 'Services', to: '/#services' },
  { label: 'Team', to: '/#team' },
  { label: 'Contact', to: '/#contact' },
]

function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Horizon Properties home">
      <span className="logo-icon">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 24L12 8L16 16L20 10L28 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--champagne)' }} />
          <path d="M4 24H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: 'var(--champagne)' }} />
          <circle cx="16" cy="6" r="2" fill="currentColor" style={{ color: 'var(--champagne)' }} />
        </svg>
      </span>
      <span className="logo-text">HORIZON<span>PROPERTIES</span></span>
    </Link>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // On non-home pages, header is always solid
  const showScrolled = scrolled || !isHome

  return (
    <>
      <header className={`header${showScrolled ? ' scrolled' : ''}`}>
        <div className="container">
          <div className="header-inner">
            <Logo />
            <nav className="nav" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`nav-link${link.to === location.pathname ? ' active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <a href="tel:5552467890" className="header-phone">
              <Phone size={15} />
              (555) 246-7890
            </a>
            <button
              className={`menu-toggle${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {navLinks.map((link) => (
          <Link key={link.label} to={link.to} className="nav-link">
            {link.label}
          </Link>
        ))}
        <a href="tel:5552467890" className="header-phone">
          <Phone size={16} />
          (555) 246-7890
        </a>
      </div>
    </>
  )
}
