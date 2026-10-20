import { placeholderLabel } from '../data/site.js'

/**
 * نمایش مقدارهایی که هنوز تأییدشده نیستند. این برچسب‌ها باید پیش از انتشار نهایی
 * با اطلاعات واقعی شرکت جایگزین شوند.
 */
export default function Placeholder({ hint, children }) {
  return (
    <span className="placeholder-value" title="این مقدار در src/data/site.js قابل ویرایش است">
      {children || placeholderLabel}
      {hint ? <span className="placeholder-value__hint">{hint}</span> : null}
    </span>
  )
}
