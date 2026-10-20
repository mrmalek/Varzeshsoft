import { Link } from 'react-router-dom'
import Button from './Button.jsx'
import Icon from './Icon.jsx'
import Logo from './Logo.jsx'
import Placeholder from './Placeholder.jsx'
import { footerColumns, site } from '../data/site.js'

export default function Footer() {
  const year = new Date().getFullYear()

  const contactRows = [
    { icon: 'Phone', label: 'تلفن', value: site.contact.phone, placeholder: 'شماره تماس شرکت' },
    { icon: 'Mail', label: 'ایمیل', value: site.contact.email, placeholder: 'ایمیل شرکت' },
    { icon: 'MapPin', label: 'نشانی', value: site.contact.address, placeholder: 'نشانی دفتر' },
  ]

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Logo tone="light" />
          <p className="site-footer__summary">{site.summary}</p>
          <p className="site-footer__owner">تولید {site.brand.legalFa}</p>
          {site.socials.length > 0 ? (
            <ul className="socials">
              {site.socials.map((item) => (
                <li key={item.label}>
                  <a href={item.href} aria-label={item.label} target="_blank" rel="noreferrer noopener">
                    <Icon name={item.icon || 'Globe'} size={18} />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="site-footer__note">
              شبکه‌های اجتماعی شرکت در فایل <code>src/data/site.js</code> قابل افزودن است.
            </p>
          )}
        </div>

        {footerColumns.map((column) => (
          <div className="site-footer__column" key={column.title}>
            <h3 className="site-footer__title">{column.title}</h3>
            <ul className="site-footer__links">
              {column.links.map((link) => (
                <li key={`${column.title}-${link.label}-${link.to}`}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="site-footer__column site-footer__contact">
          <h3 className="site-footer__title">تماس با ما</h3>
          <ul className="site-footer__contact-list">
            {contactRows.map((row) => (
              <li key={row.label}>
                <Icon name={row.icon} size={17} />
                <span>
                  <span className="site-footer__contact-label">{row.label}:</span>{' '}
                  {row.value ? row.value : <Placeholder>{row.placeholder}</Placeholder>}
                </span>
              </li>
            ))}
          </ul>
          <p className="site-footer__note">
            اطلاعات تماس تأییدشده پس از دریافت، در فایل <code>src/data/site.js</code> جایگزین می‌شود.
          </p>
          <Button to={site.demoPath} variant="gold" size="sm">
            درخواست دمو و مشاوره
          </Button>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <p className="site-footer__copy">
          © {year} {site.brand.fa} — {site.brand.legalFa}. تمام حقوق محفوظ است.
        </p>
        <nav className="site-footer__legal" aria-label="پیوندهای حقوقی">
          <Link to="/terms">قوانین و مقررات</Link>
          <span aria-hidden="true">|</span>
          <Link to="/privacy">حریم خصوصی</Link>
        </nav>
      </div>
    </footer>
  )
}
