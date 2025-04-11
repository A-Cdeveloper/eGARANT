"use client";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

const InternetStatus = () => {
  useOnlineStatus();
  return null;
};

export default InternetStatus;
