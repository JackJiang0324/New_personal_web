type Experience = {
  company: string;
  role: string;
  period: string;
  icon: string;
  points: string[];
};

const experiences: Experience[] = [
  {
    company: "Cooper Standard",
    role: "Engineering Assistant",
    period: "2026.1.1 - 2026.5.1",
    icon: "/company-icons/cooper%20standard.svg",
    points: ["Built a text-to-SQL agent for efficient database querying."],
  },
  {
    company: "University of Waterloo",
    role: "Instructional Assistant",
    period: "2024.8.20 - 2024.12.20",
    icon: "/company-icons/waterloo.svg",
    points: ["Led 10 tutorials and helped 500 students understand CS135."],
  },
];

export default function WorkExperience() {
  return (
    <section className="my-10">
      <h2 className="mb-4 text-xl font-semibold tracking-tighter">
        Work Experience
      </h2>

      <div className="space-y-5">
        {experiences.map((item) => (
          <article
            key={`${item.company}-${item.period}`}
            className="rounded-xl border border-neutral-200 p-4 md:p-6 dark:border-neutral-800"
          >
            <div className="flex items-start gap-4">
              <img
                src={item.icon}
                alt={`${item.company} icon`}
                className="h-14 w-14 shrink-0 rounded-md border border-neutral-200 object-cover dark:border-neutral-700"
              />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <h3 className="text-base font-semibold">{item.company}</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300">
                    {item.period}
                  </p>
                </div>
                <p className="mb-2 text-sm text-neutral-700 dark:text-neutral-200">
                  {item.role}
                </p>

                <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-700 dark:text-neutral-200">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
