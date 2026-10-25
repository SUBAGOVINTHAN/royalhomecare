import { useState } from 'react'
import { motion } from 'framer-motion'

// Existing photos (keep the files you already have in src/assets/services/)
import photoInstall from '../assets/services/ac-installation.jpg'
import photoRepair from '../assets/services/ac-repair.jpg'
import photoMaintenance from '../assets/services/ac-maintenance.jpg'

// New photos: copy these into src/assets/services/
import photoRefrigerator from '../assets/services/refrigerator.jpg'
import photoMicrowave from '../assets/services/microwave-oven.jpg'
import photoWashing from '../assets/services/washing-machine.jpg'
import photoFreezer from '../assets/services/deep-freezer.jpg'
import photoThreePhase from '../assets/services/three-phase-ac.jpg'
import photoCassette from '../assets/services/cassette-ac.jpg'
import photoDuctable from '../assets/services/ductable-ac.jpg'
import photoVrf from '../assets/services/vrf-vrv-ac.jpg'
import photoPackaged from '../assets/services/packaged-ac.jpg'

const FILTERS = [
  { id: 'all', label: 'All Services' },
  { id: 'ac', label: 'Air Conditioning' },
  { id: 'home', label: 'Home Appliances' },
  { id: 'commercial', label: 'Commercial AC' },
]

const SERVICES = [
  // Air conditioning
  {
    title: 'AC Installation',
    group: 'ac',
    desc: 'Split, window and inverter AC units mounted, wired and pressure-tested for a clean first start.',
    icon: IconInstall,
    photo: photoInstall,
  },
  {
    title: 'AC Repair',
    group: 'ac',
    desc: 'Gas leaks, drainage issues, odd noises and cooling drops diagnosed and fixed the same visit, wherever possible.',
    icon: IconRepair,
    photo: photoRepair,
  },
  {
    title: 'AC Maintenance (AMC)',
    group: 'ac',
    desc: 'Scheduled filter cleaning, coil servicing and gas top-ups so your unit runs efficiently all year.',
    icon: IconMaintenance,
    photo: photoMaintenance,
  },

  // Home appliances
  {
    title: 'Refrigerator',
    group: 'home',
    desc: 'Cooling loss, compressor and gas faults and thermostat repairs for single and double-door models.',
    icon: IconFridge,
    photo: photoRefrigerator,
    pos: '70% center',
  },
  {
    title: 'Microwave Oven',
    group: 'home',
    desc: 'Heating faults, turntable and control-panel problems repaired for solo, grill and convection ovens.',
    icon: IconMicrowave,
    photo: photoMicrowave,
    pos: '50% center',
  },
  {
    title: 'Washing Machine',
    group: 'home',
    desc: 'Drum, drain, spin and noise problems fixed for top-load and front-load machines.',
    icon: IconWashing,
    photo: photoWashing,
    pos: '45% center',
  },
  {
    title: 'Deep Freezer',
    group: 'home',
    desc: 'Cooling and compressor checks, gas refilling and thermostat repairs for chest and upright freezers.',
    icon: IconFreezer,
    photo: photoFreezer,
    pos: '65% center',
  },

  // Commercial AC systems
  {
    title: '3 Phase AC',
    group: 'commercial',
    desc: 'Fault finding and servicing for three-phase AC units, including wiring, contactors and compressor checks.',
    icon: IconBolt,
    photo: photoThreePhase,
    pos: '35% center',
  },
  {
    title: 'Cassette AC',
    group: 'commercial',
    desc: 'Cleaning, servicing and installation for ceiling cassette units in offices, showrooms and shops.',
    icon: IconCassette,
    photo: photoCassette,
    pos: '45% center',
  },
  {
    title: 'Ductable AC',
    group: 'commercial',
    desc: 'Installation, servicing and airflow checks for ducted AC systems.',
    icon: IconDuct,
    photo: photoDuctable,
    pos: '40% center',
  },
  {
    title: 'VRF / VRV AC',
    group: 'commercial',
    desc: 'Scheduled maintenance and fault finding for multi-zone VRF and VRV systems.',
    icon: IconVrf,
    photo: photoVrf,
    pos: '40% center',
  },
  {
    title: 'Packaged AC',
    group: 'commercial',
    desc: 'Installation and servicing for rooftop and floor-standing packaged AC units.',
    icon: IconPackaged,
    photo: photoPackaged,
    pos: '35% center',
  },
]

const headerVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const card = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function Services() {
  const [filter, setFilter] = useState('all')
  const visible = filter === 'all' ? SERVICES : SERVICES.filter((s) => s.group === filter)

  return (
    <section id="services" className="bg-cream px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="max-w-2xl"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={headerVariants}
        >
          <p className="text-sm font-semibold" style={{ color: 'var(--color-navy)' }}>
            What we do
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-navy sm:text-4xl">
            One team for cooling and home appliances.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/70">
            Book service for your AC, home appliances or commercial AC systems.
            Every visit is scoped and quoted before we start.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div
          role="tablist"
          aria-label="Filter services"
          className="mt-10 flex flex-wrap gap-2.5"
        >
          {FILTERS.map((f) => {
            const active = filter === f.id
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.id)}
                className="focus-ring rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={
                  active
                    ? {
                        backgroundColor: 'var(--color-navy)',
                        borderColor: 'var(--color-navy)',
                        color: '#ffffff',
                      }
                    : {
                        backgroundColor: '#ffffff',
                        borderColor: 'rgba(11,42,91,0.15)',
                        color: 'var(--color-navy)',
                      }
                }
              >
                {f.label}
              </button>
            )
          })}
        </div>

        <motion.div
          key={filter}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="show"
          variants={grid}
        >
          {visible.map(({ title, desc, icon: Icon, photo, pos }) => (
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
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  style={pos ? { objectPosition: pos } : undefined}
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

/* ---------- Icons ---------- */

const stroke = {
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
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
function IconFridge(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="6" y="2.5" width="12" height="19" rx="2" {...stroke} />
      <path d="M6 10h12M9 6v1.5M9 13v3" {...stroke} />
    </svg>
  )
}
function IconMicrowave(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="2.5" y="6" width="19" height="12" rx="2" {...stroke} />
      <rect x="5.5" y="9" width="9" height="6" rx="1" {...stroke} />
      <path d="M18 9.5h.01M18 12h.01M18 14.5h.01" {...stroke} strokeWidth="2.2" />
    </svg>
  )
}
function IconWashing(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="4" y="2.5" width="16" height="19" rx="2" {...stroke} />
      <circle cx="12" cy="13.5" r="4.5" {...stroke} />
      <path d="M7.5 6h2M15.5 6h.01" {...stroke} />
    </svg>
  )
}
function IconFreezer(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="8" width="18" height="12" rx="2" {...stroke} />
      <path d="M3 12.5h18M9 8V6h6v2M10 16h4" {...stroke} />
    </svg>
  )
}
function IconBolt(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M13 3 5 13h5l-1 8 8-10h-5l1-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}
function IconCassette(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" {...stroke} />
      <rect x="7" y="7" width="10" height="10" rx="1.5" {...stroke} />
      <circle cx="12" cy="12" r="1.6" {...stroke} />
    </svg>
  )
}
function IconDuct(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="2.5" y="8" width="9" height="8" rx="1.5" {...stroke} />
      <path d="M11.5 10h4.5l4.5-3v10l-4.5-3h-4.5" {...stroke} />
    </svg>
  )
}
function IconVrf(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="2.5" {...stroke} />
      <circle cx="5" cy="5" r="2" {...stroke} />
      <circle cx="19" cy="5" r="2" {...stroke} />
      <circle cx="5" cy="19" r="2" {...stroke} />
      <circle cx="19" cy="19" r="2" {...stroke} />
      <path d="M6.5 6.5l3.7 3.7M17.5 6.5l-3.7 3.7M6.5 17.5l3.7-3.7M17.5 17.5l-3.7-3.7" {...stroke} />
    </svg>
  )
}
function IconPackaged(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="2.5" y="6" width="19" height="12" rx="2" {...stroke} />
      <circle cx="9" cy="12" r="3" {...stroke} />
      <path d="M15 9.5h3.5M15 12h3.5M15 14.5h3.5" {...stroke} />
    </svg>
  )
}