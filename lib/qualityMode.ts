export type NetworkStatus = {
  effectiveType: "slow-2g" | "2g" | "3g" | "4g";
  saveData: boolean;
  online: boolean;
  type: "cellular" | "wifi" | "ethernet" | "bluetooth" | "unknown";
};

export type Quality = "offline" | "low" | "medium" | "high"; // gauge svg

export function getQualityMode(networkStatus: NetworkStatus): Quality {
  if (!networkStatus.online) return "offline";
  if (
    networkStatus.saveData ||
    networkStatus.effectiveType === "slow-2g" ||
    networkStatus.effectiveType === "2g"
  )
    return "low";
  if (networkStatus.effectiveType === "3g") return "medium";
  return "high";
}
