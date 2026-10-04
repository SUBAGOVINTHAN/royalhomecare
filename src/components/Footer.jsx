import logo from '../assets/logo.jpeg'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-navy-deep)' }} className="px-6 py-12 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 border-t border-white/10 pt-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Royal Home Care logo" className="h-10 w-10 rounded-full object-cover" />
          <div>
            <p className="font-display text-base font-semibold text-white">Royal Home Care</p>
            <p className="text-xs text-white/50">AC &amp; Home Comfort Specialists</p>
          </div>
        </div>

        <nav className="flex flex-wrap justify-center gap-6 text-sm text-white/60">
          <a href="#services" className="focus-ring rounded hover:text-white">
            Services
          </a>
          <a href="#process" className="focus-ring rounded hover:text-white">
            How It Works
          </a>
          <a href="#about" className="focus-ring rounded hover:text-white">
            About
          </a>
          <a href="#contact" className="focus-ring rounded hover:text-white">
            Contact
          </a>
        </nav>

        <p className="text-xs text-white/40">
          © {new Date().getFullYear()} Royal Home Care. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
