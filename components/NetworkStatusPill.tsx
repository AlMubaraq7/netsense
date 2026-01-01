import { Quality } from "@/lib/qualityMode";

type Props = {
  quality: Quality;
};

const colorMap: Record<Quality, string> = {
  high: "bg-green-500",
  medium: "bg-yellow-400",
  low: "bg-orange-400",
  offline: "bg-red-500",
};

export function NetworkStatusPill({ quality }: Props) {
  return (
    <div className={`px-3 py-1 rounded-full text-white ${colorMap[quality]}`}>
      {quality.toUpperCase()}
    </div>
  );
}
