import HeatmapCalendar from "./github-heatmap-calendar";

type GitHubHeatmapProps = {
  username?: string;
};

type GitHubContributionDay = {
  date: string;
  contributionCount: number;
  contributionLevel:
    | "NONE"
    | "FIRST_QUARTILE"
    | "SECOND_QUARTILE"
    | "THIRD_QUARTILE"
    | "FOURTH_QUARTILE";
};

type GitHubGraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: Array<{
            contributionDays: GitHubContributionDay[];
          }>;
        };
      };
    };
  };
  errors?: Array<{ message: string }>;
};

const levelToValue: Record<GitHubContributionDay["contributionLevel"], number> =
  {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4,
  };

async function getContributionData(username: string) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return { error: "Missing GITHUB_TOKEN in environment variables." };
  }

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query ($username: String!) {
          user(login: $username) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                    contributionLevel
                  }
                }
              }
            }
          }
        }
      `,
      variables: { username },
    }),
    cache: "no-store",
  });

  const payload = (await response.json()) as GitHubGraphQLResponse;

  if (!response.ok || payload.errors?.length) {
    return {
      error:
        payload.errors?.[0]?.message ||
        "Unable to load GitHub contributions right now.",
    };
  }

  const calendar =
    payload.data?.user?.contributionsCollection.contributionCalendar;
  if (!calendar) {
    return { error: `Could not find GitHub user "${username}".` };
  }

  const activities = calendar.weeks
    .flatMap((week) => week.contributionDays)
    .map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: levelToValue[day.contributionLevel],
    }));

  return {
    activities,
    totalContributions: calendar.totalContributions,
  };
}

export default async function GitHubHeatmap({ username }: GitHubHeatmapProps) {
  return (
    <section className="my-10">
      <h2 className="mb-4 text-xl font-semibold tracking-tighter">
        GitHub Contributions
      </h2>

      <div className="rounded-xl border border-neutral-200 p-4 md:p-6 dark:border-neutral-800">
        {!username ? (
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            Set `GITHUB_USERNAME` to display your contribution heatmap.
          </p>
        ) : (
          <HeatmapContent username={username} />
        )}
      </div>
    </section>
  );
}

async function HeatmapContent({ username }: { username: string }) {
  const result = await getContributionData(username);

  if ("error" in result) {
    return (
      <p className="text-sm text-neutral-600 dark:text-neutral-300">
        {result.error}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <div className="min-w-[640px]">
          <HeatmapCalendar activities={result.activities} />
        </div>
      </div>

      <p className="text-sm text-neutral-600 dark:text-neutral-300">
        {username} has {result.totalContributions} contributions in the last 12
        months.
      </p>
    </div>
  );
}
