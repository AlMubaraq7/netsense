import type { NetworkStatus } from "@/lib/qualityMode";

type Props = {
  networkStatus: NetworkStatus;
};

// EffectiveType pill component
function EffectiveTypePill({
  effectiveType,
}: {
  effectiveType: NetworkStatus["effectiveType"];
}) {
  const colorMap: Record<NetworkStatus["effectiveType"], string> = {
    "slow-2g": "bg-red-100/70 text-red-600",
    "2g": "bg-orange-100/70 text-orange-600",
    "3g": "bg-yellow-100/70 text-yellow-600",
    "4g": "bg-green-100/70 text-green-600",
  };

  const dotColorMap: Record<NetworkStatus["effectiveType"], string> = {
    "slow-2g": "bg-red-500",
    "2g": "bg-orange-500",
    "3g": "bg-yellow-500",
    "4g": "bg-green-500",
  };

  return (
    <div
      className={`px-4 py-1 rounded-full font-semibold text-base flex items-center gap-2 ${colorMap[effectiveType]} cursor-pointer`}
    >
      <div
        className={`relative flex h-2 w-2 rounded-full ${dotColorMap[effectiveType]}`}
      >
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full ${dotColorMap[effectiveType]} opacity-75`}
        ></span>
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${dotColorMap[effectiveType]}`}
        ></span>
      </div>
      {effectiveType.toUpperCase()}
    </div>
  );
}

// SaveData pill component
function SaveDataPill({ saveData }: { saveData: boolean }) {
  const colorClass = saveData
    ? "bg-purple-100/70 text-purple-600"
    : "bg-gray-100/70 text-gray-600";
  const dotColorClass = saveData ? "bg-purple-500" : "bg-gray-400";

  return (
    <div
      className={`px-4 py-1 rounded-full font-semibold text-base flex items-center gap-2 ${colorClass} cursor-pointer`}
    >
      <div className={`relative flex h-2 w-2 rounded-full ${dotColorClass}`}>
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full ${dotColorClass} opacity-75`}
        ></span>
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${dotColorClass}`}
        ></span>
      </div>
      {saveData ? "Data Saver On" : "Data Saver Off"}
    </div>
  );
}

// Online pill component
function OnlinePill({ online }: { online: boolean }) {
  const colorClass = online
    ? "bg-green-100/70 text-green-600"
    : "bg-red-100/70 text-red-600";
  const dotColorClass = online ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`px-4 py-1 rounded-full font-semibold text-base flex items-center gap-2 ${colorClass} cursor-pointer`}
    >
      <div className={`relative flex h-2 w-2 rounded-full ${dotColorClass}`}>
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full ${dotColorClass} opacity-75`}
        ></span>
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${dotColorClass}`}
        ></span>
      </div>
      {online ? "Online" : "Offline"}
    </div>
  );
}

// Connection Type pill component
function ConnectionTypePill({ type }: { type: NetworkStatus["type"] }) {
  const colorMap: Record<NetworkStatus["type"], string> = {
    cellular: "bg-blue-100/70 text-blue-600",
    wifi: "bg-indigo-100/70 text-indigo-600",
    ethernet: "bg-cyan-100/70 text-cyan-600",
    bluetooth: "bg-teal-100/70 text-teal-600",
    unknown: "bg-gray-100/70 text-gray-600",
  };

  const dotColorMap: Record<NetworkStatus["type"], string> = {
    cellular: "bg-blue-500",
    wifi: "bg-indigo-500",
    ethernet: "bg-cyan-500",
    bluetooth: "bg-teal-500",
    unknown: "bg-gray-400",
  };

  return (
    <div
      className={`px-4 py-1 rounded-full font-semibold text-base flex items-center gap-2 ${colorMap[type]} cursor-pointer`}
    >
      <div
        className={`relative flex h-2 w-2 rounded-full ${dotColorMap[type]}`}
      >
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full ${dotColorMap[type]} opacity-75`}
        ></span>
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${dotColorMap[type]}`}
        ></span>
      </div>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </div>
  );
}

// Main component that displays all network status pills
export function NetworkStatusPills({ networkStatus }: Props) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <EffectiveTypePill effectiveType={networkStatus.effectiveType} />
      <SaveDataPill saveData={networkStatus.saveData} />
      <OnlinePill online={networkStatus.online} />
      <ConnectionTypePill type={networkStatus.type} />
    </div>
  );
}
