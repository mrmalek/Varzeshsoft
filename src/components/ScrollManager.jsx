import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * مدیریت اسکرول بین مسیرها: با تغییر مسیر به بالای صفحه برمی‌گردد و اگر مسیر
 * شامل لنگر (#) باشد، به همان بخش اسکرول می‌کند.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const behavior = reduce ? 'auto' : 'smooth'

    if (hash) {
      const id = hash.replace('#', '')
      const attempt = (tries = 0) => {
        const el = document.getElementById(id)
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 84
          window.scrollTo({ top, behavior })
        } else if (tries < 6) {
          window.setTimeout(() => attempt(tries + 1), 60)
        }
      }
      attempt()
      return
    }

    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}
