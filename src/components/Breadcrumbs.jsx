import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

/** مسیر راهنما (Breadcrumb) — آیتم آخر صفحهٔ جاری است و لینک نمی‌گیرد. */
export default function Breadcrumbs({ items = [] }) {
  return (
    <nav className="breadcrumbs" aria-label="مسیر صفحه">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/">صفحه اصلی</Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li className="breadcrumbs__item" key={`${item.label}-${index}`}>
              <Icon name="ChevronLeft" size={14} className="breadcrumbs__separator" />
              {isLast || !item.to ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link to={item.to}>{item.label}</Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
