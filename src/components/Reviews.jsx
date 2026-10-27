import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { addDoc, collection, limit, onSnapshot, query, serverTimestamp, where } from 'firebase/firestore'
import { db } from '../firebase'

const SERVICES = [
  'Air Conditioning',
  'Refrigerator',
  'Microwave Oven',
  'Washing Machine',
  'Deep Freezer',
  'Water Heater',
  'Commercial AC',
]

const EMPTY_FORM = { name: '', email: '', rating: 0, service: '', comment: '', website: '' }

const COOLDOWN_KEY = 'rhc_review_sent_at'
const COOLDOWN_MS = 10 * 60 * 1000 // one review per 10 minutes per browser
const PAGE_SIZE = 6

const ease = [0.22, 1, 0.36, 1]

// false = show a partly hidden email on the card (ra***@gmail.com)
// true  = show the full email address to every visitor
const SHOW_FULL_EMAIL = false

function maskEmail(email) {
  const [local = '', domain = ''] = email.split('@')
  const keep = local.length > 2 ? 2 : 1
  return `${local.slice(0, keep)}***@${domain}`
}

export default function Reviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [visible, setVisible] = useState(PAGE_SIZE)

  // Live listener: new approved reviews appear without refreshing the page
  useEffect(() => {
    if (!db) {
      setLoading(false)
      return undefined
    }
    const q = query(collection(db, 'reviews'), where('approved', '==', true), limit(60))
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        const list = snap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
        setReviews(list)
        setLoadError(false)
        setLoading(false)
      },
      () => {
        setLoadError(true)
        setLoading(false)
      },
    )
    return unsubscribe
  }, [])

  const { average, count } = useMemo(() => {
    if (!reviews.length) return { average: 0, count: 0 }
    const total = reviews.reduce((sum, r) => sum + (r.rating || 0), 0)
    return { average: total / reviews.length, count: reviews.length }
  }, [reviews])

  // Not set up yet: show a hint while developing, nothing to customers
  if (!db) {
    if (import.meta.env.DEV) {
      return (
        <section id="reviews" className="bg-white px-6 py-16 lg:px-10">
          <p className="mx-auto max-w-2xl rounded-2xl border border-dashed border-amber-400 bg-amber-50 p-5 text-center text-sm text-amber-900">
            Reviews section is hidden for visitors until Firebase is configured. Add your{' '}
            <code>VITE_FIREBASE_*</code> values to <code>.env</code> and restart the dev server.
          </p>
        </section>
      )
    }
    return null
  }

  return (
    <section
      id="reviews"
      className="relative scroll-mt-24 overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-10"
      style={{ backgroundColor: 'var(--color-navy-deep)' }}
    >
      <div className="royal-texture pointer-events-none absolute inset-0" />

      <MotionConfig reducedMotion="user">
        <div className="relative mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease }}
          >
            <p className="text-sm font-semibold" style={{ color: 'var(--color-gold-light)' }}>
              Customer reviews
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
              What our customers say
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/75">
              Used our service? Share your experience. New reviews appear here after we approve them.
            </p>

            {count > 0 && (
              <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 backdrop-blur-sm">
                <span className="font-display text-2xl font-bold text-white">{average.toFixed(1)}</span>
                <Stars value={Math.round(average)} size={18} tone="dark" />
                <span className="text-sm font-medium text-white/75">
                  {count} {count === 1 ? 'review' : 'reviews'}
                </span>
              </div>
            )}
          </motion.div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-start lg:gap-10">
            {/* Review list */}
            <div>
              {loading && <ReviewSkeletons />}

              {!loading && loadError && (
                <p className="rounded-2xl border border-white/15 bg-white/[0.06] p-6 text-center text-sm text-white/75">
                  Reviews could not be loaded right now. Please try again later.
                </p>
              )}

              {!loading && !loadError && reviews.length === 0 && (
                <div className="rounded-2xl border border-dashed border-white/25 bg-white/[0.04] p-8 text-center">
                  <p className="font-display text-lg font-semibold text-white">No reviews yet</p>
                  <p className="mt-1.5 text-sm text-white/70">Be the first to share your experience with us.</p>
                </div>
              )}

              {!loading && !loadError && reviews.length > 0 && (
                <>
                  <ul className="grid gap-4 sm:grid-cols-2">
                    {reviews.slice(0, visible).map((r, i) => (
                      <ReviewCard key={r.id} review={r} index={i % PAGE_SIZE} />
                    ))}
                  </ul>

                  {reviews.length > PAGE_SIZE && (
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                      {visible < reviews.length && (
                        <button
                          type="button"
                          onClick={() => setVisible((v) => v + PAGE_SIZE)}
                          className="focus-ring rounded-full border border-white/25 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
                        >
                          Show more reviews
                        </button>
                      )}
                      {visible > PAGE_SIZE && (
                        <button
                          type="button"
                          onClick={() => setVisible(PAGE_SIZE)}
                          className="focus-ring rounded-full px-5 py-2.5 text-sm font-semibold text-white/70 transition-colors hover:text-white"
                        >
                          Show less
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Form */}
            <motion.div
              className="lg:sticky lg:top-28"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, ease, delay: 0.1 }}
            >
              <ReviewForm />
            </motion.div>
          </div>
        </div>
      </MotionConfig>
    </section>
  )
}

function ReviewCard({ review, index }) {
  const { name = 'Customer', rating = 5, comment = '', service = '', email = '', createdAt } = review
  const date = createdAt?.toDate
    ? createdAt.toDate().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
    : ''

  // Each card animates on its own, so no card can get stuck hidden
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, ease, delay: (index % 2) * 0.08 }}
      className="relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm transition-colors duration-300 hover:bg-white/[0.1]"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1"
        style={{ backgroundColor: 'var(--color-gold)' }}
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="absolute right-5 top-5 h-8 w-8"
        fill="var(--color-gold)"
        opacity="0.25"
      >
        <path d="M4 17.5c0-4.4 2.2-7.6 6.2-9.5l.8 1.3C9 10.5 8.2 12 8.1 13.5H11V19H4v-1.5Zm9 0c0-4.4 2.2-7.6 6.2-9.5l.8 1.3c-2 1.2-2.8 2.7-2.9 4.2H20V19h-7v-1.5Z" />
      </svg>

      <Stars value={rating} size={16} tone="dark" />
      <p className="mt-4 flex-1 whitespace-pre-line break-words text-sm leading-relaxed text-white/85 sm:text-base">
        {comment}
      </p>
      <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold text-navy-deep"
          style={{ backgroundColor: 'var(--color-gold)' }}
        >
          {name.trim().charAt(0).toUpperCase() || 'C'}
        </span>
        <span className="min-w-0 leading-tight">
          <span className="block truncate text-sm font-semibold text-white">{name}</span>
          <span className="mt-0.5 block truncate text-xs text-white/60">
            {[service, date].filter(Boolean).join(' · ')}
          </span>
          {email && (
            <span className="mt-1 flex items-center gap-1.5 truncate text-xs text-white/60">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-3.5 w-3.5 shrink-0"
                style={{ color: 'var(--color-gold-light)' }}
              >
                <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
                <path d="m4 7.5 8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="truncate">{email}</span>
            </span>
          )}
        </span>
      </div>
    </motion.li>
  )
}

function ReviewForm() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [hover, setHover] = useState(0)
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const [message, setMessage] = useState('')

  // Hide the thank-you note after a while
  useEffect(() => {
    if (status !== 'done') return undefined
    const t = window.setTimeout(() => setStatus('idle'), 9000)
    return () => window.clearTimeout(t)
  }, [status])

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return

    // Honeypot: real people never fill this hidden field, bots usually do
    if (form.website) {
      setForm(EMPTY_FORM)
      setStatus('done')
      return
    }

    if (!form.rating) {
      setStatus('error')
      setMessage('Please choose a star rating.')
      return
    }

    // Simple spam guard: one review per browser every few minutes
    try {
      const last = Number(window.localStorage.getItem(COOLDOWN_KEY) || 0)
      if (Date.now() - last < COOLDOWN_MS) {
        setStatus('error')
        setMessage('You just sent a review. Please try again in a few minutes.')
        return
      }
    } catch {
      // storage unavailable, skip the guard
    }

    setStatus('sending')
    try {
      const ref = await addDoc(collection(db, 'reviews'), {
        name: form.name.trim().slice(0, 60),
        email: SHOW_FULL_EMAIL
          ? form.email.trim().toLowerCase().slice(0, 100)
          : maskEmail(form.email.trim().toLowerCase().slice(0, 100)),
        rating: form.rating,
        comment: form.comment.trim().slice(0, 500),
        service: form.service,
        approved: false, // you approve it in the Firebase console before it shows up
        createdAt: serverTimestamp(),
      })

      // The full email is always kept in a separate private collection.
      // If your Firestore rules don't allow this yet, the review still goes through.
      try {
        await addDoc(collection(db, 'reviewContacts'), {
          reviewId: ref.id,
          email: form.email.trim().toLowerCase().slice(0, 100),
          createdAt: serverTimestamp(),
        })
      } catch (err) {
        console.warn('Reviewer email was not saved (check Firestore rules):', err)
      }

      try {
        window.localStorage.setItem(COOLDOWN_KEY, String(Date.now()))
      } catch {
        // ignore
      }
      setForm(EMPTY_FORM)
      setStatus('done')
    } catch {
      setStatus('error')
      setMessage('Could not send your review. Please try again.')
    }
  }

  const shown = hover || form.rating

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-3xl border border-white/10 bg-white p-6 shadow-2xl shadow-black/30 sm:p-8"
    >
      <h3 className="font-display text-xl font-semibold text-navy">Write a review</h3>
      <p className="mt-1 text-sm text-ink/70">It takes less than a minute.</p>

      {/* Star picker */}
      <div className="mt-5">
        <p id="rating-label" className="mb-1.5 text-sm font-semibold text-navy-deep">
          Your rating
        </p>
        <div
          role="radiogroup"
          aria-labelledby="rating-label"
          className="flex items-center gap-1"
          onMouseLeave={() => setHover(0)}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <motion.button
              key={n}
              type="button"
              role="radio"
              aria-checked={form.rating === n}
              aria-label={`${n} star${n > 1 ? 's' : ''}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => setHover(n)}
              onClick={() => setForm((f) => ({ ...f, rating: n }))}
              className="focus-ring rounded p-0.5"
            >
              <StarIcon filled={n <= shown} size={32} />
            </motion.button>
          ))}
          <span className="ml-2 text-sm font-medium text-ink/60" aria-live="polite">
            {shown ? ['Poor', 'Fair', 'Good', 'Very good', 'Excellent'][shown - 1] : ''}
          </span>
        </div>
      </div>

      <div className="mt-5 grid gap-4">
        <div>
          <label htmlFor="review-name" className="mb-1.5 block text-sm font-semibold text-navy-deep">
            Your name
          </label>
          <input
            id="review-name"
            value={form.name}
            onChange={set('name')}
            type="text"
            required
            maxLength={60}
            autoComplete="name"
            className="field"
          />
        </div>

        <div>
          <label htmlFor="review-email" className="mb-1.5 block text-sm font-semibold text-navy-deep">
            Email address
          </label>
          <input
            id="review-email"
            value={form.email}
            onChange={set('email')}
            type="email"
            required
            maxLength={100}
            autoComplete="email"
            inputMode="email"
            className="field"
          />
          <p className="mt-1 text-xs text-ink/55">{SHOW_FULL_EMAIL
              ? 'Your email will be shown on your review.'
              : 'Shown on your review in a partly hidden form (for example ra***@gmail.com).'}</p>
        </div>

        <div>
          <label htmlFor="review-service" className="mb-1.5 block text-sm font-semibold text-navy-deep">
            Service you used <span className="text-xs font-medium text-navy-deep/50">Optional</span>
          </label>
          <select id="review-service" value={form.service} onChange={set('service')} className="field">
            <option value="">Select service</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="review-comment" className="mb-1.5 block text-sm font-semibold text-navy-deep">
            Your review
          </label>
          <textarea
            id="review-comment"
            value={form.comment}
            onChange={set('comment')}
            required
            minLength={5}
            maxLength={500}
            rows={4}
            className="field resize-none"
          />
          <p className="mt-1 text-right text-xs text-ink/50">{form.comment.length}/500</p>
        </div>

        {/* Honeypot field, hidden from people */}
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={set('website')}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
        />
      </div>

      <motion.button
        type="submit"
        disabled={status === 'sending'}
        whileHover={status === 'sending' ? undefined : { y: -3 }}
        whileTap={status === 'sending' ? undefined : { scale: 0.97 }}
        className="focus-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-navy-deep shadow-md disabled:opacity-70"
        style={{ backgroundColor: 'var(--color-gold)' }}
      >
        {status === 'sending' ? 'Sending…' : 'Submit review'}
      </motion.button>

      <AnimatePresence>
        {status === 'done' && (
          <motion.p
            key="done"
            role="status"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-center text-sm font-medium text-green-800"
          >
            Thank you! Your review was sent and will appear here once approved.
          </motion.p>
        )}
        {status === 'error' && (
          <motion.p
            key="error"
            role="alert"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-800"
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  )
}

function ReviewSkeletons() {
  return (
    <div className="grid gap-4 sm:grid-cols-2" aria-hidden="true">
      {[0, 1].map((i) => (
        <div key={i} className="animate-pulse rounded-2xl border border-white/10 bg-white/[0.06] p-6">
          <div className="h-4 w-24 rounded bg-white/15" />
          <div className="mt-4 h-3 w-full rounded bg-white/15" />
          <div className="mt-2 h-3 w-5/6 rounded bg-white/15" />
          <div className="mt-2 h-3 w-2/3 rounded bg-white/15" />
          <div className="mt-5 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/15" />
            <div className="h-3 w-28 rounded bg-white/15" />
          </div>
        </div>
      ))}
    </div>
  )
}

function Stars({ value, size = 16, tone = 'light' }) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon key={n} filled={n <= value} size={size} tone={tone} />
      ))}
    </span>
  )
}

function StarIcon({ filled, size = 16, tone = 'light' }) {
  const emptyStroke = tone === 'dark' ? 'rgba(255,255,255,0.35)' : 'rgba(11,42,91,0.3)'
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.4l-5.9 3.3 1.2-6.6L2.5 9.5l6.6-.9L12 2.5z"
        fill={filled ? 'var(--color-gold)' : 'none'}
        stroke={filled ? 'var(--color-gold)' : emptyStroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}