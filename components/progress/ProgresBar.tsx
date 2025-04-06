"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";

export function ProgressBar({
  value,
  className,
  progressBarColor,
}: {
  value: number;
  className?: string;
  progressBarColor: string;
}) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 500);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <Progress
      value={progress}
      className={className}
      progressBarColor={progressBarColor}
    />
  );
}
