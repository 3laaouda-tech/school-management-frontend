import PublicLayout from "../../components/PublicLayout";

const timeline = [
  {
    year: "2010",
    title: "Founded",
    body: "Bright Horizon opens with 40 students in a converted villa in Al Rabieh.",
  },
  {
    year: "2014",
    title: "Senior school added",
    body: "The first graduating class of 12 students sits their final exams.",
  },
  {
    year: "2019",
    title: "New campus",
    body: "We move to a purpose-built campus with science and art studios.",
  },
  {
    year: "2024",
    title: "540 students",
    body: "Fourteen graduating classes on, Bright Horizon reaches full enrollment.",
  },
];

const values = [
  {
    title: "Small by design",
    body: "18 students per class, so no one learns to disappear into a crowd.",
  },
  {
    title: "Teachers who stay",
    body: "Most of our faculty have taught here for over five years. They know your child's name before September.",
  },
  {
    title: "Feedback, not just grades",
    body: "Report cards come with a conversation, every term, with the teacher who wrote them.",
  },
];

export default function About() {
  return (
    <PublicLayout>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-brick mb-3">
          About us
        </p>
        <h1 className="font-display text-5xl text-ink max-w-2xl leading-[1.1]">
          A school built around knowing every student by name.
        </h1>
        <p className="font-body text-ink-soft text-lg mt-6 max-w-xl leading-relaxed">
          Bright Horizon was founded in 2010 by a group of teachers who
          believed a school could stay small on purpose, even as it grew.
          Fourteen years later, that's still the idea we haven't grown out of.
        </p>
      </section>

      {/* Timeline - a real chronological sequence, so numbering carries information */}
      <section className="border-t border-manila-line bg-card">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="font-display text-2xl text-ink mb-10">Our history</h2>
          <div className="grid md:grid-cols-4 gap-px bg-manila-line border border-manila-line">
            {timeline.map((item) => (
              <div key={item.year} className="bg-card p-6">
                <p className="font-mono text-2xl text-brick mb-2">{item.year}</p>
                <h3 className="font-display text-lg text-ink mb-2">{item.title}</h3>
                <p className="font-body text-sm text-ink-soft leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-brick mb-3">
          What we believe
        </p>
        <h2 className="font-display text-3xl text-ink mb-12 max-w-lg">
          Three things we won't compromise on as we grow.
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {values.map((v) => (
            <div key={v.title} className="border-t-2 border-ink pt-5">
              <h3 className="font-display text-xl text-ink mb-3">{v.title}</h3>
              <p className="font-body text-sm text-ink-soft leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
