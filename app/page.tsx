"use client";
import { NetworkStatusPill } from "@/components/NetworkStatusPill";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { getQualityMode } from "@/lib/qualityMode";
import DataSaverBanner from "@/components/DataSaverBanner";
import AdaptiveImage from "@/components/AdaptiveImage";

export default function Home() {
  const network = useNetworkStatus();
  const quality = getQualityMode(network);
  return (
    <main>
      <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans">
        <div className="flex justify-between items-center gap-4">
          <NetworkStatusPill quality={quality} />
          <DataSaverBanner
            quality={quality}
            onOverride={() => console.log("clicked")}
          />
        </div>
        <div>
          <AdaptiveImage
            low="/nature-low.jpg"
            medium="/nature-medium.jpg"
            high="/nature-high.jpg"
            alt="A beautiful landscape"
          />
        </div>
      </div>
    </main>
  );
}
