import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { addMonths, differenceInCalendarDays, format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string | undefined) => {
  return dateString ? format(new Date(dateString), "dd.MM.yyyy") : "-";
};

export const endDate = (dateString: string, period: number) => {
  const newDate = addMonths(new Date(dateString), period);
  return newDate.toLocaleDateString("rs-SR");
};

export const getNumDaysFromToday = (dateString: string) => {
  const givenDate = new Date(dateString);
  const today = new Date();
  return differenceInCalendarDays(today, givenDate);
};

export const getDaysBetweenDates = (
  startDateString: string,
  endDateString: string
) => {
  return differenceInCalendarDays(startDateString, endDateString);
};

export const formatPrice = (price: number) => {
  return `${price.toFixed(2)} RSD`;
};
