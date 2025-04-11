"use client";

import { useState } from "react";
import { DatePicker } from "./DatePicker";
import { Input } from "../ui/input";

export function DatePickerWrapper({
  defaultValue,
  setIsDirty,
}: {
  defaultValue: Date;
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [selected, setSelected] = useState<Date | undefined>(defaultValue);

  return (
    <>
      <Input type="hidden" name="date" value={selected?.toISOString() ?? ""} />
      <DatePicker
        value={selected}
        onChange={() => {
          setIsDirty(true);
          setSelected(undefined);
        }}
      />
    </>
  );
}
