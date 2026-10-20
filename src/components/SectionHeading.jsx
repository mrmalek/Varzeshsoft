import Reveal from './Reveal.jsx'

/** سرتیتر مشترک بخش‌ها: عنوان، توضیح و اکشن اختیاری */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  center = false,
  tone = 'light',
  id,
}) {
  return (
    <Reveal className={`section-heading section-heading--${tone} ${center ? 'is-center' : ''}`}>
      {eyebrow ? <span className="section-heading__eyebrow">{eyebrow}</span> : null}
      <h2 className="section-heading__title" id={id}>
        {title}
      </h2>
      {description ? <p className="section-heading__description">{description}</p> : null}
      {action ? <div className="section-heading__action">{action}</div> : null}
    </Reveal>
  )
}
