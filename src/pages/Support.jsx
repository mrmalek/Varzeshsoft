import Button from '../components/Button.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import ContentBadge from '../components/ContentBadge.jsx'
import Icon from '../components/Icon.jsx'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import usePageMeta from '../components/usePageMeta.js'
import { supportIntro, supportNote, supportSteps } from '../data/support.js'
import { site } from '../data/site.js'

export default function Support() {
  usePageMeta({
    title: 'پشتیبانی و آموزش',
    description:
      'همراهی ورزش سافت در راه‌اندازی نرم‌افزار، آموزش کارکنان و پیگیری مسائل کاربران مجموعه‌های ورزشی.',
  })

  return (
    <article>
      <PageHero
        breadcrumbs={[{ label: 'پشتیبانی و آموزش' }]}
        eyebrow="پشتیبانی و آموزش"
        title="همراهی از راه‌اندازی تا استفادهٔ روزمره"
        description={supportIntro}
        actions={
          <>
            <Button to={site.demoPath} variant="gold">
              درخواست مشاوره
            </Button>
            <Button to="/contact" variant="outline-light">
              تماس با ما
            </Button>
          </>
        }
      />

      <section className="section">
        <div className="container">
          <ul className="support-grid">
            {supportSteps.map((step, index) => (
              <Reveal as="li" className="support-card" key={step.title} delay={index * 0.05}>
                <span className="support-card__icon">
                  <Icon name={step.icon} size={22} />
                </span>
                <h2 className="support-card__title">{step.title}</h2>
                <p className="support-card__text">{step.text}</p>
                {index === supportSteps.length - 1 ? <ContentBadge label="نیازمند تکمیل" /> : null}
              </Reveal>
            ))}
          </ul>
          <p className="section-footnote">{supportNote}</p>
        </div>
      </section>

      <CtaBanner secondaryTo="/features" secondaryLabel="مشاهده امکانات نرم‌افزار" />
    </article>
  )
}
