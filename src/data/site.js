/**
 * اطلاعات پایه برند، منو و راه‌های ارتباطی.
 *
 * مقادیری که `null` هستند اطلاعات تأییدشدهٔ شرکت نیستند؛ در رابط کاربری با برچسب
 * «جایگزین شود» نمایش داده می‌شوند و پیش از انتشار باید در همین فایل جایگزین شوند.
 */
export const site = {
  brand: {
    fa: 'ورزش سافت',
    en: 'Varzeshsoft',
    legalFa: 'رویال مهر رایانه',
    slogan: 'نرم‌افزار یکپارچه مدیریت مجموعه‌های ورزشی',
  },
  /** توضیح کوتاه یک‌خطی از محصول (در فوتر و بخش‌های معرفی استفاده می‌شود) */
  summary:
    'نرم‌افزار جامع مدیریت مجموعه‌های ورزشی؛ نصب روی سرور مجموعه و در دسترس سیستم‌های متصل به شبکه داخلی.',
  contact: {
    phone: null, // TODO: شماره تماس تأییدشده
    email: null, // TODO: ایمیل تأییدشده
    address: null, // TODO: نشانی تأییدشده
    supportHours: null, // TODO: ساعات پاسخ‌گویی
  },
  /** شبکه‌های اجتماعی؛ نمونه: { label: 'اینستاگرام', href: 'https://…', icon: 'Instagram' } */
  socials: [],
  /**
   * آدرس سامانهٔ ورود کاربران. تا زمانی که خالی باشد، دکمهٔ «ورود به سامانه»
   * یک پیام راهنما نشان می‌دهد و به هیچ مقصد ساختگی هدایت نمی‌شود.
   */
  loginUrl: '',
  demoPath: '/request-demo',
}

export const placeholderLabel = 'جایگزین شود'

export const navItems = [
  { label: 'صفحه اصلی', to: '/' },
  { label: 'امکانات', to: '/features' },
  { label: 'راهکارها', to: '/solutions' },
  { label: 'خدمات', to: '/services' },
  { label: 'مشتریان', to: '/#clients' },
  { label: 'درباره ما', to: '/about' },
  { label: 'تماس با ما', to: '/contact' },
]

export const footerColumns = [
  {
    title: 'دسترسی سریع',
    links: [
      { label: 'صفحه اصلی', to: '/' },
      { label: 'امکانات', to: '/features' },
      { label: 'راهکارها', to: '/solutions' },
      { label: 'خدمات', to: '/services' },
      { label: 'مشتریان', to: '/#clients' },
      { label: 'درباره ما', to: '/about' },
    ],
  },
  {
    title: 'خدمات و پشتیبانی',
    links: [
      { label: 'پشتیبانی', to: '/support' },
      { label: 'آموزش', to: '/support' },
      { label: 'درخواست دمو', to: '/request-demo' },
      { label: 'خدمات تکمیلی', to: '/services' },
      { label: 'تماس با ما', to: '/contact' },
    ],
  },
]

/** انواع مجموعهٔ ورزشی برای فرم درخواست دمو */
export const facilityTypes = [
  'مجموعه ورزشی چندمنظوره',
  'باشگاه بدنسازی و آمادگی جسمانی',
  'استخر و مجموعه آبی',
  'سالن ورزشی و آکادمی',
  'باشگاه رزمی',
  'سایر',
]

export const contactMethods = ['تماس تلفنی', 'پیامک', 'ایمیل']
