"use client";

import { ActivityCalendar } from "react-activity-calendar";
import { useEffect, useState } from "react";

type Activity = {
  date: string;
  count: number;
  level: number;
};

export default function HeatmapCalendar({
  activities,
}: {
  activities: Activity[];
}) {
  const [mounted, setMounted] = useState(false);

  // Only render after mount to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-32 bg-neutral-100 dark:bg-neutral-900 rounded animate-pulse" />
    );
  }

  return (
    <ActivityCalendar
      data={activities}
      blockSize={12}
      blockMargin={4}
      fontSize={12}
      labels={{
        legend: {
          less: "",
          more: "Contributions",
        },
      }}
      theme={{
        light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
        dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
      }}
    />
  );
}
