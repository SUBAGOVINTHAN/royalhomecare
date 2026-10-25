import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import logo from '../assets/logo.jpeg'

const STATS = [
  { value: 15, suffix: '+', label: 'Years serving local homes' },
  { value: 2500, suffix: '+', label: 'Installations & repairs completed' },
  { value: 98, suffix: '%', label: 'Customers who rebook us' },
]

export default function About() {
  const { ref, visible } = useReveal()

  return (
    <section id="about" className="bg-white px-6 py-24 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <LogoShowcase visible={visible} />

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

function LogoShowcase({ visible }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm sm:max-w-md">
      {/* Soft gold glow behind the logo */}
      <div
        aria-hidden="true"
        className="absolute inset-6 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(217,164,48,0.35), transparent 70%)' }}
      />

      {/* Slowly rotating dashed ring */}
      <div
        aria-hidden="true"
        className="absolute -inset-3 animate-[spin_50s_linear_infinite] rounded-full border-2 border-dashed motion-reduce:animate-none"
        style={{ borderColor: 'rgba(217,164,48,0.55)' }}
      />

      {/* Thin navy outer ring */}
      <div
        aria-hidden="true"
        className="absolute -inset-7 rounded-full border"
        style={{ borderColor: 'rgba(11,42,91,0.12)' }}
      />

      {/* Logo */}
      <div
        className={`relative h-full w-full overflow-hidden rounded-full bg-white shadow-[0_24px_60px_rgba(11,42,91,0.22)] ring-1 ring-navy/10 transition-all duration-700 ease-out ${
          visible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        }`}
      >
        <img
          src={logo}
          alt="Royal Home Care logo"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
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