type ProjectItem = {
  name: string;
  summaryPoints: string[];
};

const projects: ProjectItem[] = [
  {
    name: "TourPilot",
    summaryPoints: [
      "A multi-agent system for travel planning.",
      "Built with LangChain, FastAPI, OpenAI, and Supabase.",
      "My goal is to travel the world without needing a tour guide in the future.",
    ],
  },
  {
    name: "FeedSystem",
    summaryPoints: [
      "A high-concurrency backend feed streaming system.",
      "Built with Gin, MySQL, Docker, Redis, and RabbitMQ.",
      "TikTok is China's greatest global company.",
    ],
  },
  {
    name: "RaIInet",
    summaryPoints: [
      "A board game where I first applied OOP concepts.",
      "Built with C++ smart pointers and pass-by-reference for memory management.",
      "shallow vs deep copy through object-oriented design.",
    ],
  },
  {
    name: "SpotSeeker",
    summaryPoints: [
      "An Android app for sharing pictures and discovering locations.",
      "Built with Jetpack Compose, Google Map SDK, and Ktor.",
      "Beyond the terminal—understanding how code transforms into a real app.",
    ],
  },
];

export default function Projects() {
  return (
    <section className="my-10">
      <h2 className="mb-4 text-xl font-semibold tracking-tighter">Projects</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((project, index) => (
          <article
            key={`project-${index}`}
            className="rounded-xl border border-neutral-200 p-4 md:p-6 dark:border-neutral-800"
          >
            <p className="text-sm text-neutral-700 dark:text-neutral-200">
              <span className="font-semibold">Project:</span> {project.name}
            </p>
            <div className="mt-2 text-sm text-neutral-700 dark:text-neutral-200">
              <span className="font-semibold">Summary:</span>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                {project.summaryPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
