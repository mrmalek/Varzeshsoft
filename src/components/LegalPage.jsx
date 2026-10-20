import ContentBadge from './ContentBadge.jsx'
import PageHero from './PageHero.jsx'
import Reveal from './Reveal.jsx'

/**
 * قالب مشترک صفحه‌های حقوقی (حریم خصوصی و قوانین و مقررات).
 * متن‌ها از فایل داده می‌آید و بخش‌های نیازمند بازبینی با نشان مشخص می‌شوند.
 */
export default function LegalPage({ breadcrumbs, eyebrow, title, doc, notice }) {
  return (
    <article>
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow={eyebrow}
        title={title}
        description={doc.intro}
      />

      <section className="section">
        <div className="container legal-layout">
          <p className="legal-notice">{notice}</p>

          {doc.sections.map((section, index) => (
            <Reveal className="legal-block" key={section.title} delay={index * 0.03}>
              <h2 className="legal-block__title">
                {section.title}
                {section.needsReview ? <ContentBadge label="نیازمند بازبینی" /> : null}
              </h2>
              {section.body.map((paragraph) => (
                <p className="detail-text" key={paragraph.slice(0, 24)}>
                  {paragraph}
                </p>
              ))}
            </Reveal>
          ))}

          <p className="legal-updated">
            {doc.updated
              ? `آخرین بازبینی: ${doc.updated}`
              : 'تاریخ آخرین بازبینی این متن باید پیش از انتشار نهایی درج شود.'}
          </p>
        </div>
      </section>
    </article>
  )
}
