import { motion } from 'framer-motion'

const STEPS = [
  {
    n: '01',
    title: 'Book a visit',
    desc: 'Call, WhatsApp or fill the contact form with what you need looked at.',
  },
  {
    n: '02',
    title: 'Inspect, quote & fix',
    desc: 'A technician visits, checks the issue and gives you the price upfront. Once you approve, we complete the job, clean up after ourselves, and back it with a service warranty.',
  },
]

const stepVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.25, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Process() {
  return (
    <section id="process" className="relative px-6 py-24 lg:px-10" style={{ backgroundColor: 'var(--color-navy-deep)' }}>
      <div className="royal-texture pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-xl">
          <p className="text-sm font-semibold" style={{ color: 'var(--color-gold-light)' }}>
            How it works
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
            Two steps from call to fixed.
          </h2>
        </div>

        <div className="mt-16 flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-0">
          {STEPS.map((step, i) => (
            <div key={step.n} className="contents">
              <motion.div
                custom={i}
                variants={stepVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                className="relative lg:flex-1"
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full font-display text-base font-semibold text-navy-deep"
                  style={{ backgroundColor: 'var(--color-gold)' }}
                >
                  {step.n}
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-md text-base leading-relaxed text-white/75">
                  {step.desc}
                </p>
              </motion.div>

              {/* Dotted connector between the two steps (desktop only) */}
              {i === 0 && (
                <motion.div
                  aria-hidden="true"
                  className="mt-7 hidden h-0 origin-left border-t-2 border-dashed lg:block lg:w-40 xl:w-64"
                  style={{ borderColor: 'rgba(217,164,48,0.5)' }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1, delay: 0.3, ease: 'easeInOut' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}