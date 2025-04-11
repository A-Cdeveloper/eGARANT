"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export function useBlockNavigation(isDirty: boolean) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const pendingNavigation = useRef<null | (() => void)>(null);

  useEffect(() => {
    if (!isDirty) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        target.tagName === "A" &&
        target instanceof HTMLAnchorElement &&
        target.href &&
        !target.target &&
        !target.href.includes("#") &&
        target.origin === window.location.origin &&
        target.href !== window.location.href
      ) {
        e.preventDefault();

        const url = target.href.replace(target.origin, "");
        pendingNavigation.current = () => router.push(url);
        setShowModal(true);
      }
    };

    const handlePopState = () => {
      pendingNavigation.current = () => history.back(); // or store location if needed
      setShowModal(true);
    };

    window.addEventListener("popstate", handlePopState);
    document.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleClick);
    };
  }, [isDirty, router]);

  // Patch router.push
  useEffect(() => {
    if (!isDirty) return;

    const originalPush = router.push;

    router.push = (...args: Parameters<typeof router.push>) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [url] = args;
      pendingNavigation.current = () => originalPush(...args);
      setShowModal(true);
    };

    return () => {
      router.push = originalPush;
    };
  }, [isDirty, router]);

  const confirmNavigation = () => {
    const navigate = pendingNavigation.current;
    pendingNavigation.current = null;
    setShowModal(false);
    if (navigate) navigate();
  };

  const cancelNavigation = () => {
    pendingNavigation.current = null;
    setShowModal(false);
  };

  return {
    showModal,
    confirmNavigation,
    cancelNavigation,
  };
}
