import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'

/** دکمهٔ بازگشت به بالای صفحه؛ پس از کمی اسکرول ظاهر می‌شود. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <button className="back-to-top" type="button" onClick={toTop} aria-label="بازگشت به بالای صفحه">
      <Icon name="ArrowUp" size={18} />
    </button>
  )
}
