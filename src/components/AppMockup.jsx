/**
 * نمای شماتیک رابط نرم‌افزار.
 *
 * این تصویر یک ماکت تصویری است، نه اسکرین‌شات واقعی محصول؛ برای همین متن‌های
 * داخل آن کوتاه و با کلمات واقعی فارسی نوشته شده و از عناصر گرافیکی ساده ساخته
 * شده است. برای جایگزینی با اسکرین‌شات واقعی کافی است همین کامپوننت را در صفحات
 * با تصویر محصول عوض کنید.
 */
const navItems = ['داشبورد', 'اعضا', 'قراردادها', 'مالی', 'پیامک', 'گزارش‌ها']

const overviewStats = [
  { label: 'ورود امروز', value: '۱۲۸' },
  { label: 'درآمد امروز', value: '۴۲٫۵م' },
  { label: 'اعضای فعال', value: '۱٫۲۴۰' },
]

const bars = [42, 58, 36, 74, 62, 88, 68]
const days = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']

const members = [
  { name: 'سارا احمدی', plan: 'بدنسازی — ۳ ماه', state: 'فعال' },
  { name: 'رضا کریمی', plan: 'استخر — سانس صبح', state: 'در حال اتمام' },
  { name: 'مینا رستمی', plan: 'بدنسازی — ۱۲ ماه', state: 'فعال' },
  { name: 'امیر توکلی', plan: 'رزمی — گروه نوجوانان', state: 'فعال' },
]

const financeRows = [
  { label: 'شهریه عضویت', value: '۲۸٫۴م' },
  { label: 'خدمات و تجهیزات', value: '۹٫۱م' },
  { label: 'هزینه‌های جاری', value: '۶٫۳م' },
  { label: 'سهم همکاران', value: '۴٫۷م' },
]

const messages = [
  { text: 'یادآوری: قرارداد شما ۵ روز دیگر به پایان می‌رسد.', time: '۰۹:۱۲' },
  { text: 'پرداخت شما با موفقیت ثبت شد.', time: '۱۱:۴۰' },
  { text: 'سانس فردا صبح از ۷:۳۰ آغاز می‌شود.', time: '۱۸:۰۵' },
]

const slots = [
  { title: 'سانس صبح', time: '۰۷:۳۰ — ۱۲:۰۰', fill: 78 },
  { title: 'سانس عصر', time: '۱۴:۰۰ — ۱۹:۰۰', fill: 62 },
  { title: 'سانس شب', time: '۱۹:۳۰ — ۲۳:۰۰', fill: 41 },
]

function Screen({ screen }) {
  if (screen === 'members') {
    return (
      <div className="mock-screen">
        <div className="mock-search">جست‌وجوی عضو…</div>
        <ul className="mock-rows">
          {members.map((row) => (
            <li className="mock-row" key={row.name}>
              <span className="mock-avatar" aria-hidden="true" />
              <span className="mock-row__main">
                <span className="mock-row__title">{row.name}</span>
                <span className="mock-row__meta">{row.plan}</span>
              </span>
              <span className={`mock-chip${row.state === 'فعال' ? ' is-ok' : ' is-warn'}`}>{row.state}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  if (screen === 'finance') {
    return (
      <div className="mock-screen">
        <div className="mock-highlight">
          <span className="mock-highlight__label">گردش مالی ماه</span>
          <span className="mock-highlight__value">۴۸٫۶ میلیون تومان</span>
        </div>
        <ul className="mock-list">
          {financeRows.map((row) => (
            <li className="mock-list__row" key={row.label}>
              <span className="mock-list__label">{row.label}</span>
              <span className="mock-dots" aria-hidden="true" />
              <span className="mock-list__value">{row.value}</span>
            </li>
          ))}
        </ul>
        <div className="mock-bars">
          {bars.map((value, index) => (
            <span className="mock-bars__item" key={days[index]}>
              <span className="mock-bars__bar" style={{ height: `${value}%` }} />
              <span className="mock-bars__label">{days[index]}</span>
            </span>
          ))}
        </div>
      </div>
    )
  }

  if (screen === 'messages') {
    return (
      <div className="mock-screen">
        <ul className="mock-rows">
          {messages.map((row) => (
            <li className="mock-message" key={row.time}>
              <span className="mock-message__text">{row.text}</span>
              <span className="mock-message__time">{row.time}</span>
            </li>
          ))}
        </ul>
        <div className="mock-search">متن پیامک به گروه اعضا…</div>
      </div>
    )
  }

  if (screen === 'schedule') {
    return (
      <div className="mock-screen">
        {slots.map((slot) => (
          <div className="mock-slot" key={slot.title}>
            <span className="mock-slot__head">
              <span className="mock-row__title">{slot.title}</span>
              <span className="mock-row__meta">{slot.time}</span>
            </span>
            <span className="mock-progress">
              <span className="mock-progress__fill" style={{ width: `${slot.fill}%` }} />
            </span>
          </div>
        ))}
        <div className="mock-search">یادآوری خودکار پایان قرارداد…</div>
      </div>
    )
  }

  return (
    <div className="mock-screen">
      <div className="mock-stats">
        {overviewStats.map((stat) => (
          <span className="mock-stat" key={stat.label}>
            <span className="mock-stat__label">{stat.label}</span>
            <span className="mock-stat__value">{stat.value}</span>
          </span>
        ))}
      </div>
      <div className="mock-bars">
        {bars.map((value, index) => (
          <span className="mock-bars__item" key={days[index]}>
            <span className="mock-bars__bar" style={{ height: `${value}%` }} />
            <span className="mock-bars__label">{days[index]}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function AppMockup({
  device = 'dashboard',
  screen = 'overview',
  companion = false,
  className = '',
  label = 'نمای شماتیک از رابط نرم‌افزار مدیریت مجموعه ورزشی',
}) {
  return (
    <div className={`mockup mockup--${device} ${className}`} role="img" aria-label={label}>
      <div className="mockup__stage">
        {device === 'mobile' ? (
          <div className="mockup__phone">
            <span className="mockup__phone-notch" aria-hidden="true" />
            <div className="mock-screen mock-screen--phone">
              <Screen screen={screen} />
            </div>
          </div>
        ) : (
          <div className="mockup__frame">
            <div className="mockup__topbar" aria-hidden="true">
              <span className="mockup__dots">
                <span />
                <span />
                <span />
              </span>
              <span className="mockup__title">ورزش سافت — پنل مدیریت</span>
            </div>
            <div className="mockup__body">
              {device === 'dashboard' ? (
                <div className="mockup__sidebar" aria-hidden="true">
                  {navItems.map((item, index) => (
                    <span className={`mockup__nav${index === 0 ? ' is-active' : ''}`} key={item}>
                      <span className="mockup__nav-dot" />
                      {item}
                    </span>
                  ))}
                </div>
              ) : null}
              <div className="mockup__content">
                <Screen screen={screen} />
              </div>
            </div>
          </div>
        )}

        {companion ? (
          <div className="mockup__companion" aria-hidden="true">
            <span className="mockup__phone-notch" />
            <div className="mock-screen mock-screen--phone">
              <Screen screen="messages" />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
