import { motion } from 'framer-motion'
import { Mail, Phone, Linkedin } from 'lucide-react'
import SectionLabel from '../components/SectionLabel.jsx'
import { team } from '../data/properties.js'

export default function Team() {
  return (
    <section className="section bg-ivory" id="team">
      <div className="container">
        <motion.div
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel>Our Team</SectionLabel>
          <h2 className="section-title" style={{ marginTop: '0.75rem' }}>
            Meet the Experts
          </h2>
        </motion.div>
        <div className="team-grid">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              className="team-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="team-photo">
                <img src={member.photo} alt={member.name} loading="lazy" />
                <div className="team-social">
                  <a href={`mailto:${member.email}`} aria-label={`Email ${member.name}`}><Mail size={16} /></a>
                  <a href={`tel:${member.phone}`} aria-label={`Call ${member.name}`}><Phone size={16} /></a>
                  <a href="#" aria-label={`${member.name} on LinkedIn`}><Linkedin size={16} /></a>
                </div>
              </div>
              <h3 className="team-name">{member.name}</h3>
              <div className="team-role">{member.role}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
