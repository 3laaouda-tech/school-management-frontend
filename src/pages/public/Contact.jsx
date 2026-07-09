import { useState } from "react";
import PublicLayout from "../../components/PublicLayout";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // This is a front-end only form for now - no backend endpoint yet.
    // See the note below the form for how to wire it up later.
    setSent(true);
  };

  return (
    <PublicLayout>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-brick mb-3">
          Contact
        </p>
        <h1 className="font-display text-5xl text-ink max-w-2xl leading-[1.1]">
          Come see the classrooms for yourself.
        </h1>
        <p className="font-body text-ink-soft text-lg mt-6 max-w-xl leading-relaxed">
          Tours run Tuesday and Thursday mornings during term time. Or send us
          a note below and a member of our admissions team will get back to
          you within two working days.
        </p>

        <div className="mt-14 grid lg:grid-cols-[1fr_1.2fr] gap-14">
          {/* Contact details */}
          <div className="space-y-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft mb-2">
                Visit
              </p>
              <p className="font-body text-ink">Al Rabieh Street</p>
              <p className="font-body text-ink">Amman, Jordan</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft mb-2">
                Call
              </p>
              <p className="font-body text-ink">+962 6 000 0000</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft mb-2">
                Email
              </p>
              <p className="font-body text-ink">hello@brighthorizon.edu.jo</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft mb-2">
                Office hours
              </p>
              <p className="font-body text-ink">Sun – Thu, 7:30am – 3:30pm</p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card border border-manila-line rounded-sm p-8">
            {sent ? (
              <div className="py-10 text-center">
                <p className="font-display text-2xl text-ink mb-2">Message sent</p>
                <p className="font-body text-ink-soft text-sm">
                  Thanks, {form.name || "there"} — we'll be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <label className="flex flex-col gap-1.5">
                  <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                    Name
                  </span>
                  <input
                    className="font-body border-b border-manila-line focus:border-ink outline-none py-2 bg-transparent"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                    Email
                  </span>
                  <input
                    type="email"
                    className="font-body border-b border-manila-line focus:border-ink outline-none py-2 bg-transparent"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
                    Message
                  </span>
                  <textarea
                    rows={4}
                    className="font-body border-b border-manila-line focus:border-ink outline-none py-2 bg-transparent resize-none"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                  />
                </label>
                <button
                  type="submit"
                  className="font-body text-sm font-medium px-6 py-3 rounded-sm bg-ink text-manila hover:bg-brick transition-colors self-start mt-2"
                >
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
