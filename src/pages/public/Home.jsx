import { Link } from "react-router-dom";
import PublicLayout from "../../components/PublicLayout";

const schedule = [
  { time: "07:45", label: "Morning Assembly" },
  { time: "08:15", label: "Period 1 · Mathematics" },
  { time: "09:05", label: "Period 2 · Science" },
  { time: "10:00", label: "Break" },
  { time: "10:20", label: "Period 3 · Literature" },
  { time: "11:10", label: "Period 4 · Art & Design" },
];

const stats = [
  { value: "540", label: "Students enrolled" },
  { value: "48", label: "Teaching staff" },
  { value: "14", label: "Years running" },
  { value: "1:11", label: "Teacher-student ratio" },
];

const programs = [
  {
    grade: "KG – Grade 3",
    title: "Foundation Years",
    body: "Play-based learning that builds the habits of attention, curiosity, and kindness.",
  },
  {
    grade: "Grade 4 – 8",
    title: "Middle School",
    body: "Subject specialists guide students through science, math, and the humanities.",
  },
  {
    grade: "Grade 9 – 12",
    title: "Senior School",
    body: "College-preparatory tracks with electives in design, coding, and languages.",
  },
];

export default function Home() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-start">
        <div>
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-brick mb-5">
            Est. 2010 · Amman, Jordan
          </p>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.05] text-ink">
            Where curiosity
            <br />
            becomes character.
          </h1>
          <p className="font-body text-ink-soft text-lg mt-6 max-w-md leading-relaxed">
            Bright Horizon is an independent school for grades KG–12, built
            around small classes, real feedback, and teachers who stay for
            years, not semesters.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-9">
            <Link
              to="/contact"
              className="font-body text-sm font-medium px-6 py-3 rounded-sm bg-ink text-manila hover:bg-brick transition-colors"
            >
              Book a campus visit
            </Link>
            <Link
              to="/about"
              className="font-body text-sm font-medium px-6 py-3 rounded-sm border border-ink-soft/30 text-ink hover:border-ink transition-colors"
            >
              Learn about us
            </Link>
          </div>
        </div>

        {/* Signature element: today's schedule ledger */}
        <div className="bg-card border border-manila-line rounded-sm shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-manila-line">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
              Today at Bright Horizon
            </span>
            <span className="h-2 w-2 rounded-full bg-sage"></span>
          </div>
          <ul className="divide-y divide-manila-line">
            {schedule.map((item) => (
              <li
                key={item.time}
                className="flex items-baseline gap-4 px-5 py-3 font-mono text-sm"
              >
                <span className="text-ink-soft w-14 shrink-0">{item.time}</span>
                <span className="text-ink">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stats ledger row */}
      <section className="border-y border-manila-line bg-card">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-10 px-4 text-center ${
                i !== 0 ? "border-l border-manila-line" : ""
              }`}
            >
              <p className="font-display text-4xl text-ink">{s.value}</p>
              <p className="font-body text-xs uppercase tracking-[0.15em] text-ink-soft mt-2">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-brick mb-3">
          Programs
        </p>
        <h2 className="font-display text-3xl text-ink mb-12 max-w-lg">
          Three stages, one continuous idea of what a student can become.
        </h2>

        <div className="grid md:grid-cols-3 gap-px bg-manila-line border border-manila-line">
          {programs.map((p) => (
            <div key={p.title} className="bg-manila p-8">
              <p className="font-mono text-xs text-ink-soft mb-4">{p.grade}</p>
              <h3 className="font-display text-2xl text-ink mb-3">{p.title}</h3>
              <p className="font-body text-sm text-ink-soft leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-brick text-manila">
        <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl">Ready to see it for yourself?</h2>
            <p className="font-body text-manila/80 mt-2 max-w-md">
              Tours run every Tuesday and Thursday morning during term time.
            </p>
          </div>
          <Link
            to="/contact"
            className="font-body text-sm font-medium px-6 py-3 rounded-sm bg-manila text-brick hover:bg-card transition-colors whitespace-nowrap"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
