import logo from '../assets/logo.jpeg'

const EMAIL = 'royalhomecare2026@gmail.com'

const PHONES = [
  { display: '+91 97898 43950', href: 'tel:+919789843950' },
  { display: '+91 80722 90254', href: 'tel:+918072290254' },
]

const WHATSAPP_HREF =
  'https://wa.me/919500160491?text=Hi%20Royal%20Home%20Care%2C%20I%20would%20like%20to%20book%20a%20service.'

const QUICK_LINKS = [
  { href: '#top', label: 'Home' },
  { href: '#about', label: 'About Us' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'How It Works' },
  { href: '#clients', label: 'Our Clients' },
  { href: '#contact', label: 'Contact' },
]

const SERVICE_LINKS = [
  'Air Conditioning',
  'Refrigerator',
  'Washing Machine',
  'Microwave Oven',
  'Deep Freezer',
  'Commercial AC Systems',
]

export default function Footer() {
  return (
    <footer className="relative" style={{ backgroundColor: 'var(--color-navy-deep)' }}>
      {/* gold accent line */}
      <div
        aria-hidden="true"
        className="h-[3px] w-full"
        style={{ background: 'linear-gradient(90deg, #f0c14b, #e8a317)' }}
      />

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-14 lg:px-10 lg:pb-8 lg:pt-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr_1.3fr] lg:gap-10">
          {/* Brand */}
          <div>
            <a href="#top" className="focus-ring inline-flex items-center gap-3 rounded-full">
              <img
                src={logo}
                alt="Royal Home Care logo"
                className="h-14 w-14 rounded-full object-cover ring-2"
                style={{ '--tw-ring-color': 'var(--color-gold)' }}
              />
              <span className="leading-tight">
                <span className="block font-display text-lg font-semibold text-white">Royal</span>
                <span
                  className="block text-sm font-semibold tracking-[0.08em]"
                  style={{ color: 'var(--color-gold-light)' }}
                >
                  Home Care
                </span>
              </span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
              Reliable AC and home appliance service for homes and businesses, with
              upfront quotes and technicians who explain the work before they start.
            </p>

            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: '#25D366' }}
            >
              <WhatsAppIcon className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Quick links */}
          <div>
            <FooterHeading>Quick Links</FooterHeading>
            <ul className="mt-5 space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="focus-ring group inline-flex items-center gap-2 rounded text-sm text-white/75 transition-colors hover:text-white"
                  >
                    <span
                      aria-hidden="true"
                      className="h-px w-3 bg-white/30 transition-all duration-300 group-hover:w-5 group-hover:bg-[#f0c14b]"
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <FooterHeading>Our Services</FooterHeading>
            <ul className="mt-5 space-y-3">
              {SERVICE_LINKS.map((name) => (
                <li key={name}>
                  <a
                    href="#services"
                    className="focus-ring inline-block rounded text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <FooterHeading>Contact Us</FooterHeading>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <IconBadge>
                  <IconMail className="h-4 w-4" />
                </IconBadge>
                <a
                  href={`mailto:${EMAIL}`}
                  className="focus-ring mt-1.5 break-all rounded text-white/85 transition-colors hover:text-white"
                >
                  {EMAIL}
                </a>
              </li>

              <li className="flex items-start gap-3">
                <IconBadge>
                  <IconPhone className="h-4 w-4" />
                </IconBadge>
                <div className="mt-1.5 flex flex-col gap-1.5">
                  {PHONES.map((p) => (
                    <a
                      key={p.href}
                      href={p.href}
                      className="focus-ring rounded font-medium text-white/85 transition-colors hover:text-white"
                    >
                      {p.display}
                    </a>
                  ))}
                </div>
              </li>

              <li className="flex items-start gap-3">
                <IconBadge>
                  <IconClock className="h-4 w-4" />
                </IconBadge>
                <div className="mt-1.5 text-white/75">
                  <p>Mon–Sun, 8:00 AM – 9:00 PM</p>
                  <p className="mt-0.5 text-white/60">24/7 for emergencies</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} Royal Home Care. All rights reserved.
          </p>

          <a
            href="#top"
            className="focus-ring group inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/80 transition-colors hover:border-white/50 hover:text-white"
          >
            Back to top
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
              style={{ color: 'var(--color-gold-light)' }}
            >
              <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}

function FooterHeading({ children }) {
  return (
    <div>
      <h3 className="font-display text-base font-semibold text-white">{children}</h3>
      <span
        aria-hidden="true"
        className="mt-2 block h-0.5 w-8 rounded-full"
        style={{ backgroundColor: 'var(--color-gold)' }}
      />
    </div>
  )
}

function IconBadge({ children }) {
  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10"
      style={{ color: 'var(--color-gold-light)' }}
    >
      {children}
    </span>
  )
}

function IconMail(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function IconPhone(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.5 4h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconClock(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}