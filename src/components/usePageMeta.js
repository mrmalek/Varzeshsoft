import { useEffect } from 'react'
import { site } from '../data/site.js'

/**
 * تنظیم عنوان و توضیح صفحه (و متادیتای اشتراک‌گذاری) برای هر مسیر.
 */
export default function usePageMeta({ title, description }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${site.brand.fa}` : `${site.brand.fa} | ${site.brand.slogan}`
    document.title = fullTitle

    const setMeta = (selector, attr, value) => {
      let tag = document.head.querySelector(selector)
      if (!tag) {
        tag = document.createElement('meta')
        const [key, val] = attr
        tag.setAttribute(key, val)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', value)
    }

    if (description) {
      setMeta('meta[name="description"]', ['name', 'description'], description)
      setMeta('meta[property="og:description"]', ['property', 'og:description'], description)
    }
    setMeta('meta[property="og:title"]', ['property', 'og:title'], fullTitle)
  }, [title, description])
}
