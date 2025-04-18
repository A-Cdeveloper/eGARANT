import { ProgressBar } from "@/components/progress/ProgresBar";
import {
  endDate,
  formatDate,
  getDaysBetweenDates,
  getNumDaysFromToday,
} from "@/lib/utils";

import React from "react";

const ProductStatus = ({ date, gperiod }: { date: Date; gperiod: number }) => {
  if (!gperiod) return null;
  const finalDate = endDate(date, gperiod);
  const daysUntilfinalDate = getNumDaysFromToday(date);
  const daysTotal = getDaysBetweenDates(finalDate, date);

  let percentage = (daysUntilfinalDate * 100) / daysTotal;

  if (getDaysBetweenDates(finalDate, new Date()) <= 0) percentage = 100;

  const progressBarColor =
    percentage < 50
      ? "bg-green-600"
      : percentage >= 50 && percentage < 80
      ? "bg-yellow-600"
      : "bg-red-600";

  return (
    <div>
      {percentage >= 100 ? (
        <p className="text-xs">{`garancija je istekla ${formatDate(
          finalDate
        )}`}</p>
      ) : (
        <p className="text-xs">važi do {formatDate(finalDate)}</p>
      )}
      <ProgressBar
        value={percentage}
        progressBarColor={progressBarColor}
        className="my-1"
      />
    </div>
  );
};

export default ProductStatus;
