import { motion, MotionConfig } from 'framer-motion'
import technicianPhoto from '../assets/hero-technician.png'

const GOLD_BRIGHT = '#ffd35c'
const NAVY = '#0a2348'

const PHONE_DISPLAY = '+91 95001 60491'
const PHONE_HREF = 'tel:+919500160491'

// Extra numbers shown under the buttons
const MORE_PHONES = [
  { display: '+91 97898 43950', href: 'tel:+919789843950' },
  { display: '+91 80722 90254', href: 'tel:+918072290254' },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-24 lg:pt-28"
      style={{
        background: 'linear-gradient(160deg, #0b2a5b 0%, #0d3470 45%, #0a2348 100%)',
      }}
    >
      <MotionConfig reducedMotion="user">
        {/* subtle dots */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* gold line */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[2.5px]"
          style={{ background: 'linear-gradient(90deg, #f0c14b, #e8a317)' }}
        />

        {/* Main Content */}
        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-6 pb-10 pt-6 sm:pb-16 sm:pt-10 lg:grid-cols-2 lg:gap-6 lg:px-10 lg:pb-20 lg:pt-12">
          {/* LEFT - Text */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative z-20"
          >
            <motion.p
              variants={item}
              className="mb-4 flex items-center gap-2 whitespace-nowrap font-sans text-xs font-bold uppercase tracking-[0.16em] sm:mb-5 sm:gap-3 sm:text-sm sm:tracking-[0.2em]"
              style={{ color: GOLD_BRIGHT }}
            >
              <span aria-hidden="true" className="hidden h-[2px] w-8 sm:block" style={{ backgroundColor: GOLD_BRIGHT }} />
              Cool Spaces
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GOLD_BRIGHT }} />
              Better Living
            </motion.p>

            <motion.h1
              variants={item}
              className="font-display text-[1.8rem] font-bold leading-[1.15] tracking-tight text-white min-[400px]:text-[2.1rem] sm:text-5xl lg:text-[3.1rem]"
            >
              Complete AC &amp; Home
              <br />
              <span style={{ color: GOLD_BRIGHT }}>Appliance Services</span>
              <br />
              at Your Doorstep
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-4 max-w-xl font-sans text-[15px] leading-relaxed text-white/90 sm:mt-6 sm:text-lg"
            >
              From AC installation and repair to refrigerator, washing machine, microwave oven,
              water heater and commercial AC services, we deliver reliable solutions for your home and business.
            </motion.p>

            <motion.div variants={item} className="mt-6 flex flex-col gap-2.5 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <a
                href="#contact"
                className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 font-sans text-sm font-bold shadow-lg shadow-black/20 sm:w-auto sm:gap-2.5 sm:px-8 sm:py-4 sm:text-base transition-all hover:-translate-y-0.5 hover:shadow-xl"
                style={{ backgroundColor: GOLD_BRIGHT, color: NAVY }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M3 9.5h18M8 3v3.4M16 3v3.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                Book Your Service
                <span aria-hidden="true">→</span>
              </a>

              <a
                href={PHONE_HREF}
                className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/60 px-6 py-[0.6rem] font-sans text-sm font-semibold sm:w-auto sm:gap-2.5 sm:px-7 sm:py-[0.9rem] sm:text-base text-white transition-all hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8Z"
                    fill="currentColor"
                  />
                </svg>
                {PHONE_DISPLAY}
              </a>
            </motion.div>

            {/* More numbers */}
            {/* Mobile: label on top, numbers in 2 columns (1 column on very small screens).
                Desktop: everything on one line. */}
            <motion.div
              variants={item}
              className="mt-4 sm:mt-5 sm:flex sm:flex-wrap sm:items-center sm:gap-2.5"
            >
              <p className="mb-2 text-center font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60 sm:mb-0 sm:text-left sm:text-xs">
                Also call
              </p>
              <div className="grid grid-cols-1 gap-2.5 min-[380px]:grid-cols-2 sm:flex sm:flex-wrap">
                {MORE_PHONES.map((p) => (
                  <a
                    key={p.href}
                    href={p.href}
                    className="focus-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/25 bg-white/5 px-3 py-2.5 font-sans text-[13px] font-semibold text-white/90 transition-all hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/10 hover:text-white sm:px-3.5 sm:py-1.5 sm:text-sm"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0" style={{ color: GOLD_BRIGHT }}>
                      <path
                        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8Z"
                        fill="currentColor"
                      />
                    </svg>
                    {p.display}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT - Image (original position and size) */}
          <motion.div
            className="relative mx-auto w-full max-w-[540px] lg:max-w-none"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            {/* Soft glow */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
              style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }}
            />

            <img
              src={technicianPhoto}
              alt="Royal Home Care technician servicing an AC"
              className="relative z-10 mx-auto w-full rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>

        {/* Soft layered waves: the navy fades into the cream Services section instead of ending on a hard edge */}
        <div className="relative">
          <svg
            viewBox="0 0 1440 140"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="relative -mb-1 block h-20 w-full lg:h-28"
          >
            <path
              d="M0 78 C 240 18, 480 18, 720 58 C 960 98, 1200 98, 1440 48 L1440 140 L0 140 Z"
              style={{ fill: 'var(--color-cream, #faf6ef)', opacity: 0.22 }}
            />
            <path
              d="M0 102 C 300 52, 600 52, 900 86 C 1100 108, 1300 100, 1440 76 L1440 140 L0 140 Z"
              style={{ fill: 'var(--color-cream, #faf6ef)', opacity: 0.5 }}
            />
            <path
              d="M0 122 C 360 72, 1080 72, 1440 122 L1440 140 L0 140 Z"
              style={{ fill: 'var(--color-cream, #faf6ef)' }}
            />
          </svg>
        </div>
      </MotionConfig>
    </section>
  )
}