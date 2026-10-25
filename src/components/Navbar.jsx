import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../assets/logo.jpeg'

const LINKS = [
  { href: '#top', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#why-us', label: 'Why Us' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
]

const PHONE_DISPLAY = '+91 95001 60491'
const PHONE_HREF = 'tel:+919500160491'
const WHATSAPP_HREF =
  'https://wa.me/919500160491?text=Hi%20Royal%20Home%20Care%2C%20I%20would%20like%20to%20book%20a%20service.'

function WhatsAppIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#top')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_4px_24px_rgba(11,42,91,0.08)]' : 'shadow-none'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
        {/* Logo — highlighted with a soft gold halo and a pulse ring on load */}
        <a
          href="#top"
          onClick={() => setActive('#top')}
          className="focus-ring group flex items-center gap-3 rounded-full"
        >
          <div className="relative flex h-14 w-14 items-center justify-center">
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full"
              style={{ boxShadow: '0 0 0 0 rgba(217,164,48,0.55)' }}
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(217,164,48,0.45)',
                  '0 0 0 8px rgba(217,164,48,0)',
                  '0 0 0 0 rgba(217,164,48,0)',
                ],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full blur-md opacity-60"
              style={{ background: 'radial-gradient(circle, var(--color-gold) 0%, transparent 70%)' }}
            />
            <img
              src={logo}
              alt="Royal Home Care logo"
              className="relative h-14 w-14 rounded-full object-cover ring-2 ring-white transition-transform duration-300 group-hover:scale-105"
              style={{ boxShadow: '0 0 0 2px var(--color-gold)' }}
            />
          </div>
          <span className="font-display leading-tight">
            <span className="block text-lg font-semibold tracking-tight text-navy-deep">
              Royal
            </span>
            <span
              className="block text-sm font-semibold tracking-[0.08em]"
              style={{ color: 'var(--color-gold)' }}
            >
              Home Care
            </span>
          </span>
        </a>

        {/* Center links */}
        <nav className="hidden items-center gap-9 lg:flex">
          {LINKS.map((link) => {
            const isActive = active === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActive(link.href)}
                className="focus-ring relative rounded pb-1 font-sans text-[15px] font-medium text-navy-deep/80 transition-colors hover:text-navy-deep"
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full"
                    style={{ backgroundColor: 'var(--color-gold)' }}
                  />
                )}
              </a>
            )
          })}
        </nav>

        {/* Right: phone + WhatsApp + CTA */}
        <div className="hidden items-center gap-5 lg:flex">
          <a href={PHONE_HREF} className="focus-ring flex items-center gap-3 rounded-full">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full text-white"
              style={{ backgroundColor: 'var(--color-navy-deep)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className="leading-tight">
              <span className="block font-display text-[15px] font-semibold text-navy-deep">
                {PHONE_DISPLAY}
              </span>
              <span className="block text-xs text-navy-deep/55">Call Us Now</span>
            </span>
          </a>

          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-white transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: '#25D366' }}
          >
            <WhatsAppIcon size={22} />
          </a>

          <a
            href="#contact"
            className="focus-ring flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-navy-deep shadow-sm transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: 'var(--color-gold)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
              <path d="M3 9.5h18M8 3v3.4M16 3v3.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Book Service
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="focus-ring flex h-10 w-10 items-center justify-center rounded-full text-navy-deep lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-navy-deep/10 bg-white lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setActive(link.href)
                    setOpen(false)
                  }}
                  className="focus-ring rounded py-3 font-sans text-base font-medium text-navy-deep/85"
                >
                  {link.label}
                </a>
              ))}

              <div className="flex items-center gap-3 py-2">
                <a
                  href={PHONE_HREF}
                  className="focus-ring flex flex-1 items-center gap-2 text-sm font-semibold text-navy-deep"
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: 'var(--color-navy-deep)' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  {PHONE_DISPLAY}
                </a>

                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  className="focus-ring flex h-10 w-10 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: '#25D366' }}
                >
                  <WhatsAppIcon size={20} />
                </a>
              </div>

              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="focus-ring mt-2 rounded-full px-5 py-3 text-center text-sm font-semibold text-navy-deep"
                style={{ backgroundColor: 'var(--color-gold)' }}
              >
                Book Service
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}