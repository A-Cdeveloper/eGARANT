"use client";

import { useRouter } from "next/navigation";

const BackButton = ({ to }: { to?: string | number }) => {
  const router = useRouter();

  return (
    <div className="mb-4">
      <button
        onClick={() => (to ? router.push(to as string) : router.back())}
        className="border-transparent text-primary hover:text-secondary cursor-pointer"
      >
        ← Nazad
      </button>
    </div>
  );
};

export default BackButton;
