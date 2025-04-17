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

//////////////////////////////////////////
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function calculateInvoiceTotal(products: any): number {
  if (!Array.isArray(products)) return 0;
  return products.reduce((acc, p) => {
    if (p && typeof p === "object" && "unit_price" in p && "quantity" in p) {
      return acc + p.unit_price * p.quantity;
    }
    return acc;
  }, 0);
}

/////////////////////////////////////////////

export const createInitials = (firstname: string, lastname: string) => {
  if (!firstname || !lastname) {
    return "NN";
  }
  return `${firstname.at(0)} ${lastname.at(0)}`;
};

///////////////////////////////////////////////////////
export const resizeImage = (
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (event) => {
      img.src = event.target?.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");

      let width = img.width;
      let height = img.height;

      // Calculate new size maintaining aspect ratio
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Failed to get canvas context");

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(resizedFile);
          } else {
            reject("Image resize failed");
          }
        },
        file.type,
        0.9 // quality
      );
    };

    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};
