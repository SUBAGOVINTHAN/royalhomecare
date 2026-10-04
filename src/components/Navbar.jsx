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

const PHONE_DISPLAY = '+91 1234567'
const PHONE_HREF = 'tel:+919876543210'

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

        {/* Right: phone + CTA */}
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
              <a
                href={PHONE_HREF}
                className="focus-ring flex items-center gap-2 py-2 text-sm font-semibold text-navy-deep"
              >
                {PHONE_DISPLAY}
              </a>
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