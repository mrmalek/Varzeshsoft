import { useCallback, useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import { clients, clientsNote, placeholderCount, showPlaceholders } from '../data/clients.js'

/**
 * نوار لوگوی مشتریان با کنترل قبلی/بعدی و پیمایش لمسی (اسکرول افقی بومی).
 * چون لوگوی تأییدشده‌ای در دست نیست، کارت‌های جای‌نگهدار بدون نام نمایش داده
 * می‌شوند تا هویت ساختگی ساخته نشود.
 */
export default function ClientCarousel() {
  const trackRef = useRef(null)
  const itemRefs = useRef([])
  const [index, setIndex] = useState(0)

  const items = clients.length > 0 ? clients : showPlaceholders ? new Array(placeholderCount).fill(null) : []
  const total = items.length

  /** حرکت یک «صفحه» کامل به جلو یا عقب؛ در صورت نبود سرریز، حرکتی لازم نیست. */
  const step = useCallback(
    (direction) => {
      const track = trackRef.current
      const tiles = itemRefs.current.filter(Boolean)
      if (!track || tiles.length === 0) return

      const gap = 16
      const tileWidth = tiles[0].getBoundingClientRect().width || 212
      const perView = Math.max(1, Math.floor((track.clientWidth + gap) / (tileWidth + gap)))
      const nextIndex = Math.min(Math.max(index + direction * perView, 0), tiles.length - 1)

      if (nextIndex === index) return

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      tiles[nextIndex].scrollIntoView({
        behavior: reduce ? 'auto' : 'smooth',
        block: 'nearest',
        inline: 'start',
      })
      setIndex(nextIndex)
    },
    [index],
  )

  useEffect(() => {
    setIndex((current) => Math.min(current, Math.max(total - 1, 0)))
  }, [total])

  if (total === 0) return null

  const isPlaceholder = clients.length === 0

  return (
    <div className="client-carousel">
      <div className="client-carousel__controls">
        <button
          type="button"
          className="carousel-btn"
          onClick={() => step(-1)}
          disabled={index === 0}
          aria-label="مشتریان قبلی"
        >
          <Icon name="ChevronRight" size={20} />
        </button>
        <button
          type="button"
          className="carousel-btn"
          onClick={() => step(1)}
          disabled={index >= total - 1}
          aria-label="مشتریان بعدی"
        >
          <Icon name="ChevronLeft" size={20} />
        </button>
      </div>

      <ul className="client-track" ref={trackRef}>
        {items.map((client, itemIndex) => (
          <li
            className={`client-tile${isPlaceholder ? ' is-placeholder' : ''}`}
            key={client?.name || `placeholder-${itemIndex}`}
            ref={(node) => {
              itemRefs.current[itemIndex] = node
            }}
          >
            {client ? (
              <a href={client.href || '#'} className="client-tile__link">
                {client.logo ? (
                  <img src={client.logo} alt={client.name} loading="lazy" height="40" />
                ) : (
                  <span className="client-tile__name">{client.name}</span>
                )}
              </a>
            ) : (
              <>
                <span className="client-tile__mark" aria-hidden="true" />
                <span className="client-tile__label">جای نمونه</span>
              </>
            )}
          </li>
        ))}
      </ul>

      {isPlaceholder ? <p className="client-carousel__note">{clientsNote}</p> : null}
    </div>
  )
}
