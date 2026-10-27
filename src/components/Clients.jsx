import { useEffect, useRef, useState } from 'react'
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

/*
  IMAGE SETUP
  Put the three photos in public/clients/ with these names (or change the paths):
    lt-metro.jpeg, casa-grande.jpeg, faro.jpeg
*/

const CLIENTS = [
  {
    name: 'L&T Construction',
    detail: 'Metro Container AC Work',
    description:
      'Air conditioning for site office containers on the Chennai Metro Rail project.',
    image: '/clients/lt-metro.jpeg',
    alt: 'L&T Construction site office container with Voltas split ACs, Chennai Metro Rail',
    ratio: 'aspect-[2/1]',
    featured: true,
  },
  {
    name: 'Casa Grande Supremus',
    detail: 'Club House',
    description: 'AC service and upkeep for the residents’ club house.',
    image: '/clients/casa-grande.jpeg',
    alt: 'Casa Grande Apartments entrance gate and signage',
    ratio: 'aspect-[16/9]',
  },
  {
    name: 'Faro Import & Export',
    detail: 'Commercial AMC',
    description: 'Annual maintenance for the office and warehouse premises.',
    image: '/clients/faro.jpeg',
    alt: 'Faro Import and Export Company office and warehouse building',
    ratio: 'aspect-[16/9]',
  },
]

const ease = [0.22, 1, 0.36, 1]
const HEADING = 'Trusted on site for 15+ years'

/*
  NOTE: every scroll-triggered animation below is driven by ONE visible parent
  (whileInView on the parent, variants on the children). Children that start
  hidden/clipped never trigger their own viewport observers, which is what
  caused the blank photos before.
*/

/* ---------- small animated pieces ---------- */

// Counts 0 -> `to` when scrolled into view
function CountUp({ to, reduce }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [val, setVal] = useState(reduce ? to : 0)

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, to, {
      duration: 1.6,
      ease,
      onUpdate: (v) => setVal(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to, reduce])

  return <span ref={ref}>{val}+</span>
}

const headingContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const headingWord = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 0.7, ease } },
}

// Heading: each word slides up out of a mask
function AnimatedHeading({ reduce }) {
  return (
    <motion.h2
      className="font-display text-3xl font-semibold leading-tight text-navy sm:text-4xl"
      aria-label={HEADING}
      variants={reduce ? undefined : headingContainer}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
    >
      {HEADING.split(' ').map((word, i) => (
        <span
          key={i}
          className="mr-[0.25em] inline-block overflow-hidden py-1 align-bottom"
          aria-hidden="true"
        >
          <motion.span
            className="inline-block"
            variants={reduce ? undefined : headingWord}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  )
}

// Experience badge: gold ring draws itself, number counts up
function ExperienceBadge({ reduce }) {
  return (
    <motion.div
      className="flex w-full items-center gap-4 rounded-2xl border border-navy/10 bg-white px-4 py-3 shadow-[0_8px_24px_rgba(11,42,91,0.08)] sm:w-fit sm:px-5 sm:py-4"
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      variants={{
        hidden: { opacity: 0, scale: 0.92, y: 16 },
        show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.3 } },
      }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="relative h-16 w-16 shrink-0 sm:h-[72px] sm:w-[72px]">
        <svg
          viewBox="0 0 64 64"
          className="absolute inset-0 h-full w-full -rotate-90"
          aria-hidden="true"
        >
          <circle cx="32" cy="32" r="30" fill="none" stroke="rgba(217,164,48,0.2)" strokeWidth="3" />
          <motion.circle
            cx="32"
            cy="32"
            r="30"
            fill="none"
            stroke="#D9A430"
            strokeWidth="3"
            strokeLinecap="round"
            variants={{
              hidden: { pathLength: 0 },
              show: { pathLength: 1, transition: { duration: 1.6, ease, delay: 0.5 } },
            }}
          />
        </svg>
        <span
          className="absolute inset-2 flex items-center justify-center rounded-full font-display text-lg font-bold text-white sm:text-xl"
          style={{ backgroundColor: 'var(--color-navy)' }}
        >
          <CountUp to={15} reduce={reduce} />
        </span>
      </div>
      <span className="text-sm font-medium leading-snug text-ink/70 sm:max-w-[12rem]">
        years of field experience in AC and home appliance service
      </span>
    </motion.div>
  )
}

/* ---------- client card ---------- */

const textContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.35 } },
}
const textItem = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}
const photoReveal = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  show: { clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.9, ease, delay: 0.15 } },
}
const goldEdge = {
  hidden: { scaleX: 0, scaleY: 0 },
  show: { scaleX: 1, scaleY: 1, transition: { duration: 0.8, ease, delay: 0.5 } },
}

function ClientCard({ client, index, reduce }) {
  const { name, detail, description, image, alt, ratio, featured } = client
  const cardRef = useRef(null)

  // Photo drifts slightly as you scroll past (parallax)
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease, delay: index * 0.1, delayChildren: index * 0.1 },
    },
  }

  return (
    <motion.article
      ref={cardRef}
      variants={reduce ? undefined : cardVariants}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      whileHover={
        reduce ? undefined : { y: -6, transition: { type: 'spring', stiffness: 300, damping: 22 } }
      }
      viewport={{ once: true, amount: 0.1 }}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-[0_10px_30px_rgba(11,42,91,0.08)] transition-shadow duration-300 hover:shadow-[0_24px_48px_rgba(11,42,91,0.18)] ${
        featured ? 'md:col-span-2 lg:grid lg:grid-cols-5' : ''
      }`}
    >
      {/* Photo: curtain reveal, parallax on scroll, zoom on hover */}
      <motion.div
        variants={reduce ? undefined : photoReveal}
        className={`relative w-full overflow-hidden ${ratio} ${
          featured ? 'lg:col-span-3 lg:aspect-auto lg:h-full lg:min-h-[280px]' : ''
        }`}
      >
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
          <motion.img
            src={image}
            alt={alt}
            className="h-full w-full object-cover"
            style={reduce ? undefined : { y: parallaxY, scale: 1.1 }}
          />
        </div>
      </motion.div>

      {/* Text block: gold edge grows in, items stagger up */}
      <div className={`relative ${featured ? 'lg:col-span-2 lg:flex lg:items-center' : ''}`}>
        <motion.span
          aria-hidden="true"
          variants={reduce ? undefined : goldEdge}
          className={`absolute left-0 top-0 ${
            featured
              ? 'h-1 w-full origin-left lg:h-full lg:w-1 lg:origin-top'
              : 'h-1 w-full origin-left'
          }`}
          style={{ backgroundColor: 'var(--color-gold)' }}
        />
        <motion.div
          className={`flex flex-col gap-3 p-5 pt-6 sm:p-6 sm:pt-7 ${featured ? 'lg:p-10' : ''}`}
          variants={reduce ? undefined : textContainer}
        >
          <motion.span
            variants={reduce ? undefined : textItem}
            className="w-fit rounded-full px-3 py-1 text-xs font-semibold"
            style={{ backgroundColor: 'rgba(217,164,48,0.16)', color: 'var(--color-navy)' }}
          >
            {detail}
          </motion.span>
          <motion.h3
            variants={reduce ? undefined : textItem}
            className={`font-display font-semibold text-navy ${
              featured ? 'text-xl sm:text-2xl lg:text-3xl' : 'text-lg sm:text-xl'
            }`}
          >
            {name}
          </motion.h3>
          <motion.p
            variants={reduce ? undefined : textItem}
            className="text-sm leading-relaxed text-ink/70 sm:text-base"
          >
            {description}
          </motion.p>
        </motion.div>
      </div>
    </motion.article>
  )
}

/* ---------- section ---------- */

export default function Clients() {
  const reduce = useReducedMotion()

  return (
    <section
      id="clients"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-white via-[#F2F7FF] to-white px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      {/* Soft drifting glows behind the content */}
      {!reduce && (
        <>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#CFE2FF]/60 blur-3xl"
            animate={{ x: [0, 40, 0], y: [0, 24, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#FBE7B5]/50 blur-3xl"
            animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="max-w-2xl">
            <AnimatedHeading reduce={reduce} />
            <motion.span
              aria-hidden="true"
              className="mt-3 block h-1 w-16 origin-left rounded-full"
              style={{ backgroundColor: 'var(--color-gold)' }}
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 1 }}
              transition={{ duration: 0.7, ease, delay: 0.6 }}
            />
            <motion.p
              className="mt-4 text-base leading-relaxed text-ink/70"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease, delay: 0.5 }}
            >
              From container AC contracts on a metro project to a residential club house
              and a commercial warehouse, these are a few of the places we keep running.
            </motion.p>
          </div>

          <ExperienceBadge reduce={reduce} />
        </div>

        <div className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 md:grid-cols-2">
          {CLIENTS.map((client, i) => (
            <ClientCard key={client.name} client={client} index={i} reduce={reduce} />
          ))}
        </div>
      </div>
    </section>
  )
}