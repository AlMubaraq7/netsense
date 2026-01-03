"use client";
import { NetworkStatusPills } from "@/components/NetworkStatusPills";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { getQualityMode } from "@/lib/qualityMode";
import DataSaverBanner from "@/components/DataSaverBanner";
import AdaptiveImage from "@/components/AdaptiveImage";

export default function Home() {
  const network = useNetworkStatus();
  const quality = getQualityMode(network);
  return (
    <main className="flex flex-col bg-zinc-100">
      <nav className="flex justify-between items-center px-8 py-6">
        <span className="text-blue-600 text-2xl font-bold">NetSense</span>
        <NetworkStatusPills networkStatus={network} />
      </nav>
      <div className="">
        <div className="flex justify-between items-center gap-4">
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
