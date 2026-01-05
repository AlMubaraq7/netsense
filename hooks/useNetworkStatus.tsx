import { useState, useEffect, useMemo } from "react";
import type { NetworkStatus } from "@/lib/qualityMode";
import { useNetworkSettings } from "@/contexts/NetworkSettingsContext";

export function useNetworkStatus(): NetworkStatus {
  const { settings } = useNetworkSettings();
  const [realNetwork, setRealNetwork] = useState<NetworkStatus>({
    effectiveType: "4g",
    saveData: false,
    online: true,
  });

  useEffect(() => {
    const updateStatus = () => {
      setRealNetwork({
        effectiveType: (navigator as any).connection?.effectiveType || "4g",
        saveData: (navigator as any).connection?.saveData || false,
        online: navigator.onLine,
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

  // Merge manual settings with real network status
  // When settings are "auto", use the real network values
  const network = useMemo<NetworkStatus>(() => {
    let effectiveType: NetworkStatus["effectiveType"] =
      realNetwork.effectiveType;

    // Map connection setting to effectiveType
    if (settings.connection !== "auto") {
      effectiveType = settings.connection;
    }

    // Map networkStatus setting
    const online =
      settings.networkStatus === "online"
        ? true
        : settings.networkStatus === "offline"
        ? false
        : realNetwork.online;

    // Map dataSaver setting
    const saveData =
      settings.dataSaver === "on"
        ? true
        : settings.dataSaver === "off"
        ? false
        : realNetwork.saveData;

    return {
      effectiveType,
      saveData,
      online,
    };
  }, [realNetwork, settings]);

  return network;
}
