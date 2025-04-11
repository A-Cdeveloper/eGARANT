"use client";

import { useState } from "react";
import { DatePicker } from "./DatePicker";
import { Input } from "../ui/input";

export function DatePickerWrapper({
  defaultValue,
  setIsDirty,
}: {
  defaultValue?: Date;
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [selected, setSelected] = useState<Date | undefined>(
    defaultValue ?? undefined
  );

  return (
    <>
      <Input
        type="hidden"
        name="date"
        value={selected?.toISOString() ?? ""}
        onChange={() => setIsDirty(true)}
      />
      <DatePicker value={selected} onChange={setSelected} />
    </>
  );
}
