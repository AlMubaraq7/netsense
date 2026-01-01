import { useState, useEffect } from "react";
import type { NetworkStatus } from "@/lib/qualityMode";

export function useNetworkStatus(): NetworkStatus {
  const [network, setNetwork] = useState<NetworkStatus>({
    effectiveType: "4g",
    saveData: false,
    online: true,
    type: "unknown",
  });

  useEffect(() => {
    const updateStatus = () => {
      setNetwork({
        effectiveType: (navigator as any).connection?.effectiveType || "4g",
        saveData: (navigator as any).connection?.saveData || false,
        online: navigator.onLine,
        type: (navigator as any).connection?.type || "unknown",
      });
    };
    updateStatus();
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);
    (navigator as any).connection?.addEventListener("change", updateStatus);

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
      (navigator as any).connection?.removeEventListener(
        "change",
        updateStatus
      );
    };
  }, []);

  // useEffect(() => {
  //   console.log("Current network state:", network);
  // }, [network]);

  return network;
}
