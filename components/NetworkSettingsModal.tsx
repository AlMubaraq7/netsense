"use client";

import { useEffect } from "react";
import {
  useNetworkSettings,
  type ConnectionType,
  type QualityType,
  type NetworkStatusType,
  type ToggleType,
} from "@/contexts/NetworkSettingsContext";

export function NetworkSettingsModal() {
  const { settings, updateSettings } = useNetworkSettings();

  const isConnectionDisabled = settings.quality === "auto";
  const isForceFullExpEnabled = settings.forceFullExperience === "on";
  const isDataSaverEnabled = settings.dataSaver === "on";
  const disableIfDataSaverIsEnabled = (val: QualityType): boolean => {
    if (isDataSaverEnabled && val === "high") {
      return true;
    }
    return false;
  };

  // Automatically set quality to "high" when forceFullExperience is enabled
  useEffect(() => {
    if (isForceFullExpEnabled && settings.quality !== "high") {
      updateSettings({ quality: "high" });
    }
    if (isDataSaverEnabled && settings.quality === "high") {
      updateSettings({ quality: "medium" });
    }
  }, [
    isForceFullExpEnabled,
    isDataSaverEnabled,
    settings.quality,
    updateSettings,
  ]);

  const handleConnectionChange = (value: ConnectionType) => {
    updateSettings({ connection: value });
  };

  const handleQualityChange = (value: QualityType) => {
    updateSettings({ quality: value });
  };

  const handleNetworkStatusChange = (value: NetworkStatusType) => {
    updateSettings({ networkStatus: value });
  };

  const handleDataSaverChange = (value: ToggleType) => {
    updateSettings({ dataSaver: value });
  };

  const handleForceFullExperienceChange = (value: ToggleType) => {
    if (value === "on") {
      // When enabling force full experience, also set quality to "high"
      updateSettings({ forceFullExperience: value, quality: "high" });
    } else {
      updateSettings({ forceFullExperience: value });
    }
  };

  return (
    <div className="w-full h-full backdrop-blur-[0px] absolute flex justify-center items-center">
      <div className="max-h-[90vh] w-[500px] shadow-sm shadow-gray-900/50 rounded-md p-8 bg-gray-100 text-black">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Network Settings
        </h2>

        <div className="space-y-6 *:space-y-2">
          {/* Connection Type */}
          <div className="">
            <label className="text-sm font-semibold text-gray-700 block">
              Connection
            </label>
            <div className="flex flex-wrap gap-4">
              {(["2g", "3g", "4g", "auto"] as ConnectionType[]).map((value) => (
                <label
                  key={value}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="connection"
                    value={value}
                    checked={settings.connection === value}
                    disabled={isConnectionDisabled}
                    onChange={(e) =>
                      handleConnectionChange(e.target.value as ConnectionType)
                    }
                    className="w-4 h-4 text-violet-600 focus:ring-violet-500"
                  />
                  <span className="text-gray-700 capitalize">{value}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Quality */}
          <div className="">
            <label className="text-sm font-semibold text-gray-700 block">
              Quality
            </label>
            <div className="flex flex-wrap gap-4">
              {(["high", "medium", "low", "auto"] as QualityType[]).map(
                (value) => (
                  <label
                    key={value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="quality"
                      value={value}
                      checked={settings.quality === value}
                      onChange={(e) =>
                        handleQualityChange(e.target.value as QualityType)
                      }
                      disabled={
                        isForceFullExpEnabled ||
                        disableIfDataSaverIsEnabled(value)
                      }
                      className="w-4 h-4 text-violet-600 focus:ring-violet-500"
                    />
                    <span className="text-gray-700 capitalize">{value}</span>
                  </label>
                )
              )}
            </div>
          </div>

          {/* Network Status */}
          <div className="">
            <label className="text-sm font-semibold text-gray-700 block">
              Network Status
            </label>
            <div className="flex flex-wrap gap-4">
              {(["online", "offline"] as NetworkStatusType[]).map((value) => (
                <label
                  key={value}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="networkStatus"
                    value={value}
                    checked={settings.networkStatus === value}
                    onChange={(e) =>
                      handleNetworkStatusChange(
                        e.target.value as NetworkStatusType
                      )
                    }
                    className="w-4 h-4 text-violet-600 focus:ring-violet-500"
                  />
                  <span className="text-gray-700 capitalize">{value}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Data Saver */}
          <div className="">
            <label className="text-sm font-semibold text-gray-700 block">
              Data Saver
            </label>
            <div className="flex flex-wrap gap-4">
              {(["on", "off"] as ToggleType[]).map((value) => (
                <label
                  key={value}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="dataSaver"
                    value={value}
                    checked={settings.dataSaver === value}
                    onChange={(e) =>
                      handleDataSaverChange(e.target.value as ToggleType)
                    }
                    disabled={isForceFullExpEnabled}
                    className="w-4 h-4 text-violet-600 focus:ring-violet-500"
                  />
                  <span className="text-gray-700 capitalize">{value}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Force Full Experience */}
          <div className="">
            <label className="text-sm font-semibold text-gray-700 block">
              Force Full Experience
            </label>
            <div className="flex flex-wrap gap-4">
              {(["on", "off"] as ToggleType[]).map((value) => (
                <label
                  key={value}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="forceFullExperience"
                    value={value}
                    checked={settings.forceFullExperience === value}
                    onChange={(e) =>
                      handleForceFullExperienceChange(
                        e.target.value as ToggleType
                      )
                    }
                    disabled={isDataSaverEnabled}
                    className="w-4 h-4 text-violet-600 focus:ring-violet-500"
                  />
                  <span className="text-gray-700 capitalize">{value}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
