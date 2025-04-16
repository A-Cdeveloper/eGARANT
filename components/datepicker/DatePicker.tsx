"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { cn } from "@/lib/utils";

type DatePickerProps = {
  value?: Date;
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
  onChange?: (date: Date | undefined) => void;
};

export function DatePickerCalendar({
  value,
  onChange,
  setIsDirty,
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(value);
  const [open, setOpen] = React.useState(false);

  const handleSelect = (selected: Date | null) => {
    setDate(selected ?? undefined);
    onChange?.(selected ?? undefined);
    setIsDirty(true);

    setOpen(false); // close popover on selection
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "w-auto flex justify-start font-normal has-[>svg]:px-0",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd.MM.yyyy") : <span>Izaberi datum</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 bg-white shadow-lg rounded-md"
        align="start"
      >
        <DatePicker
          selected={date}
          onChange={handleSelect}
          dateFormat="dd.MM.yyyy"
          maxDate={new Date()}
          locale="sr"
          inline
        />
      </PopoverContent>
    </Popover>
  );
}
