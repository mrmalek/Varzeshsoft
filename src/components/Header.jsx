import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Button from './Button.jsx'
import Icon from './Icon.jsx'
import Logo from './Logo.jsx'
import { navItems, site } from '../data/site.js'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loginNotice, setLoginNotice] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const noticeRef = useRef(null)

  useEffect(() => {
    setMenuOpen(false)
    setLoginNotice(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!loginNotice) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setLoginNotice(false)
    }
    const onClick = (event) => {
      if (noticeRef.current && !noticeRef.current.contains(event.target)) setLoginNotice(false)
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [loginNotice])

  useEffect(() => {
    document.body.classList.toggle('is-nav-open', menuOpen)
    return () => document.body.classList.remove('is-nav-open')
  }, [menuOpen])

  const isHashLink = (to) => to.startsWith('/#')

  const navClasses = (to) =>
    `site-nav__link${isHashLink(to) && location.pathname === '/' && location.hash === to.slice(1) ? ' is-active' : ''}`

  const navContent = navItems.map((item) =>
    isHashLink(item.to) ? (
      <Link key={item.to} to={item.to} className={navClasses(item.to)}>
        {item.label}
      </Link>
    ) : (
      <NavLink
        key={item.to}
        to={item.to}
        end={item.to === '/'}
        className={({ isActive }) => `site-nav__link${isActive ? ' is-active' : ''}`}
      >
        {item.label}
      </NavLink>
    ),
  )

  const loginControl = site.loginUrl ? (
    <Button href={site.loginUrl} variant="outline-light" size="sm" className="header__login">
      ورود به سامانه
    </Button>
  ) : (
    <span className="header__login-wrap" ref={noticeRef}>
      <Button
        variant="outline-light"
        size="sm"
        className="header__login"
        aria-expanded={loginNotice}
        onClick={() => setLoginNotice((value) => !value)}
      >
        ورود به سامانه
      </Button>
      {loginNotice ? (
        <span className="login-notice" role="dialog" aria-label="ورود به سامانه">
          <span className="login-notice__title">ورود به سامانه</span>
          <span className="login-notice__text">
            آدرس ورود به سامانه هنوز تنظیم نشده است. برای دریافت دسترسی یا اعلام آدرس ورود، با تیم
            ورزش سافت در تماس باشید.
          </span>
          <span className="login-notice__actions">
            <Button to="/contact" size="sm" variant="primary">
              تماس با ما
            </Button>
            <button
              type="button"
              className="login-notice__close"
              onClick={() => setLoginNotice(false)}
              aria-label="بستن پیام"
            >
              <Icon name="X" size={16} />
            </button>
          </span>
        </span>
      ) : null}
    </span>
  )

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container site-header__inner">
        <Link to="/" className="site-header__brand" aria-label="ورزش سافت — صفحه اصلی">
          <Logo />
        </Link>

        <nav className="site-nav" aria-label="منوی اصلی">
          {navContent}
        </nav>

        <div className="site-header__actions">
          <span className="site-header__desktop-actions">
            {loginControl}
            <Button to={site.demoPath} variant="gold" size="sm">
              درخواست دمو
            </Button>
          </span>
          <button
            type="button"
            className="site-header__toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'بستن منو' : 'باز کردن منو'}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <Icon name={menuOpen ? 'X' : 'Menu'} size={22} />
          </button>
        </div>
      </div>

      <div className={`mobile-nav${menuOpen ? ' is-open' : ''}`} id="mobile-nav" hidden={!menuOpen}>
        <div className="container mobile-nav__inner">
          <nav className="mobile-nav__links" aria-label="منوی موبایل">
            {navContent}
          </nav>
          <div className="mobile-nav__actions">
            <Button to={site.demoPath} variant="gold" size="md" className="btn--block">
              درخواست دمو
            </Button>
            {site.loginUrl ? (
              <Button href={site.loginUrl} variant="outline-light" size="md" className="btn--block">
                ورود به سامانه
              </Button>
            ) : (
              <Button to="/contact" variant="outline-light" size="md" className="btn--block">
                ورود به سامانه — دریافت دسترسی
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
