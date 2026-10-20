import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { benefits } from '../data/benefits.js'

export default function Benefits() {
  return (
    <section className="section section--soft benefits" id="benefits" aria-labelledby="benefits-title">
      <div className="container">
        <SectionHeading
          id="benefits-title"
          eyebrow="چرا ورزش سافت؟"
          title="راهکاری جامع و یکپارچه برای مدیریت مجموعه ورزشی"
          center
        />
        <ul className="benefit-grid">
          {benefits.map((item, index) => (
            <Reveal as="li" className="benefit-card" key={item.title} delay={index * 0.05}>
              <span className="benefit-card__icon">
                <Icon name={item.icon} size={24} />
              </span>
              <h3 className="benefit-card__title">{item.title}</h3>
              <p className="benefit-card__text">{item.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
