import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../api";
import { useAuth } from "../context/AuthContext";
import DashboardHeader from "../components/DashboardHeader";

const inputClass =
  "font-body text-sm border-b border-manila-line focus:border-ink outline-none py-2 bg-transparent px-1";
const primaryBtn =
  "font-body text-sm font-medium px-6 py-3 rounded-sm bg-ink text-manila hover:bg-brick transition-colors disabled:opacity-60";

export default function Profile() {
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [profileError, setProfileError] = useState("");

  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiRequest("/users/me", { token })
      .then(setProfile)
      .catch((err) => setProfileError(err.message));
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.newPassword !== form.confirmPassword) {
      setError("New password and confirmation don't match");
      return;
    }
    if (form.newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await apiRequest("/users/me/password", {
        method: "PUT",
        body: {
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        },
        token,
      });
      setSuccess("Password updated successfully");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-manila font-body">
      <DashboardHeader />

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col gap-8 max-w-lg">
          <div>
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-brick mb-2">
              My profile
            </p>
            <h1 className="font-display text-3xl text-ink">{profile?.name || "…"}</h1>
          </div>

          {profileError && <p className="text-brick text-sm font-body">{profileError}</p>}

          {/* Profile info */}
          <div className="bg-card border border-manila-line rounded-sm p-6 flex flex-col gap-4">
            <div className="flex justify-between border-b border-manila-line pb-3">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                Name
              </span>
              <span className="font-body text-sm text-ink">{profile?.name}</span>
            </div>
            <div className="flex justify-between border-b border-manila-line pb-3">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                Email
              </span>
              <span className="font-body text-sm text-ink">{profile?.email}</span>
            </div>
            <div className="flex justify-between border-b border-manila-line pb-3">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                Role
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.1em] border border-manila-line rounded-sm px-2 py-1 text-ink-soft">
                {profile?.role}
              </span>
            </div>
            {profile?.role === "student" && (
              <div className="flex justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                  Class
                </span>
                <span className="font-body text-sm text-ink">
                  {profile?.classId?.name || "—"}
                </span>
              </div>
            )}
          </div>

          {/* Change password */}
          <div className="bg-card border border-manila-line rounded-sm p-6">
            <h2 className="font-display text-xl text-ink mb-5">Change password</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                  Current password
                </span>
                <input
                  type="password"
                  className={inputClass}
                  value={form.currentPassword}
                  onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
                  required
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                  New password
                </span>
                <input
                  type="password"
                  className={inputClass}
                  value={form.newPassword}
                  onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                  required
                  minLength={6}
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                  Confirm new password
                </span>
                <input
                  type="password"
                  className={inputClass}
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  required
                  minLength={6}
                />
              </label>

              {error && <p className="text-brick text-sm font-body">{error}</p>}
              {success && <p className="text-sage text-sm font-body">{success}</p>}

              <button
                type="submit"
                className={primaryBtn + " self-start mt-2"}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update password"}
              </button>
            </form>
          </div>

          <Link to="/dashboard" className="font-body text-sm text-ink-soft hover:text-ink">
            ← Back to dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
