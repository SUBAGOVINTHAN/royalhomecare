import { motion } from 'framer-motion'

// Drop a photo per service into src/assets/services/ using these names,
// or swap the paths below to match whatever you already have.
import photoInstall from '../assets/services/ac-installation.jpg'
import photoRepair from '../assets/services/ac-repair.jpg'
import photoMaintenance from '../assets/services/ac-maintenance.jpg'
import photoPlumbing from '../assets/services/plumbing.jpg'
import photoElectrical from '../assets/services/electrical.jpg'
import photoCleaning from '../assets/services/deep-cleaning.jpg'

const SERVICES = [
  {
    title: 'AC Installation',
    desc: 'Split, window and inverter AC units mounted, wired and pressure-tested for a clean first start.',
    icon: IconInstall,
    photo: photoInstall,
  },
  {
    title: 'AC Repair',
    desc: 'Gas leaks, drainage issues, odd noises and cooling drops diagnosed and fixed the same visit, wherever possible.',
    icon: IconRepair,
    photo: photoRepair,
  },
  {
    title: 'AC Maintenance (AMC)',
    desc: 'Scheduled filter cleaning, coil servicing and gas top-ups so your unit runs efficiently all year.',
    icon: IconMaintenance,
    photo: photoMaintenance,
  },
  {
    title: 'Plumbing',
    desc: 'Leak fixes, tap and pipe fittings, bathroom fixtures and drainage work for the rest of the house.',
    icon: IconPlumbing,
    photo: photoPlumbing,
  },
  {
    title: 'Electrical Work',
    desc: 'Wiring, switchboards, fan and light installation, and safety inspections by licensed electricians.',
    icon: IconElectrical,
    photo: photoElectrical,
  },
  {
    title: 'Home Deep Cleaning',
    desc: 'Kitchen, bathroom and full-home deep cleans that get into the corners a weekly clean misses.',
    icon: IconCleaning,
    photo: photoCleaning,
  },
]

const headerVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}

const card = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function Services() {
  return (
    <section id="services" className="bg-cream px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="max-w-xl"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={headerVariants}
        >
          <p className="text-sm font-semibold" style={{ color: 'var(--color-navy)' }}>
            What we do
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-navy sm:text-4xl">
            One team for cooling and everything else at home.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/70">
            Book AC work on its own, or add on the household jobs that tend to pile up.
            Every visit is scoped and quoted before we start.
          </p>
        </motion.div>

        <motion.div
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={grid}
        >
          {SERVICES.map(({ title, desc, icon: Icon, photo }) => (
            <motion.div
              key={title}
              variants={card}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-[0_2px_16px_rgba(11,42,91,0.08)] transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(11,42,91,0.16)]"
            >
              {/* Photo */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={photo}
                  alt={title}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-navy-deep/0 to-transparent"
                />

                {/* Icon badge overlapping the photo */}
                <span
                  className="absolute -bottom-6 left-6 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg ring-4 ring-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-3"
                  style={{ backgroundColor: 'var(--color-navy)' }}
                >
                  <Icon className="h-7 w-7 text-gold-light" />
                </span>
              </div>

              {/* Text */}
              <div className="px-6 pb-7 pt-10">
                <h3 className="font-display text-lg font-semibold text-navy">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{desc}</p>

                <a
                  href="#contact"
                  className="focus-ring mt-4 inline-flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: 'var(--color-navy)' }}
                >
                  Know More
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    style={{ color: 'var(--color-gold)' }}
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>

              {/* Gold edge on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                style={{ backgroundColor: 'var(--color-gold)' }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function IconInstall(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="6" width="18" height="7" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 13v3M12 13v4M17 13v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9 6V4.5M15 6V4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
function IconRepair(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M14.7 6.3a3.5 3.5 0 0 1-4.6 4.6L5 16l3 3 5.1-5.1a3.5 3.5 0 0 1 4.6-4.6l-2.3 2.3-2-2 2.3-2.3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}
function IconMaintenance(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 3.5v2M12 18.5v2M20.5 12h-2M5.5 12h-2M17.8 6.2l-1.4 1.4M7.6 16.4l-1.4 1.4M17.8 17.8l-1.4-1.4M7.6 7.6 6.2 6.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}
function IconPlumbing(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M6 4h6v6a4 4 0 0 0 4 4h2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="18" cy="17" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 4v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
function IconElectrical(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M13 3 5 13h5l-1 8 8-10h-5l1-8z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}
function IconCleaning(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M9 3 6 16h6L9 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M13 10c3 0 6 2.2 6 6s-3 4.5-6 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M6 20h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}