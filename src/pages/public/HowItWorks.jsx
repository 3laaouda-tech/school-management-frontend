import PublicLayout from "../../components/PublicLayout";

const stack = [
  { label: "Frontend", value: "React + Vite, Tailwind CSS" },
  { label: "Backend", value: "Node.js + Express" },
  { label: "Database", value: "MongoDB (Mongoose)" },
  { label: "Auth", value: "JWT, bcrypt password hashing" },
  { label: "Hosting", value: "Vercel (frontend) + Render (backend)" },
];

const roles = [
  {
    name: "Admin",
    body: "Creates and manages every teacher, student, and class account. The only role that can add new users — there's no public sign-up, by design.",
  },
  {
    name: "Teacher",
    body: "Picks one of their classes, then records grades and attendance for the students in it.",
  },
  {
    name: "Student",
    body: "Read-only access to their own grades and attendance. Nothing else.",
  },
];

const flow = [
  {
    step: "01",
    title: "Login",
    body: "Email + password are checked against the database. A signed JWT comes back and is stored in the browser.",
  },
  {
    step: "02",
    title: "Every request",
    body: "The token is attached to each API call. The server verifies it and checks the user's role before running the request.",
  },
  {
    step: "03",
    title: "Role-based data",
    body: "Students only ever receive their own records — the filtering happens on the server, not just hidden in the interface.",
  },
];

export default function HowItWorks() {
  return (
    <PublicLayout>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-brick mb-3">
          How it works
        </p>
        <h1 className="font-display text-5xl text-ink max-w-2xl leading-[1.1]">
          What's actually running behind this site.
        </h1>
        <p className="font-body text-ink-soft text-lg mt-6 max-w-xl leading-relaxed">
          This page exists for anyone curious about the project itself —
          a course build, not a real school. Here's the stack, the data
          model, and how a login turns into the right dashboard.
        </p>
      </section>

      {/* Stack */}
      <section className="border-t border-manila-line bg-card">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h2 className="font-display text-2xl text-ink mb-8">Tech stack</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-manila-line border border-manila-line">
            {stack.map((item) => (
              <div key={item.label} className="bg-card p-5">
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft mb-2">
                  {item.label}
                </p>
                <p className="font-body text-sm text-ink">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Login flow */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-brick mb-3">
          Auth flow
        </p>
        <h2 className="font-display text-3xl text-ink mb-12 max-w-lg">
          From login to dashboard, in three steps.
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {flow.map((item) => (
            <div key={item.step}>
              <p className="font-mono text-3xl text-brick mb-3">{item.step}</p>
              <h3 className="font-display text-xl text-ink mb-2">{item.title}</h3>
              <p className="font-body text-sm text-ink-soft leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roles */}
      <section className="border-t border-manila-line bg-card">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-brick mb-3">
            Roles & permissions
          </p>
          <h2 className="font-display text-3xl text-ink mb-12 max-w-lg">
            Three accounts, three different views of the same data.
          </h2>
          <div className="grid md:grid-cols-3 gap-px bg-manila-line border border-manila-line">
            {roles.map((r) => (
              <div key={r.name} className="bg-manila p-8">
                <h3 className="font-display text-2xl text-ink mb-3">{r.name}</h3>
                <p className="font-body text-sm text-ink-soft leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data model */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-brick mb-3">
          Data model
        </p>
        <h2 className="font-display text-3xl text-ink mb-10 max-w-lg">
          Four collections, wired together with references.
        </h2>
        <div className="bg-card border border-manila-line rounded-sm p-6 overflow-x-auto">
          <pre className="font-mono text-xs md:text-sm text-ink-soft leading-relaxed whitespace-pre">
{`User ──teaches──▶ Class ◀──belongs_to── User (student)
 │                    │
 └──receives──▶ Grade ◀──has── Class
 │
 └──has───────▶ Attendance ◀──tracks── Class`}
          </pre>
        </div>
        <p className="font-body text-sm text-ink-soft mt-6 max-w-xl leading-relaxed">
          A <span className="text-ink">User</span> is one collection with a{" "}
          <code className="font-mono text-xs bg-manila px-1.5 py-0.5 rounded-sm">role</code>{" "}
          field (admin / teacher / student) rather than three separate
          tables — permissions are handled in the API layer instead.
        </p>
      </section>

      {/* Source */}
      <section className="bg-ink text-manila">
        <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl">Full source is on GitHub</h2>
            <p className="font-body text-manila/70 mt-2 max-w-md">
              Both repositories — frontend and backend — are public.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://github.com/3laaouda-tech/school-management-frontend"
              target="_blank"
              rel="noreferrer"
              className="font-body text-sm font-medium px-6 py-3 rounded-sm bg-manila text-ink hover:bg-card transition-colors text-center"
            >
              Frontend repo
            </a>
            <a
              href="https://github.com/3laaouda-tech/school-management-backend"
              target="_blank"
              rel="noreferrer"
              className="font-body text-sm font-medium px-6 py-3 rounded-sm border border-manila/40 hover:border-manila transition-colors text-center"
            >
              Backend repo
            </a>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
