import { useEffect, useState } from 'react'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'

const PHONE_DISPLAY = '+91 95001 60491'
const PHONE_HREF = 'tel:+919500160491'
const WHATSAPP_NUMBER = '919500160491' // country code + number, no "+" or spaces
const WHATSAPP_CHAT_HREF = `https://wa.me/${WHATSAPP_NUMBER}`

const APPLIANCE_GROUPS = [
  {
    label: 'Home Appliances',
    items: ['Air Conditioning', 'Refrigerator', 'Microwave Oven', 'Washing Machine', 'Deep Freezer'],
  },
  {
    label: 'Commercial AC Systems',
    items: ['3 Phase AC', 'Cassette AC', 'Ductable AC', 'VRF / VRV AC', 'Packaged AC'],
  },
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

const SERVICE_TYPES = ['Installation', 'Repair', 'Maintenance (AMC)', 'Something else']

const EMPTY_FORM = {
  name: '',
  phone: '',
  service: '',
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

  const buildWhatsAppHref = () => {
    const lines = [
      'Hi Royal Home Care, I would like to book a service.',
      '',
      `*Name:* ${form.name}`,
      `*Phone:* ${form.phone}`,
      `*Appliance / System:* ${form.service}`,
      `*Service type:* ${form.serviceType || 'Not specified'}`,
    ]
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
              Looking for reliable service for your air conditioner or home appliances? From refrigerators and washing machines to advanced commercial AC systems, our team is here to help.
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
            <Field label="Appliance / System" htmlFor="service">
              <select
                id="service"
                value={form.service}
                onChange={update('service')}
                required
                className="field"
              >
                <option value="">Select appliance or system</option>
                {APPLIANCE_GROUPS.map((group) => (
                  <optgroup key={group.label} label={group.label}>
                    {group.items.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </Field>
            <Field label="Service type" htmlFor="serviceType">
              <select
                id="serviceType"
                value={form.serviceType}
                onChange={update('serviceType')}
                className="field"
              >
                <option value="">Select service type</option>
                {SERVICE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </Field>
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