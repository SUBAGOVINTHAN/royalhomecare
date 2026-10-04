import { useEffect } from 'react'

// Bricolage Grotesque -> headings / logo wordmark
// Work Sans          -> nav links / body copy
// Caveat              -> the "Stay Cool, Stay Comfortable" script accent
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=Work+Sans:wght@400;500;600;700&family=Caveat:wght@600&display=swap'

/**
 * Injects the Google Fonts <link> into <head> on first render.
 * Safe to call from multiple components — it no-ops if the link already exists.
 * This is what actually makes font-display / font-sans / font-script resolve;
 * you still need the tailwind.config.js mapping below (one-time, build-time only).
 */
export default function useGoogleFonts() {
  useEffect(() => {
    if (document.querySelector(`link[data-rhc-fonts="true"]`)) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = FONT_HREF
    link.setAttribute('data-rhc-fonts', 'true')
    document.head.appendChild(link)
  }, [])
}