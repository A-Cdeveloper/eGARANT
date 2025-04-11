"use client";
import { useEffect, useSyncExternalStore } from "react";
import { toast } from "sonner";

export function useOnlineStatus() {
  const isOnline = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    if (isOnline) {
      toast("Onlline mode. Internet konekcija uspostavljena.", {
        duration: 3000,
        icon: "🌎",
      });
      console.log("Online");
    } else {
      toast("Offline mode. Proverite internet konekciju.", {
        duration: 3000,
        icon: "🚫",
      });
      console.log("Offline");
    }
  }, [isOnline]);

  return;
}

function getSnapshot() {
  return navigator.onLine;
}

// Server snapshot fallback (assume online or false)
function getServerSnapshot() {
  return true; // or false, depending on your default assumption
}

function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}
