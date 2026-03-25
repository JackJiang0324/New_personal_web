import HeatmapCalendar from "./github-heatmap-calendar";

type LeetCodeHeatmapProps = {
  username?: string;
};

type LeetCodeGraphQLResponse = {
  data?: {
    matchedUser?: {
      userCalendar?: {
        submissionCalendar?: string;
      };
    };
  };
  errors?: Array<{ message: string }>;
};

type Activity = {
  date: string;
  count: number;
  level: number;
};

function toISODate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function computeLevel(count: number, maxCount: number) {
  if (count <= 0 || maxCount <= 0) {
    return 0;
  }

  const ratio = count / maxCount;
  if (ratio <= 0.25) {
    return 1;
  }
  if (ratio <= 0.5) {
    return 2;
  }
  if (ratio <= 0.75) {
    return 3;
  }
  return 4;
}

async function getLeetCodeData(username: string) {
  const response = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0",
      Referer: `https://leetcode.com/${username}/`,
    },
    body: JSON.stringify({
      query: `
        query userCalendar($username: String!) {
          matchedUser(username: $username) {
            userCalendar {
              submissionCalendar
            }
          }
        }
      `,
      variables: { username },
    }),
    cache: "no-store",
  });

  const payload = (await response.json()) as LeetCodeGraphQLResponse;

  if (!response.ok || payload.errors?.length) {
    return {
      error:
        payload.errors?.[0]?.message ||
        "Unable to load LeetCode activity right now.",
    };
  }

  const submissionCalendarRaw =
    payload.data?.matchedUser?.userCalendar?.submissionCalendar;

  if (!submissionCalendarRaw) {
    return { error: `Could not find LeetCode user \"${username}\".` };
  }

  const submissionMap = JSON.parse(submissionCalendarRaw) as Record<
    string,
    number
  >;

  const today = new Date();
  const days = 365;
  const dates: string[] = [];

  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(toISODate(date));
  }

  const countsByDate = new Map<string, number>();

  for (const [timestamp, count] of Object.entries(submissionMap)) {
    const date = new Date(Number(timestamp) * 1000);
    countsByDate.set(toISODate(date), count);
  }

  const maxCount = dates.reduce((max, date) => {
    const count = countsByDate.get(date) ?? 0;
    return count > max ? count : max;
  }, 0);

  const activities: Activity[] = dates.map((date) => {
    const count = countsByDate.get(date) ?? 0;
    return {
      date,
      count,
      level: computeLevel(count, maxCount),
    };
  });

  const totalSubmissions = activities.reduce((sum, day) => sum + day.count, 0);

  return {
    activities,
    totalSubmissions,
  };
}

export default async function LeetCodeHeatmap({
  username,
}: LeetCodeHeatmapProps) {
  return (
    <section className="my-10">
      <h2 className="mb-4 text-xl font-semibold tracking-tighter">
        LeetCode Activity
      </h2>

      <div className="rounded-xl border border-neutral-200 p-4 md:p-6 dark:border-neutral-800">
        {!username ? (
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            Set `LEETCODE_USERNAME` to display your LeetCode heatmap.
          </p>
        ) : (
          <HeatmapContent username={username} />
        )}
      </div>
    </section>
  );
}

async function HeatmapContent({ username }: { username: string }) {
  const result = await getLeetCodeData(username);

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
        {username} has {result.totalSubmissions} submissions in the last 12
        months.
      </p>
    </div>
  );
}
