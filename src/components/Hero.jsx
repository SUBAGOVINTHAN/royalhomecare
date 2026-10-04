import { motion } from 'framer-motion'
import technicianPhoto from '../assets/hero-technician.png'

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

const SERVICES = [
  {
    title: 'AC Installation',
    desc: 'Professional installation for all types of ACs.',
    icon: (
      <path d="M4 8h16v3H4V8Zm2 3v7m2-7v9m8-9v9m2-9v7M9 22h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    ),
  },
  {
    title: 'AC Repair',
    desc: 'Quick and efficient repair service.',
    icon: (
      <path
        d="M14.7 6.3a3 3 0 0 0-4 4L4 17v3h3l6.7-6.7a3 3 0 0 0 4-4l-2.2 2.2-2-2 2.2-2.2Z"
        stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none"
      />
    ),
  },
  {
    title: 'AC Maintenance',
    desc: 'Regular service for better performance.',
    icon: (
      <>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <path
          d="M12 3v2.2M12 18.8V21M21 12h-2.2M5.2 12H3M18 6l-1.6 1.6M7.6 16.4 6 18M18 18l-1.6-1.6M7.6 7.6 6 6"
          stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
        />
      </>
    ),
  },
  {
    title: 'Gas Filling',
    desc: 'Refill & check for optimal cooling.',
    icon: (
      <path
        d="M12 3c2.4 3 4.5 5.7 4.5 8.7A4.5 4.5 0 0 1 12 16.2a4.5 4.5 0 0 1-4.5-4.5C7.5 8.7 9.6 6 12 3Z"
        stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none"
      />
    ),
  },
  {
    title: 'Uninstallation & Reinstallation',
    desc: 'Safe and hassle-free service.',
    icon: (
      <>
        <rect x="4" y="8" width="16" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <path d="M8 14v3m8-3v3M10 3l2 2 2-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      </>
    ),
  },
]

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-24 lg:pt-28"
      style={{
        background: 'linear-gradient(160deg, #0b2a5b 0%, #0d3470 45%, #0a2348 100%)',
      }}
    >
      {/* subtle dots */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
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
      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-6 pb-16 pt-10 lg:grid-cols-2 lg:gap-6 lg:px-10 lg:pb-20 lg:pt-12">

        {/* LEFT - Text Content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-20"
        >
          <motion.p
            variants={item}
            className="mb-4 flex items-center gap-2 font-sans text-xs font-bold tracking-[0.2em]"
            style={{ color: '#f0c14b' }}
          >
            COOL SPACES
            <span className="h-1 w-1 rounded-full bg-[#f0c14b]" />
            BETTER LIVING
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-[2.5rem] font-bold leading-[1.15] text-white sm:text-5xl lg:text-[3.25rem]"
          >
            Professional
            <br />
            <span style={{ color: '#f0c14b' }}>AC Service &amp; Repair</span>
            <br />
            at Your Doorstep
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-md font-sans text-[15px] leading-relaxed text-white/75"
          >
            Keep your home and office cool with our reliable and affordable AC
            service. We provide installation, repair, maintenance and more —
            all with expert care.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-sans text-sm font-semibold text-[#0a2348] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
              style={{ backgroundColor: '#f0c14b' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
                <path d="M3 9.5h18M8 3v3.4M16 3v3.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Book Your Service
              <span>→</span>
            </a>

            <a href="#gallery" className="group inline-flex items-center gap-3">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full transition-transform group-hover:scale-110"
                style={{ backgroundColor: '#f0c14b' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#0a2348">
                  <path d="M6 4.5v15l13-7.5-13-7.5Z" />
                </svg>
              </span>
              <span className="font-sans text-sm font-semibold text-white">
                Watch Our Service
              </span>
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT - Image only (no extra text) */}
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
            alt="Royal Home Care technician servicing AC"
            className="relative z-10 mx-auto w-full rounded-2xl shadow-2xl"
          />
        </motion.div>
      </div>

      {/* Wave */}
      <div className="relative">
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className="relative -mb-1 h-14 w-full lg:h-16"
        >
          <path
            d="M0 90 C 360 20, 1080 20, 1440 90 L1440 90 L0 90 Z"
            fill="#ffffff"
          />
          <path
            d="M0 86 C 360 18, 1080 18, 1440 86"
            fill="none"
            stroke="#f0c14b"
            strokeWidth="3"
          />
        </svg>
      </div>

      {/* Services Strip */}
      <div className="bg-white py-12 lg:py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-6 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-slate-200 lg:px-10">
          {SERVICES.map((service) => (
            <div key={service.title} className="flex flex-col items-center px-3 text-center">
              <span
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 transition-transform hover:-translate-y-1"
                style={{ borderColor: '#f0c14b', color: '#0a2348' }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24">
                  {service.icon}
                </svg>
              </span>
              <h3 className="font-display text-[15px] font-semibold text-[#0a2348]">
                {service.title}
              </h3>
              <p className="mt-1 max-w-[140px] font-sans text-xs leading-relaxed text-slate-500">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}