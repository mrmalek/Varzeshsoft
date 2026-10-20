import { Link } from 'react-router-dom'

export default function Button({ to, href, variant = 'primary', size, children, className = '', ...props }) {
  const classes = `btn btn-${variant}${size ? ` btn-${size}` : ''} ${className}`
  if (to) return <Link to={to} className={classes} {...props}>{children}</Link>
  if (href) return <a href={href} className={classes} {...props}>{children}</a>
  return <button className={classes} {...props}>{children}</button>
}
