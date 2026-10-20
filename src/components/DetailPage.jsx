import Button from './Button.jsx'
import ContentBadge from './ContentBadge.jsx'
import CtaBanner from './CtaBanner.jsx'
import Icon from './Icon.jsx'
import PageHero from './PageHero.jsx'
import Reveal from './Reveal.jsx'
import { site } from '../data/site.js'

/**
 * قالب مشترک صفحه‌های جزئیات (ماژول‌های نرم‌افزار و خدمات تکمیلی).
 * همهٔ محتوا از props می‌آید تا ویرایش متن‌ها فقط در فایل‌های داده انجام شود.
 */
export default function DetailPage({
  breadcrumbs,
  eyebrow,
  title,
  intro,
  visual,
  description = [],
  benefits = [],
  benefitsTitle = 'مزیت‌ها و کاربردها',
  subfeatures = [],
  subfeaturesTitle = 'جزئیات این بخش',
  subfeaturesNote,
  notice,
  related = [],
  relatedTitle = 'موارد مرتبط',
  meta = [],
}) {
  return (
    <article className="detail-page">
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow={eyebrow}
        title={title}
        description={intro}
        actions={
          <>
            <Button to={site.demoPath} variant="gold">
              درخواست دمو و مشاوره
            </Button>
            <Button to="/contact" variant="outline-light">
              تماس با کارشناسان
            </Button>
          </>
        }
      />

      {notice ? (
        <div className="container">
          <p className="inline-notice">
            <Icon name="AlertCircle" size={16} />
            {notice}
          </p>
        </div>
      ) : null}

      {visual ? (
        <section className="section section--visual">
          <div className="container detail-visual">
            <Reveal>{visual}</Reveal>
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="container detail-body">
          <div className="detail-body__main">
            <Reveal>
              <h2 className="detail-heading">معرفی</h2>
              {description.map((paragraph) => (
                <p className="detail-text" key={paragraph.slice(0, 24)}>
                  {paragraph}
                </p>
              ))}
            </Reveal>

            {benefits.length > 0 ? (
              <Reveal>
                <h2 className="detail-heading">{benefitsTitle}</h2>
                <ul className="check-list">
                  {benefits.map((item) => (
                    <li key={item}>
                      <Icon name="CheckCircle2" size={18} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}

            {subfeatures.length > 0 ? (
              <Reveal>
                <h2 className="detail-heading">{subfeaturesTitle}</h2>
                {subfeaturesNote ? <p className="detail-hint">{subfeaturesNote}</p> : null}
                <ul className="pending-list">
                  {subfeatures.map((item) => (
                    <li className="pending-item" key={item.title}>
                      <span className="pending-item__title">{item.title}</span>
                      {item.confirmed === false ? <ContentBadge /> : null}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}
          </div>

          <aside className="detail-body__aside">
            <Reveal className="aside-card">
              <h2 className="aside-card__title">درخواست دمو</h2>
              <p className="aside-card__text">
                برای دیدن نرم‌افزار روی اطلاعات مجموعهٔ خودتان و بررسی نیازها، فرم درخواست دمو را
                تکمیل کنید.
              </p>
              <Button to={site.demoPath} variant="gold" className="btn--block">
                درخواست دمو و مشاوره
              </Button>
              {meta.length > 0 ? (
                <dl className="aside-meta">
                  {meta.map((row) => (
                    <div className="aside-meta__row" key={row.label}>
                      <dt>{row.label}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </Reveal>
          </aside>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="section section--soft">
          <div className="container">
            <h2 className="detail-heading detail-heading--center">{relatedTitle}</h2>
            <ul className="related-grid">{related}</ul>
          </div>
        </section>
      ) : null}

      <CtaBanner
        secondaryTo="/features"
        secondaryLabel="مشاهده همه امکانات"
      />
    </article>
  )
}
