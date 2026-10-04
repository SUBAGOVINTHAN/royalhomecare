import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const STATS = [
  { value: 5, suffix: '+', label: 'Years serving local homes' },
  { value: 500, suffix: '+', label: 'Installations & repairs completed' },
  { value: 98, suffix: '%', label: 'Customers who rebook us' },
]

export default function About() {
  const { ref, visible } = useReveal()

  return (
    <section id="about" className="bg-white px-6 py-24 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
          <SealIllustration />
        </div>

        <div ref={ref}>
          <p className="text-sm font-semibold text-navy">Who we are</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-navy sm:text-4xl">
            A local team that treats your home like it's ours to look after.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/70">
            Royal Home Care started with a simple idea: home service work should be
            punctual, honest about pricing, and done properly the first time. We now
            handle AC systems and general home upkeep for families across the city,
            with technicians who explain what they're doing before they do it.
          </p>

          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-navy/10 pt-8">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-3xl font-semibold text-navy">
                  <Counter target={stat.value} suffix={stat.suffix} start={visible} />
                </dt>
                <dd className="mt-2 text-xs leading-snug text-ink/55">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

function Counter({ target, suffix, start }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setValue(target)
      return
    }

    const duration = 1200
    const startTime = performance.now()

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [start, target])

  return (
    <span>
      {value}
      {suffix}
    </span>
  )
}

function SealIllustration() {
  return (
    <svg viewBox="0 0 320 360" className="h-full w-full">
      <defs>
        <linearGradient id="sealGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0e3468" />
          <stop offset="100%" stopColor="#071b3f" />
        </linearGradient>
      </defs>
      <path
        d="M160 12 L280 48 V172 C280 252 230 310 160 344 C90 310 40 252 40 172 V48 Z"
        fill="url(#sealGrad)"
        stroke="var(--color-gold)"
        strokeWidth="2"
      />
      <path
        d="M160 26 L266 58 V172 C266 245 222 296 160 328 C98 296 54 245 54 172 V58 Z"
        fill="none"
        stroke="rgba(217,164,48,0.4)"
        strokeWidth="1"
      />
      {/* crown */}
      <path
        d="M120 130 L133 104 L150 124 L160 96 L170 124 L187 104 L200 130 L192 142 L128 142 Z"
        fill="var(--color-gold)"
      />
      {/* house */}
      <path d="M110 210 L160 172 L210 210 V266 H110 Z" fill="none" stroke="white" strokeWidth="2.5" />
      <rect x="148" y="228" width="24" height="38" fill="none" stroke="white" strokeWidth="2" />
      <path
        d="M92 288c22-14 46-14 68 0s46 14 68 0"
        stroke="var(--color-ice)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}
