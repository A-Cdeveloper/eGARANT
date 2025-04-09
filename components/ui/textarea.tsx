import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-neutral-200 placeholder:text-primary/50 placeholder:text-[14px] focus-visible:border-neutral-400 focus-visible:ring-neutral-50 focus-visible:ring-[0px] aria-invalid:ring-red-500/20  aria-invalid:border-red-500 dark:bg-neutral-200/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-white px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none ] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:border-neutral-300 dark:focus-visible:ring-neutral-300/50  dark:dark:aria-invalid:ring-red-900/40 dark:aria-invalid:border-red-900 dark:dark:bg-neutral-800/30",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
