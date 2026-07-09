import { Link, NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }) =>
  `text-sm tracking-wide transition-colors ${
    isActive ? "text-ink" : "text-ink-soft hover:text-ink"
  }`;

export default function PublicNavbar() {
  return (
    <header className="border-b border-manila-line bg-manila/95 backdrop-blur sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink text-ink font-display font-semibold text-lg group-hover:bg-ink group-hover:text-manila transition-colors">
            BH
          </span>
          <span className="font-display text-xl text-ink leading-none">
            Bright Horizon
            <span className="block text-[0.65rem] tracking-[0.25em] uppercase text-ink-soft font-body mt-0.5">
              School
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </nav>

        <Link
          to="/login"
          className="font-body text-sm font-medium px-5 py-2.5 rounded-sm border border-ink text-ink hover:bg-ink hover:text-manila transition-colors"
        >
          Student &amp; Staff Login
        </Link>
      </div>
    </header>
  );
}
