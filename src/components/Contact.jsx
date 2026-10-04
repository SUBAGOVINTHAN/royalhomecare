import { useState } from 'react'

const CONTACT_EMAIL = 'royalhomecare@gmail.com'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '' })

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const mailtoHref = () => {
    const subject = encodeURIComponent(
      `Service request${form.service ? ` — ${form.service}` : ''} from ${form.name || 'website'}`
    )
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nService needed: ${form.service}\n\n${form.message}`
    )
    return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
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
                href={`mailto:${CONTACT_EMAIL}`}
                className="focus-ring flex items-center gap-3 rounded text-white/85 hover:text-white"
              >
                <IconMail className="h-5 w-5" style={{ color: 'var(--color-gold-light)' }} />
                {CONTACT_EMAIL}
              </a>
              <div className="flex items-center gap-3 text-white/85">
                <IconPhone className="h-5 w-5" style={{ color: 'var(--color-gold-light)' }} />
                <span>Add your service phone number here</span>
              </div>
              <div className="flex items-center gap-3 text-white/85">
                <IconClock className="h-5 w-5" style={{ color: 'var(--color-gold-light)' }} />
                <span>Mon–Sun, 8:00 AM – 9:00 PM · 24/7 for emergencies</span>
              </div>
            </div>
          </div>

          <form
            className="grid grid-cols-1 gap-5 p-10 sm:grid-cols-2 lg:p-12"
            onSubmit={(e) => e.preventDefault()}
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

            <a
              href={mailtoHref()}
              className="focus-ring col-span-full mt-1 inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold text-navy-deep shadow-md transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: 'var(--color-gold)' }}
            >
              Send Request
            </a>
            <p className="col-span-full text-xs text-ink/45">
              This opens your email app addressed to {CONTACT_EMAIL}. Connect a backend
              later to submit this form directly.
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

function IconMail(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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
