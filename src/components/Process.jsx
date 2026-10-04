import { motion } from 'framer-motion'

const STEPS = [
  {
    n: '01',
    title: 'Book a visit',
    desc: 'Call, WhatsApp or fill the contact form with what you need looked at.',
  },
  {
    n: '02',
    title: 'Free inspection',
    desc: 'A technician visits, checks the issue and explains what it will take to fix.',
  },
  {
    n: '03',
    title: 'Upfront quote',
    desc: 'You approve the price before any work starts — no surprises on the bill.',
  },
  {
    n: '04',
    title: 'Work, done right',
    desc: 'We complete the job, clean up after ourselves, and back it with a service warranty.',
  },
]

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
            Four steps from call to fixed.
          </h2>
        </div>

        <div className="relative mt-16">
          <svg
            className="pointer-events-none absolute left-0 top-6 hidden w-full lg:block"
            height="2"
            viewBox="0 0 1200 2"
            preserveAspectRatio="none"
          >
            <motion.line
              x1="0"
              y1="1"
              x2="1200"
              y2="1"
              stroke="rgba(217,164,48,0.4)"
              strokeWidth="2"
              strokeDasharray="6 8"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          </svg>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <div key={step.n} className="relative">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full font-display text-sm font-semibold text-navy-deep"
                  style={{ backgroundColor: 'var(--color-gold)' }}
                >
                  {step.n}
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
