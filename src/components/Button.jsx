import { Link } from 'react-router-dom'

/**
 * دکمهٔ واحد سایت.
 * - to: مسیر داخلی (react-router)
 * - href: پیوند بیرونی
 * - onClick: دکمهٔ عملیاتی
 * گونه‌ها: primary | gold | outline | outline-light | ghost
 */
export default function Button({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  icon = null,
  iconPosition = 'start',
  className = '',
  ariaLabel,
  ...rest
}) {
  const classes = ['btn', `btn--${variant}`, `btn--${size}`, className]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {icon && iconPosition === 'start' ? <span className="btn__icon">{icon}</span> : null}
      <span className="btn__label">{children}</span>
      {icon && iconPosition === 'end' ? <span className="btn__icon">{icon}</span> : null}
    </>
  )

  if (to) {
    return (
      <Link className={classes} to={to} aria-label={ariaLabel} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        aria-label={ariaLabel}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
        {...rest}
      >
        {content}
      </a>
    )
  }

  return (
    <button className={classes} type={type} onClick={onClick} aria-label={ariaLabel} {...rest}>
      {content}
    </button>
  )
}
