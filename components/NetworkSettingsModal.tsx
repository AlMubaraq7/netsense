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
  const { settings, updateSettings, isModalOpen, toggleModal } =
    useNetworkSettings();

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking the backdrop itself, not the modal content
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

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

  if (!isModalOpen) return null;

  return (
    <div
      className="w-full h-full backdrop-blur-[5px] absolute flex justify-center items-center"
      onClick={handleBackdropClick}
    >
      <div
        className="max-h-[90vh] w-[500px] shadow-sm shadow-gray-900/50 rounded-md p-8 bg-gray-100 text-black relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={toggleModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

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
