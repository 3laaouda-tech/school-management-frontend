import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function DashboardHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
              {user?.role} portal
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-5">
          <Link
            to="/profile"
            className="text-right hidden sm:block hover:opacity-70 transition-opacity"
          >
            <p className="font-body text-sm text-ink leading-tight">{user?.name}</p>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-ink-soft">
              {user?.role} · view profile
            </p>
          </Link>
          <button
            onClick={handleLogout}
            className="font-body text-sm font-medium px-5 py-2.5 rounded-sm border border-ink text-ink hover:bg-ink hover:text-manila transition-colors"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
