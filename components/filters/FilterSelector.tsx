"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const FilterSelector = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("sort", value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className=" bg-white">
        <SelectValue placeholder="Sortiraj" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectItem value="invoice_date-desc">
          Datum opadajuci(default)
        </SelectItem>
        <SelectItem value="invoice_date-asc">Datum rastuci</SelectItem>
        {/* <SelectItem value="amount-asc">Cena rastuci</SelectItem>
        <SelectItem value="amount-desc">Cena opadajuci</SelectItem> */}
      </SelectContent>
    </Select>
  );
};

export default FilterSelector;
