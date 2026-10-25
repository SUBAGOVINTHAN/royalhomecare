import { motion } from 'framer-motion'

const CLIENTS = [
  {
    name: 'L&T',
    detail: 'Metro Container AC Work',
  },
  {
    name: 'Casa Grande Supremus',
    detail: 'Club House',
  },
  {
    name: 'Faro Import & Export',
    detail: 'Commercial AMC',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function Clients() {
  return (
    <section id="clients" className="bg-white px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          <p className="text-sm font-semibold" style={{ color: 'var(--color-navy)' }}>
            Trusted By
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-navy sm:text-4xl">
            15+ years of AMC and on-site service work
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/70">
            From large-scale container AC contracts to club house and commercial AMC,
            these are a few of the businesses we've kept running.
          </p>
        </motion.div>

        {/* Stat strip */}
        <motion.div
          className="mx-auto mt-10 flex max-w-md items-center justify-center gap-3"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full font-display text-lg font-bold text-white"
            style={{ backgroundColor: 'var(--color-navy)' }}
          >
            15+
          </span>
          <span className="text-sm font-medium text-ink/70">
            Years of combined field experience across AC and home appliance service
          </span>
        </motion.div>

        {/* Client cards */}
        <motion.div
          className="mt-14 grid gap-6 sm:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
        >
          {CLIENTS.map(({ name, detail }) => (
            <motion.div
              key={name}
              variants={fadeUp}
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="group relative flex flex-col items-center gap-2 rounded-2xl border border-navy/10 bg-cream px-6 py-10 text-center transition-colors duration-300 hover:bg-white hover:shadow-[0_16px_36px_rgba(11,42,91,0.14)]"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 rounded-t-2xl transition-transform duration-300 group-hover:scale-x-100"
                style={{ backgroundColor: 'var(--color-gold)' }}
              />
              <span className="font-display text-xl font-semibold text-navy">{name}</span>
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold tracking-wide"
                style={{ backgroundColor: 'rgba(217,164,48,0.12)', color: 'var(--color-navy)' }}
              >
                {detail}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}