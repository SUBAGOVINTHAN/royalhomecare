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
    photo: photoInstall,
  },
  {
    title: 'AC Repair',
    group: 'ac',
    desc: 'Gas leaks, drainage issues, odd noises and cooling drops diagnosed and fixed the same visit, wherever possible.',
    photo: photoRepair,
  },
  {
    title: 'AC Maintenance (AMC)',
    group: 'ac',
    desc: 'Scheduled filter cleaning, coil servicing and gas top-ups so your unit runs efficiently all year.',
    photo: photoMaintenance,
  },

  // Home appliances
  {
    title: 'Refrigerator',
    group: 'home',
    desc: 'Cooling loss, compressor and gas faults and thermostat repairs for single and double-door models.',
    photo: photoRefrigerator,
    pos: '70% center',
  },
  {
    title: 'Microwave Oven',
    group: 'home',
    desc: 'Heating faults, turntable and control-panel problems repaired for solo, grill and convection ovens.',
    photo: photoMicrowave,
    pos: '50% center',
  },
  {
    title: 'Washing Machine',
    group: 'home',
    desc: 'Drum, drain, spin and noise problems fixed for top-load and front-load machines.',
    photo: photoWashing,
    pos: '45% center',
  },
  {
    title: 'Deep Freezer',
    group: 'home',
    desc: 'Cooling and compressor checks, gas refilling and thermostat repairs for chest and upright freezers.',
    photo: photoFreezer,
    pos: '65% center',
  },

  // Commercial AC systems
  {
    title: '3 Phase AC',
    group: 'commercial',
    desc: 'Fault finding and servicing for three-phase AC units, including wiring, contactors and compressor checks.',
    photo: photoThreePhase,
    pos: '35% center',
  },
  {
    title: 'Cassette AC',
    group: 'commercial',
    desc: 'Cleaning, servicing and installation for ceiling cassette units in offices, showrooms and shops.',
    photo: photoCassette,
    pos: '45% center',
  },
  {
    title: 'Ductable AC',
    group: 'commercial',
    desc: 'Installation, servicing and airflow checks for ducted AC systems.',
    photo: photoDuctable,
    pos: '40% center',
  },
  {
    title: 'VRF / VRV AC',
    group: 'commercial',
    desc: 'Scheduled maintenance and fault finding for multi-zone VRF and VRV systems.',
    photo: photoVrf,
    pos: '40% center',
  },
  {
    title: 'Packaged AC',
    group: 'commercial',
    desc: 'Installation and servicing for rooftop and floor-standing packaged AC units.',
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
    <section id="services" className="bg-cream px-4 py-20 sm:px-6 sm:py-24 lg:px-10">
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
            Complete AC & Home Appliance Solutions
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/70">
            From air conditioning to home appliance repairs, we provide reliable service for homes and businesses.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div
          role="tablist"
          aria-label="Filter services"
          className="mt-8 flex flex-wrap gap-2 sm:mt-10 sm:gap-2.5"
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
                className="focus-ring rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5 sm:px-5 sm:py-2.5 sm:text-sm"
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

        {/* 2 columns on mobile, 2 on tablet, 3 on desktop */}
        <motion.div
          key={filter}
          className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-6 lg:grid-cols-3"
          initial="hidden"
          animate="show"
          variants={grid}
        >
          {visible.map(({ title, desc, photo, pos }) => (
            <motion.div
              key={title}
              variants={card}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_16px_rgba(11,42,91,0.08)] transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(11,42,91,0.16)] sm:rounded-3xl"
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
                  className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-navy-deep/0 to-transparent"
                />
              </div>

              {/* Text */}
              <div className="flex flex-1 flex-col px-3 pb-4 pt-3.5 sm:px-6 sm:pb-7 sm:pt-6">
                <h3 className="font-display text-sm font-semibold leading-snug text-navy sm:text-lg">
                  {title}
                </h3>
                <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-ink/65 sm:mt-2 sm:line-clamp-none sm:text-sm">
                  {desc}
                </p>

                <a
                  href="#contact"
                  className="focus-ring mt-auto inline-flex items-center gap-1.5 pt-3 text-xs font-semibold sm:pt-4 sm:text-sm"
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