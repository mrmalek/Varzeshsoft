/**
 * تصاویر سایت در یک فایل متمرکز شده‌اند تا جایگزینی آن‌ها بدون تغییر در ساختار
 * صفحات ممکن باشد. کافی است شناسه یا آدرس تصویر را همین‌جا عوض کنید.
 *
 * تصاویر فعلی نمونه‌های آزاد (Pexels) هستند و پیش از انتشار نهایی بهتر است با
 * عکس‌های واقعی مجموعه‌ها و محصول جایگزین شوند.
 */
const pexels = (id, width = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`

export const heroImage = pexels(4716814, 1800)
export const ctaImage = pexels(35529263, 1800)
export const solutionsImage = pexels(17227607, 1400)
export const aboutImage = pexels(29526372, 1400)

export const serviceImages = {
  'attendance-devices': pexels(17155842),
  'online-locks': pexels(20901468),
  'network-setup': pexels(1181354),
  'reception-kiosks': pexels(3943950),
  'access-control-gates': pexels(10640272),
  'website-design-seo': pexels(326505),
}
