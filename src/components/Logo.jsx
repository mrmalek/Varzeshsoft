/** نشان برند (جایگزین‌پذیر در src/data/images.js یا همین فایل) */
export default function Logo({ size = 38, withText = true, tone = 'dark' }) {
  return (
    <span className={`brand brand--${tone}`}>
      <svg
        className="brand__mark"
        width={size}
        height={size}
        viewBox="0 0 64 64"
        role="img"
        aria-label="نشان ورزش سافت"
      >
        <defs>
          <linearGradient id="brand-mark-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#26A5FF" />
            <stop offset="1" stopColor="#0879F9" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill="#082542" stroke="rgba(38,165,255,.35)" />
        <path d="M16 18h8.6l7.4 18.4L39.4 18H48L36.4 46h-8.8L16 18Z" fill="url(#brand-mark-gradient)" />
        <circle cx="46" cy="44" r="4" fill="#F3C45B" />
      </svg>
      {withText ? (
        <span className="brand__text">
          <span className="brand__name">ورزش سافت</span>
          <span className="brand__sub">Varzeshsoft</span>
        </span>
      ) : null}
    </span>
  )
}
