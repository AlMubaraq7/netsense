import { Quality } from "@/lib/qualityMode";

type Props = {
  quality: Quality;
};

const colorMap: Record<Quality, string> = {
  high: "bg-green-100/70 text-green-400",
  medium: "bg-yellow-400",
  low: "bg-orange-400",
  offline: "bg-red-100/70 text-red-400",
};

const dotColorMap: Record<Quality, string> = {
  high: "bg-green-400",
  medium: "bg-yellow-400",
  low: "bg-orange-400",
  offline: "bg-red-500",
};

export function NetworkStatusPill({ quality }: Props) {
  return (
    <div
      className={`px-4 py-1 rounded-full font-semibold text-base flex items-center gap-2 ${colorMap[quality]} cursor-pointer`}
    >
      <div
        className={`relative flex h-2 w-2 rounded-full ${dotColorMap[quality]}`}
      >
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full ${dotColorMap[quality]} opacity-75`}
        ></span>
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${dotColorMap[quality]}`}
        ></span>
      </div>
      {quality.charAt(0).toUpperCase() + quality.slice(1)}
    </div>
  );
}
