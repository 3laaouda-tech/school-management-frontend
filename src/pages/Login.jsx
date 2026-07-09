import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: { email, password },
      });
      login(data.user, data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-manila font-body px-6">
      <div className="w-full max-w-sm">
        <Link to="/" className="flex items-center gap-3 mb-10 justify-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink text-ink font-display font-semibold text-lg">
            BH
          </span>
          <span className="font-display text-xl text-ink leading-none">
            Bright Horizon
            <span className="block text-[0.65rem] tracking-[0.25em] uppercase text-ink-soft font-body mt-0.5">
              School
            </span>
          </span>
        </Link>

        <div className="bg-card border border-manila-line rounded-sm p-8">
          <h1 className="font-display text-2xl text-ink text-center mb-1">Welcome back</h1>
          <p className="font-body text-sm text-ink-soft text-center mb-7">
            Student &amp; staff portal
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                Email
              </span>
              <input
                type="email"
                className="font-body border-b border-manila-line focus:border-ink outline-none py-2 bg-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                Password
              </span>
              <input
                type="password"
                className="font-body border-b border-manila-line focus:border-ink outline-none py-2 bg-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            {error && <p className="text-brick text-sm font-body">{error}</p>}

            <button
              type="submit"
              className="font-body text-sm font-medium px-6 py-3 rounded-sm bg-ink text-manila hover:bg-brick transition-colors mt-2 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
        </div>

        <Link
          to="/"
          className="block text-center font-body text-sm text-ink-soft hover:text-ink mt-6"
        >
          ← Back to homepage
        </Link>
      </div>
    </div>
  );
}
