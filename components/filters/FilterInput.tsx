"use client";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce"; // Import the hook

const FilterInput = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("filter") || "");

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString());
    if (debouncedQuery) {
      params.set("filter", debouncedQuery);
    } else {
      params.delete("filter");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  }, [debouncedQuery, router, searchParams]);

  return (
    <Input
      type="search"
      placeholder="Pretraga računa..."
      className="bg-white"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default FilterInput;
