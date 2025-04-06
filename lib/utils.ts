import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { addMonths, differenceInCalendarDays, format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date) => {
  return date ? format(date, "dd.MM.yyyy") : "-";
};

export const endDate = (date: Date, period: number) => {
  return addMonths(date, period);
};

export const getNumDaysFromToday = (date: Date) => {
  const today = new Date();
  return differenceInCalendarDays(today, date);
};

export const getDaysBetweenDates = (startDate: Date, endDate: Date) => {
  return differenceInCalendarDays(startDate, endDate);
};

///////////////////////////////////////////////
export const formatPrice = (price: number) => {
  return `${price.toFixed(2)} RSD`;
};

/////////////////////////////////////////////

export function getJsonArrayLength(value: unknown): number {
  return Array.isArray(value) ? value.length : 0;
}

export function reduceJsonArray<T extends object>(
  value: unknown,
  reducer: (acc: number, item: T) => number,
  initial = 0
): number {
  if (!Array.isArray(value)) return initial;

  return value.reduce((acc, item) => {
    if (typeof item === "object" && item !== null) {
      return reducer(acc, item as T);
    }
    return acc;
  }, initial);
}

export function mapJsonArray<T, R>(
  value: unknown,
  callback: (item: T, index: number) => R
): R[] {
  return Array.isArray(value) ? value.map(callback) : [];
}
