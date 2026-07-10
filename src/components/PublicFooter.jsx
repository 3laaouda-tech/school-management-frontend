import { Link } from "react-router-dom";

export default function PublicFooter() {
  return (
    <footer className="bg-ink text-manila">
      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <span className="font-display text-xl">Bright Horizon School</span>
          <p className="font-body text-sm text-manila/70 mt-3 leading-relaxed max-w-xs">
            An independent K–12 school in Amman, teaching students to ask
            good questions since 2010.
          </p>
        </div>

        <div className="font-body text-sm">
          <p className="uppercase tracking-[0.2em] text-xs text-manila/50 mb-3">Explore</p>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-gold transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gold transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link to="/how-it-works" className="hover:text-gold transition-colors">
                How it works
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gold transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-gold transition-colors">
                Student &amp; Staff Login
              </Link>
            </li>
          </ul>
        </div>

        <div className="font-mono text-sm text-manila/70">
          <p className="uppercase tracking-[0.2em] text-xs text-manila/50 mb-3 font-body">
            Visit us
          </p>
          <p>Al Rabieh Street</p>
          <p>Amman, Jordan</p>
          <p className="mt-3">+962 6 000 0000</p>
          <p>hello@brighthorizon.edu.jo</p>
        </div>
      </div>

      <div className="border-t border-manila/10">
        <p className="max-w-6xl mx-auto px-6 py-5 font-mono text-xs text-manila/40">
          © {new Date().getFullYear()} Bright Horizon School. Est. 2010.
        </p>
      </div>
    </footer>
  );
}
