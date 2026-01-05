"use client";
import { NetworkStatusPills } from "@/components/NetworkStatusPills";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { getQualityMode } from "@/lib/qualityMode";
import DataSaverBanner from "@/components/DataSaverBanner";
import AdaptiveImage from "@/components/AdaptiveImage";
import { NetworkSettingsModal } from "@/components/NetworkSettingsModal";

export default function Home() {
  const network = useNetworkStatus();
  const quality = getQualityMode(network);
  return (
    <main className="flex flex-col bg-zinc-100 min-h-screen relative">
      <header className="flex justify-between items-center px-8 py-6">
        <span className="text-blue-600 text-2xl font-bold">NetSense</span>
        <NetworkStatusPills networkStatus={network} />
      </header>
      {/* <div className="">
        <div className="flex justify-between items-center gap-4">
          <DataSaverBanner
            quality={quality}
            onOverride={() => console.log("clicked")}
          />
        </div>
        <div>
         
        </div>
      </div> */}
      <section className="p-12 flex flex-col gap-8 items-center">
        <h1 className="text-gray-900 font-bold text-5xl">NetSense</h1>
        <p className="text-gray-500 text-lg">
          A network-aware experience that adapts seamlessly to your connection
        </p>
        <button className="bg-violet-700 px-4 py-2 rounded-md cursor-pointer hover:bg-violet-500">
          Simulate Network Change
        </button>
      </section>
      <section className="py-8 px-4 flex flex-col gap-4">
        <h2 className="text-2xl text-gray-900 font-bold">About NetSense</h2>
        <p className="text-gray-500 text-lg">
          NetSense intelligently adjusts the user experience based on real-time
          network conditions. Whether you're browsing over Wi-Fi, 3G, or even
          with Data Saver enabled, NetSense ensures performance, image quality,
          and data usage are optimized without sacrificing usability. This
          project demonstrates adaptive frontend behaviour and graceful
          degradation for low-bandwidth environments, making it ideal for modern
          progressive web applications.{" "}
        </p>
      </section>
      <section className="flex items-center justify-center py-8">
        <AdaptiveImage
          low="/nature-low.jpg"
          medium="/nature-medium.jpg"
          high="/nature-high.jpg"
          alt="A beautiful landscape"
        />
      </section>
      <NetworkSettingsModal />
    </main>
  );
}
