import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'

const PHONE_DISPLAY = '+91 95001 60491'
const PHONE_HREF = 'tel:+919500160491'
const WHATSAPP_NUMBER = '919500160491' // country code + number, no "+" or spaces
const WHATSAPP_CHAT_HREF = `https://wa.me/${WHATSAPP_NUMBER}`

const APPLIANCE_GROUPS = [
  {
    label: 'Home Appliances',
    items: ['Air Conditioning', 'Refrigerator', 'Microwave Oven', 'Washing Machine', 'Deep Freezer', 'Water Heater'],
  },
  {
    label: 'Commercial AC Systems',
    items: ['3 Phase AC', 'Cassette AC', 'Ductable AC', 'VRF / VRV AC', 'Packaged AC'],
  },
]

// Small icon tile shown beside each option (swap for your own SVGs any time)
const APPLIANCE_ICONS = {
  'Air Conditioning': '❄️',
  Refrigerator: '🧊',
  'Microwave Oven': '♨️',
  'Washing Machine': '🧺',
  'Deep Freezer': '🥶',
  'Water Heater': '🚿',
  '3 Phase AC': '⚡',
  'Cassette AC': '🏢',
  'Ductable AC': '🌬️',
  'VRF / VRV AC': '🏬',
  'Packaged AC': '📦',
}

// Common problems shown as chips once one of these appliances is selected
const APPLIANCE_ISSUES = {
  Refrigerator: [
    'Not cooling',
    'Gas leakage',
    'Over size freezing',
    'Cooling coil damage',
    'Compressor not running',
  ],
  'Microwave Oven': ['Not heating', 'Board fault', 'Burning smell', 'Touch not working'],
  'Washing Machine': [
    'Water inlet problem',
    'Spin not working',
    'Board fault',
    'Machine not working',
    'Drain blockage',
    'Drum problem',
  ],
  'Deep Freezer': ['Gas leakage', 'Not cooling'],
  'Water Heater': ['Heater not working', 'Heater change', 'Tank leakage', 'Faulty wiring'],
}

// Service type pills are shown only when this appliance is selected
const SERVICE_TYPE_APPLIANCE = 'Air Conditioning'

const SERVICE_TYPES = [
  { value: 'Installation', icon: '🛠️' },
  { value: 'Repair', icon: '🔧' },
  { value: 'Maintenance (AMC)', icon: '📅' },
  { value: 'Something else', icon: '💬' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const viewport = { once: true, amount: 0.2 }

const EMPTY_FORM = {
  name: '',
  phone: '',
  service: '',
  issue: '',
  serviceType: '',
  message: '',
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [sent, setSent] = useState(false)

  // Hide the confirmation note after a few seconds
  useEffect(() => {
    if (!sent) return
    const t = window.setTimeout(() => setSent(false), 6000)
    return () => window.clearTimeout(t)
  }, [sent])

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const issues = APPLIANCE_ISSUES[form.service]

  // Service type (Installation / Repair / AMC...) is only asked for Air Conditioning
  const showServiceType = form.service === SERVICE_TYPE_APPLIANCE

  // Changing the appliance clears the previously chosen problem,
  // and the service type too when it is no longer relevant
  const handleServiceChange = (value) =>
    setForm((f) => ({
      ...f,
      service: value,
      issue: '',
      serviceType: value === SERVICE_TYPE_APPLIANCE ? f.serviceType : '',
    }))

  const buildWhatsAppHref = () => {
    const lines = [
      'Hi Royal Home Care, I would like to book a service.',
      '',
      `*Name:* ${form.name}`,
      `*Phone:* ${form.phone}`,
      `*Appliance / System:* ${form.service}`,
    ]
    if (form.issue) lines.push(`*Problem:* ${form.issue}`)
    if (showServiceType) lines.push(`*Service type:* ${form.serviceType || 'Not specified'}`)
    if (form.message.trim()) {
      lines.push('', `*Details:* ${form.message.trim()}`)
    }
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    window.open(buildWhatsAppHref(), '_blank', 'noopener,noreferrer')
    // Clear the form once WhatsApp has been opened with the message
    setForm(EMPTY_FORM)
    setSent(true)
  }

  return (
    <section id="contact" className="bg-cream px-6 py-24 lg:px-10">
      <MotionConfig reducedMotion="user">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-xl shadow-navy/5 lg:grid-cols-[0.9fr_1.1fr]"
          >
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className="relative isolate flex flex-col justify-center overflow-hidden p-10 text-white lg:p-12"
              style={{ backgroundColor: 'var(--color-navy-deep)' }}
            >
              {/* Soft breathing gold glow */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full blur-3xl"
                style={{ background: 'radial-gradient(circle, rgba(217,164,48,0.35), transparent 70%)' }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-28 -left-20 -z-10 h-72 w-72 rounded-full blur-3xl"
                style={{ background: 'radial-gradient(circle, rgba(80,130,220,0.30), transparent 70%)' }}
                animate={{ scale: [1.15, 1, 1.15], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              />

              <motion.p
                variants={item}
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: 'var(--color-gold-light)' }}
              >
                Get in touch
              </motion.p>
              <motion.h2
                variants={item}
                className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl"
              >
                Expert Care for Your Home & Commercial Appliances.
              </motion.h2>
              <motion.p
                variants={item}
                className="mt-4 max-w-md text-base leading-relaxed text-white/90"
              >
                Looking for reliable service for your air conditioner or home appliances? From refrigerators, washing machines and water heaters to advanced commercial AC systems, our team is here to help.
              </motion.p>

              <div className="mt-10 space-y-6">
                <motion.a
                  variants={item}
                  whileHover={{ x: 6 }}
                  href={PHONE_HREF}
                  className="focus-ring group flex items-center gap-4 rounded text-white"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-white/20">
                    <motion.span
                      className="flex"
                      animate={{ rotate: [0, -14, 14, -10, 10, 0] }}
                      transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 3.5, ease: 'easeInOut' }}
                    >
                      <IconPhone className="h-5 w-5" style={{ color: 'var(--color-gold-light)' }} />
                    </motion.span>
                  </span>
                  <span className="leading-tight">
                    <span className="block text-xs text-white/70">Call us</span>
                    <span className="mt-0.5 block text-base font-semibold">{PHONE_DISPLAY}</span>
                  </span>
                </motion.a>

                <motion.a
                  variants={item}
                  whileHover={{ x: 6 }}
                  href={WHATSAPP_CHAT_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring group flex items-center gap-4 rounded text-white"
                >
                  <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-white/20">
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full"
                      animate={{
                        boxShadow: [
                          '0 0 0 0 rgba(37,211,102,0.5)',
                          '0 0 0 10px rgba(37,211,102,0)',
                        ],
                      }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                    />
                    <WhatsAppIcon className="relative h-5 w-5" style={{ color: '#25D366' }} />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-xs text-white/70">WhatsApp</span>
                    <span className="mt-0.5 block text-base font-semibold">Chat with us</span>
                  </span>
                </motion.a>

                <motion.div variants={item} className="flex items-center gap-4 text-white">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <motion.span
                      className="flex"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                    >
                      <IconClock className="h-5 w-5" style={{ color: 'var(--color-gold-light)' }} />
                    </motion.span>
                  </span>
                  <span className="leading-tight">
                    <span className="block text-xs text-white/70">Working hours</span>
                    <span className="mt-0.5 block text-base font-semibold">Mon–Sun, 8:00 AM – 9:00 PM</span>
                    <span className="mt-1 block text-sm text-white/90">24/7 for emergencies</span>
                  </span>
                </motion.div>
              </div>
            </motion.div>

            <motion.form
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className="grid grid-cols-1 gap-5 p-10 sm:grid-cols-2 lg:p-12"
              onSubmit={handleSubmit}
            >
              <Field label="Full name" htmlFor="name">
                <input
                  id="name"
                  value={form.name}
                  onChange={update('name')}
                  type="text"
                  required
                  className="field"
                  placeholder=""
                />
              </Field>
              <Field label="Phone number" htmlFor="phone">
                <input
                  id="phone"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))
                  }
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  maxLength={10}
                  required
                  pattern="[0-9]{10}"
                  title="Enter exactly 10 digits"
                  className="field"
                  placeholder=""
                />
              </Field>

              {/* Custom appliance dropdown */}
              <Dropdown
                id="service"
                label="Appliance / System"
                placeholder="Select appliance or system"
                value={form.service}
                onChange={handleServiceChange}
                groups={APPLIANCE_GROUPS}
                icons={APPLIANCE_ICONS}
                required
                full
              />

              {/* Problem chips, only for appliances that have a problem list */}
              <AnimatePresence initial={false}>
                {issues && (
                  <motion.div
                    key={form.service}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden sm:col-span-2"
                  >
                    <div
                      className="rounded-2xl border border-dashed p-4"
                      style={{ borderColor: 'rgba(217,164,48,0.6)', backgroundColor: 'rgba(217,164,48,0.07)' }}
                    >
                      <p id="issue-label" className="text-sm font-semibold text-navy-deep">
                        What&apos;s the problem with your {form.service.toLowerCase()}?
                        <span className="ml-1.5 text-xs font-medium text-navy-deep/50">Optional</span>
                      </p>
                      <div
                        role="radiogroup"
                        aria-labelledby="issue-label"
                        className="mt-3 flex flex-wrap gap-2"
                      >
                        {issues.map((issue, i) => {
                          const selected = form.issue === issue
                          return (
                            <motion.button
                              key={issue}
                              type="button"
                              role="radio"
                              aria-checked={selected}
                              initial={{ opacity: 0, scale: 0.85 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.05 * i, duration: 0.25 }}
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setForm((f) => ({ ...f, issue: selected ? '' : issue }))}
                              className="focus-ring inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors"
                              style={
                                selected
                                  ? {
                                      backgroundColor: 'var(--color-navy-deep)',
                                      borderColor: 'var(--color-navy-deep)',
                                      color: '#ffffff',
                                    }
                                  : {
                                      backgroundColor: '#ffffff',
                                      borderColor: 'rgba(11,42,91,0.18)',
                                      color: 'var(--color-navy-deep)',
                                    }
                              }
                            >
                              <AnimatePresence initial={false}>
                                {selected && (
                                  <motion.span
                                    key="tick"
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: 14, opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    className="flex overflow-hidden"
                                    style={{ color: 'var(--color-gold-light)' }}
                                  >
                                    <IconCheck className="h-3.5 w-3.5 shrink-0" />
                                  </motion.span>
                                )}
                              </AnimatePresence>
                              {issue}
                            </motion.button>
                          )
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Service type pills: only for Air Conditioning */}
              <AnimatePresence initial={false}>
              {showServiceType && (
              <motion.div
                key="service-type"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden sm:col-span-2"
              >
                <div className="pt-1">
                <p id="service-type-label" className="mb-1.5 text-sm font-semibold text-navy-deep">
                  Service type
                  <span className="ml-1.5 text-xs font-medium text-navy-deep/50">Optional</span>
                </p>
                <div
                  role="radiogroup"
                  aria-labelledby="service-type-label"
                  className="grid grid-cols-2 gap-2.5 sm:grid-cols-4"
                >
                  {SERVICE_TYPES.map(({ value, icon }) => {
                    const selected = form.serviceType === value
                    return (
                      <motion.button
                        key={value}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() =>
                          setForm((f) => ({ ...f, serviceType: selected ? '' : value }))
                        }
                        className="focus-ring relative flex flex-col items-center gap-1.5 overflow-hidden rounded-2xl border px-2 py-3.5 text-center text-xs font-semibold transition-colors sm:text-[13px]"
                        style={
                          selected
                            ? {
                                backgroundColor: 'rgba(217,164,48,0.14)',
                                borderColor: 'var(--color-gold)',
                                color: 'var(--color-navy-deep)',
                              }
                            : {
                                backgroundColor: '#ffffff',
                                borderColor: 'rgba(11,42,91,0.15)',
                                color: 'var(--color-navy-deep)',
                              }
                        }
                      >
                        <span aria-hidden="true" className="text-xl leading-none">
                          {icon}
                        </span>
                        {value}
                        <AnimatePresence>
                          {selected && (
                            <motion.span
                              key="bar"
                              aria-hidden="true"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              exit={{ scaleX: 0 }}
                              transition={{ duration: 0.25 }}
                              className="absolute inset-x-0 bottom-0 h-1 origin-left"
                              style={{ backgroundColor: 'var(--color-gold)' }}
                            />
                          )}
                        </AnimatePresence>
                      </motion.button>
                    )
                  })}
                </div>
                </div>
              </motion.div>
              )}
              </AnimatePresence>

              <Field label="Details" htmlFor="message" full>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={update('message')}
                  rows={4}
                  className="field resize-none"
                  placeholder=""
                />
              </Field>

              <motion.button
                variants={item}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="focus-ring relative col-span-full mt-1 inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold text-navy-deep shadow-md"
                style={{ backgroundColor: 'var(--color-gold)' }}
              >
                {/* Shine sweep */}
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 -skew-x-12 bg-white/45"
                  animate={{ x: ['0%', '600%'] }}
                  transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 2.6, ease: 'easeInOut' }}
                />
                <span className="relative inline-flex items-center gap-2">
                  <motion.span
                    className="flex"
                    animate={{ rotate: [0, -12, 12, -8, 8, 0] }}
                    transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                  </motion.span>
                  Send on WhatsApp
                </span>
              </motion.button>

              <AnimatePresence>
                {sent && (
                  <motion.p
                    key="sent-note"
                    role="status"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="col-span-full rounded-xl bg-green-50 px-4 py-3 text-center text-sm font-medium text-green-800"
                  >
                    WhatsApp opened with your details. Tap send there to confirm your request.
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.form>
          </motion.div>
        </div>
      </MotionConfig>
    </section>
  )
}

function Field({ label, htmlFor, full, children }) {
  return (
    <motion.div variants={item} className={full ? 'sm:col-span-2' : ''}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-navy-deep">
        {label}
      </label>
      {children}
    </motion.div>
  )
}

/**
 * Custom dropdown: animated panel, grouped options with icon tiles, gold check on the
 * selected row, keyboard support (arrows, Enter/Space, Esc) and click-outside to close.
 * A hidden input keeps the browser's native "required" validation working.
 */
function Dropdown({ id, label, placeholder, value, onChange, groups, icons = {}, required, full }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const wrapRef = useRef(null)
  const listRef = useRef(null)

  const flat = groups.flatMap((g) => g.items)

  // Close when clicking or tapping outside
  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('touchstart', onDown)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('touchstart', onDown)
    }
  }, [open])

  // Keep the highlighted option visible while using the keyboard
  useEffect(() => {
    if (!open || active < 0 || !listRef.current) return
    const el = listRef.current.querySelector(`[data-idx="${active}"]`)
    if (el) el.scrollIntoView({ block: 'nearest' })
  }, [active, open])

  const openList = () => {
    setActive(Math.max(flat.indexOf(value), 0))
    setOpen(true)
  }

  const choose = (v) => {
    onChange(v)
    setOpen(false)
  }

  const onKeyDown = (e) => {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault()
        openList()
      }
      return
    }
    if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, flat.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (active >= 0) choose(flat[active])
    } else if (e.key === 'Tab') {
      setOpen(false)
    }
  }

  let idx = -1

  return (
    <motion.div
      variants={item}
      ref={wrapRef}
      className={`relative ${full ? 'sm:col-span-2' : ''} ${open ? 'z-30' : 'z-0'}`}
    >
      <label id={`${id}-label`} htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy-deep">
        {label}
      </label>

      <div className="relative">
        <button
          id={id}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={`${id}-list`}
          aria-labelledby={`${id}-label`}
          onClick={() => (open ? setOpen(false) : openList())}
          onKeyDown={onKeyDown}
          className="field focus-ring flex w-full items-center gap-3 text-left"
          style={open ? { borderColor: 'var(--color-gold)', boxShadow: '0 0 0 3px rgba(217,164,48,0.25)' } : undefined}
        >
          {value ? (
            <>
              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-base"
                style={{ backgroundColor: 'rgba(217,164,48,0.15)' }}
              >
                {icons[value]}
              </span>
              <span className="flex-1 truncate font-medium text-navy-deep">{value}</span>
            </>
          ) : (
            <span className="flex-1 truncate text-navy-deep/50">{placeholder}</span>
          )}
          <motion.span
            aria-hidden="true"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="flex shrink-0"
            style={{ color: 'var(--color-navy-deep)' }}
          >
            <IconChevron className="h-4 w-4" />
          </motion.span>
        </button>

        {/* Mirrors the value so the browser can show its native "required" message */}
        <input
          tabIndex={-1}
          aria-hidden="true"
          required={required}
          value={value}
          onChange={() => {}}
          className="pointer-events-none absolute bottom-0 left-1/2 h-px w-px opacity-0"
        />

        <AnimatePresence>
          {open && (
            <motion.ul
              ref={listRef}
              id={`${id}-list`}
              role="listbox"
              aria-labelledby={`${id}-label`}
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{ transformOrigin: 'top' }}
              className="absolute left-0 right-0 top-full z-30 mt-2 max-h-64 overflow-y-auto overscroll-contain rounded-2xl border border-navy/10 bg-white p-2 shadow-2xl shadow-navy/15"
            >
              {groups.map((group) => (
                <li key={group.label} role="presentation" className="[&:not(:first-child)]:mt-1">
                  <p
                    className="flex items-center gap-2 px-3 pb-1 pt-2 text-[11px] font-bold uppercase tracking-[0.14em]"
                    style={{ color: 'var(--color-gold)' }}
                  >
                    <span aria-hidden="true" className="h-px w-4" style={{ backgroundColor: 'var(--color-gold)' }} />
                    {group.label}
                  </p>
                  <ul role="presentation">
                    {group.items.map((opt) => {
                      idx += 1
                      const i = idx
                      const selected = value === opt
                      const highlighted = active === i
                      return (
                        <li
                          key={opt}
                          role="option"
                          aria-selected={selected}
                          data-idx={i}
                          onMouseEnter={() => setActive(i)}
                          onClick={() => choose(opt)}
                          className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors"
                          style={{
                            backgroundColor: highlighted
                              ? 'rgba(217,164,48,0.14)'
                              : selected
                                ? 'rgba(11,42,91,0.05)'
                                : 'transparent',
                            color: 'var(--color-navy-deep)',
                          }}
                        >
                          <span
                            aria-hidden="true"
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cream text-base"
                          >
                            {icons[opt]}
                          </span>
                          <span className={`flex-1 ${selected ? 'font-semibold' : 'font-medium'}`}>{opt}</span>
                          {selected && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="flex h-5 w-5 items-center justify-center rounded-full"
                              style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-navy-deep)' }}
                            >
                              <IconCheck className="h-3 w-3" />
                            </motion.span>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

function IconPhone(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M6.5 4h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconClock(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function IconChevron(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconCheck(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}