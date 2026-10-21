import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/**
 * آیا کاربر در سیستم خود «کاهش حرکت» را فعال کرده است؟
 * در این حالت تجربهٔ سینمایی اسکرول اجرا نمی‌شود و هیرو به شکل سادهٔ قبلی می‌ماند.
 */
export default function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  )

  useEffect(() => {
    const media = window.matchMedia(QUERY)
    const onChange = (event) => setReduced(event.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return reduced
}
