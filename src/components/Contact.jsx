import { useState } from 'react'

const PHONE_DISPLAY = '+91 +91 9626081301'
const PHONE_HREF = 'tel:+919626081301'
const WHATSAPP_NUMBER = '919626081301' // country code + number, no "+" or spaces
const WHATSAPP_CHAT_HREF = `https://wa.me/${WHATSAPP_NUMBER}`

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '' })

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const buildWhatsAppHref = () => {
    const lines = [
      'Hi Royal Home Care, I would like to book a service.',
      '',
      `*Name:* ${form.name}`,
      `*Phone:* ${form.phone}`,
      `*Service needed:* ${form.service || 'Not specified'}`,
    ]
    if (form.message.trim()) {
      lines.push('', `*Details:* ${form.message.trim()}`)
    }
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    window.open(buildWhatsAppHref(), '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="contact" className="bg-cream px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-xl shadow-navy/5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="p-10 text-white lg:p-12" style={{ backgroundColor: 'var(--color-navy-deep)' }}>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-gold-light)' }}>
              Get in touch
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
              Let's sort your home comfort.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              Tell us what's going on and we'll get back with a time for a free
              inspection — usually within a few hours.
            </p>

            <div className="mt-10 space-y-5 text-sm">
              <a
                href={PHONE_HREF}
                className="focus-ring flex items-center gap-3 rounded text-white/85 hover:text-white"
              >
                <IconPhone className="h-5 w-5" style={{ color: 'var(--color-gold-light)' }} />
                {PHONE_DISPLAY}
              </a>
              <a
                href={WHATSAPP_CHAT_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring flex items-center gap-3 rounded text-white/85 hover:text-white"
              >
                <WhatsAppIcon className="h-5 w-5" style={{ color: '#25D366' }} />
                Chat on WhatsApp
              </a>
              <div className="flex items-center gap-3 text-white/85">
                <IconClock className="h-5 w-5" style={{ color: 'var(--color-gold-light)' }} />
                <span>Mon–Sun, 8:00 AM – 9:00 PM · 24/7 for emergencies</span>
              </div>
            </div>
          </div>

          <form
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
                placeholder="Your name"
              />
            </Field>
            <Field label="Phone number" htmlFor="phone">
              <input
                id="phone"
                value={form.phone}
                onChange={update('phone')}
                type="tel"
                required
                pattern="[0-9+\s\-]{10,15}"
                title="Enter a valid phone number (10 digits)"
                className="field"
                placeholder="10-digit mobile number"
              />
            </Field>
            <Field label="Service needed" htmlFor="service" full>
              <select id="service" value={form.service} onChange={update('service')} className="field">
                <option value="">Select a service</option>
                <option>AC Installation</option>
                <option>AC Repair</option>
                <option>AC Maintenance (AMC)</option>
                <option>Plumbing</option>
                <option>Electrical Work</option>
                <option>Home Deep Cleaning</option>
                <option>Something else</option>
              </select>
            </Field>
            <Field label="Details" htmlFor="message" full>
              <textarea
                id="message"
                value={form.message}
                onChange={update('message')}
                rows={4}
                className="field resize-none"
                placeholder="Tell us what's happening and your area/locality"
              />
            </Field>

            <button
              type="submit"
              className="focus-ring col-span-full mt-1 inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-navy-deep shadow-md transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: 'var(--color-gold)' }}
            >
              <WhatsAppIcon className="h-5 w-5" />
              Send on WhatsApp
            </button>
            <p className="col-span-full text-xs text-ink/45">
              This opens WhatsApp with your details already filled in. Just tap send to
              reach us on {PHONE_DISPLAY}.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

function Field({ label, htmlFor, full, children }) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-semibold text-ink/60">
        {label}
      </label>
      {children}
    </div>
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