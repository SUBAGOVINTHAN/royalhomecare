import { motion, MotionConfig } from 'framer-motion'

const PHONE_HREF = 'tel:+919500160491'
const WHATSAPP_HREF =
  'https://wa.me/919500160491?text=Hi%20Royal%20Home%20Care%2C%20I%20would%20like%20to%20book%20a%20service.'

// Two small round icons fixed at the bottom of the screen (call on the left, WhatsApp on the right).
// They stay in place while the page scrolls, like the navbar does at the top.
export default function StickyContactBar() {
  return (
    <MotionConfig reducedMotion="user">
      {/* Call: bottom left */}
      <motion.a
        href={PHONE_HREF}
        aria-label="Call Royal Home Care"
        className="focus-ring group fixed left-4 z-30 flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg shadow-black/30 sm:left-6 sm:h-12 sm:w-12"
        style={{
          backgroundColor: '#16a34a',
          bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)',
        }}
        initial={{ opacity: 0, scale: 0, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 16 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
      >
        <PulseRing color="rgba(22,163,74,0.6)" delay={0} />
        <motion.svg
          className="relative h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          animate={{ rotate: [0, -16, 16, -12, 12, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
        >
          <path
            d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8Z"
            fill="currentColor"
          />
        </motion.svg>
        <Tooltip side="left">Call now</Tooltip>
      </motion.a>

      {/* WhatsApp: bottom right */}
      <motion.a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Royal Home Care on WhatsApp"
        className="focus-ring group fixed right-4 z-30 flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg shadow-black/30 sm:right-6 sm:h-12 sm:w-12"
        style={{
          backgroundColor: '#25D366',
          bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)',
        }}
        initial={{ opacity: 0, scale: 0, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 16 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
      >
        <PulseRing color="rgba(37,211,102,0.6)" delay={0.9} />
        <motion.svg
          className="relative h-6 w-6"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          animate={{ y: [0, -4, 0, -2, 0] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </motion.svg>
        <Tooltip side="right">Chat on WhatsApp</Tooltip>
      </motion.a>
    </MotionConfig>
  )
}

function PulseRing({ color, delay }) {
  return (
    <motion.span
      aria-hidden="true"
      className="absolute inset-0 rounded-full"
      animate={{ boxShadow: [`0 0 0 0 ${color}`, '0 0 0 12px rgba(0,0,0,0)'] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay }}
    />
  )
}

// Small label that appears on hover (desktop) or keyboard focus
function Tooltip({ side, children }) {
  return (
    <span
      role="tooltip"
      className={`pointer-events-none absolute bottom-full mb-2 whitespace-nowrap rounded-md bg-navy-deep px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 ${
        side === 'left' ? 'left-0' : 'right-0'
      }`}
    >
      {children}
    </span>
  )
}