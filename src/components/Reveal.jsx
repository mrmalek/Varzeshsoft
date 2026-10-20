import { motion, useReducedMotion } from 'framer-motion'

/**
 * انیمیشن ورود ملایم برای بخش‌ها.
 * در حالت prefers-reduced-motion هیچ جابه‌جایی انجام نمی‌شود و محتوا مستقیماً
 * نمایش داده می‌شود تا اطلاعات همیشه در دسترس باشد.
 */
export default function Reveal({ children, delay = 0, y = 18, as = 'div', className = '' }) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div

  if (reduce) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}
