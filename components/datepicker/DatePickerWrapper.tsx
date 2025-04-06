"use client";

import { useState } from "react";
import { DatePicker } from "./DatePicker";
import { Input } from "../ui/input";

export function DatePickerWrapper() {
  const [selected, setSelected] = useState<Date>();

  return (
    <>
      <Input type="hidden" name="date" value={selected?.toISOString() ?? ""} />
      <DatePicker value={selected} onChange={setSelected} />
    </>
  );
}
