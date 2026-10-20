import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter, ArrowRight } from 'lucide-react'

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
    <div className="logo">
      <span className="logo-icon">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 24L12 8L16 16L20 10L28 24" stroke="var(--champagne)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 24H28" stroke="var(--champagne)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="16" cy="6" r="2" fill="var(--champagne)" />
        </svg>
      </span>
      <span className="logo-text">HORIZON<span>PROPERTIES</span></span>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p className="footer-desc">
              Connecting people with extraordinary homes and smart investments.
              Integrity, transparency, and client satisfaction at the heart of
              everything we do.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul className="footer-links">
              <li><Link to="/#services">Luxury Home Sales</Link></li>
              <li><Link to="/#services">Property Investment</Link></li>
              <li><Link to="/#services">Property Marketing</Link></li>
              <li><Link to="/#services">Real Estate Advisory</Link></li>
              <li><Link to="/#services">Property Valuation</Link></li>
              <li><Link to="/#services">Relocation Services</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <div className="footer-contact-item">
              <Phone size={16} />
              <span>(555) 246-7890</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={16} />
              <span>hello@horizonproperties.com</span>
            </div>
            <div className="footer-contact-item">
              <MapPin size={16} />
              <span>1200 Architectural Blvd, Suite 500<br />Beverly Hills, CA 90210</span>
            </div>
            <div className="footer-newsletter">
              <input type="email" placeholder="Your email address" aria-label="Email for newsletter" />
              <button aria-label="Subscribe"><ArrowRight size={18} /></button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Horizon Properties. All rights reserved.</span>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
