import Breadcrumbs from './Breadcrumbs.jsx'
import Reveal from './Reveal.jsx'

/** سرصفحهٔ صفحه‌های داخلی: مسیر راهنما، برچسب، عنوان، توضیح و اکشن‌ها. */
export default function PageHero({ breadcrumbs = [], eyebrow, title, description, actions, children }) {
  return (
    <section className="page-hero">
      <span className="page-hero__glow" aria-hidden="true" />
      <div className="container page-hero__inner">
        <div className="page-hero__content">
          <Breadcrumbs items={breadcrumbs} />
          <Reveal>
            {eyebrow ? <span className="page-hero__eyebrow">{eyebrow}</span> : null}
            <h1 className="page-hero__title">{title}</h1>
            {description ? <p className="page-hero__description">{description}</p> : null}
            {actions ? <div className="page-hero__actions">{actions}</div> : null}
          </Reveal>
        </div>
        {children ? <div className="page-hero__aside">{children}</div> : null}
      </div>
    </section>
  )
}
