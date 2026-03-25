const thinkingAbout = [
  "How AI is reshaping humanity.",
  "What seems simple on the surface but takes real life experience to truly understand.",
  "Whether humanity's final form becomes electrical signals once brain-computer interfaces are fully realized.",
  "How I should spend my 30,000 days of life.",
];

const beliefs = [
  "Luck and randomness play a bigger role in outcomes than most people admit.",
  "You don't really understand something until you try to build it.",
  "Hard work doesn't always pay off, but not working hard almost guarantees it won't.",
  "The world is mean-reverting; in the end, we become who we truly are.",
];

const ideas = [
  {
    title: "Virtual Memory",
    tag: "systems",
    description: "The illusion that programs have infinite memory.",
  },
  {
    title: "Hash Maps",
    tag: "data structures",
    description: "The GOAT of all GOATS.",
  },
  {
    title: "Cache Hierarchy",
    tag: "systems",
    description:
      "This is why algorithms that touch memory sequentially can be 10-100x faster.",
  },
  {
    title: "Gradient Descent",
    tag: "ml",
    description: "Still feels like magic how it powers modern ML.",
  },
  {
    title: "Attention",
    tag: "ml",
    description:
      "Everything interacts with everything else through similarity.",
  },
  {
    title: "Embeddings",
    tag: "ml",
    description:
      "Abstract concepts become points in space. Then you can do math on meaning.",
  },
  {
    title: "Backtracking",
    tag: "algorithms",
    description:
      "Recursively exploring entire decision spaces with DFS is elegant.",
  },
  {
    title: "False Sharing",
    tag: "concurrency",
    description: "Threads interfere through nearby memory in invisible ways.",
  },
];

const aboutMe = [
  "I enjoy investing in stocks and strongly believe in the power of compounding.",
  "The company I am most bullish on is Google.",
  "My dream is to achieve financial freedom and live around the world.",
  "I like a girl who will probably never like me back: Elio Cheng 程紫萱",
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 border-b border-neutral-200 pb-3 text-3xl font-semibold tracking-tight dark:border-neutral-800">
      {children}
    </h2>
  );
}

export default function AboutPage() {
  return (
    <section className="space-y-12">
      <div>
        <SectionTitle>Currently Thinking About</SectionTitle>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {thinkingAbout.map((item) => (
            <article
              key={item}
              className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-950"
            >
              <p className="text-sm text-neutral-800 dark:text-neutral-200">
                • {item}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div>
        <SectionTitle>Things I Believe</SectionTitle>
        <ol className="space-y-2">
          {beliefs.map((item, index) => (
            <li
              key={item}
              className="grid grid-cols-[2rem_1fr] items-start border-b border-neutral-200 py-3 dark:border-neutral-800"
            >
              <span className="text-xs text-neutral-500">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-sm text-neutral-800 dark:text-neutral-200">
                {item}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <SectionTitle>Favorite Ideas in Computing</SectionTitle>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {ideas.map((idea) => (
            <article
              key={idea.title}
              className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-950"
            >
              <div className="mb-2 flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                  {idea.title}
                </h3>
                <span className="rounded bg-sky-100 px-2 py-0.5 text-xs text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                  {idea.tag}
                </span>
              </div>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                {idea.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div>
        <SectionTitle>Things About Me</SectionTitle>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {aboutMe.map((item) => (
            <article
              key={item}
              className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-950"
            >
              <p className="text-base leading-8 text-neutral-800 dark:text-neutral-200">
                • {item}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
