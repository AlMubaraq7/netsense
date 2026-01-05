"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type ConnectionType = "2g" | "3g" | "4g" | "auto";
export type QualityType = "high" | "medium" | "low" | "auto";
export type NetworkStatusType = "online" | "offline";
export type ToggleType = "on" | "off";

export type NetworkSettings = {
  connection: ConnectionType;
  quality: QualityType;
  networkStatus: NetworkStatusType;
  dataSaver: ToggleType;
  forceFullExperience: ToggleType;
};

type NetworkSettingsContextType = {
  settings: NetworkSettings;
  updateSettings: (newSettings: Partial<NetworkSettings>) => void;
};

const defaultSettings: NetworkSettings = {
  connection: "auto",
  quality: "auto",
  networkStatus: "online",
  dataSaver: "off",
  forceFullExperience: "off",
};

const NetworkSettingsContext = createContext<
  NetworkSettingsContextType | undefined
>(undefined);

export function NetworkSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<NetworkSettings>(defaultSettings);

  // useCallback ????
  const updateSettings = (newSettings: Partial<NetworkSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <NetworkSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </NetworkSettingsContext.Provider>
  );
}

export function useNetworkSettings() {
  const context = useContext(NetworkSettingsContext);
  if (context === undefined) {
    throw new Error(
      "useNetworkSettings must be used within a NetworkSettingsProvider"
    );
  }
  return context;
}
