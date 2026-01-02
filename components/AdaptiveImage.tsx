"use client";
import Image from "next/image";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";

type Props = {
  low: string;
  medium: string;
  high: string;
  alt: string;
};

export default function AdaptiveImage({ low, medium, high, alt }: Props) {
  const { online, effectiveType } = useNetworkStatus();
  let src = high;
  if (!online) {
    src = low;
  } else {
    switch (effectiveType) {
      case "slow-2g":
      case "2g":
        src = low;
        break;
      case "3g":
        src = medium;
        break;
      case "4g":
      default:
        src = high;
    }
  }
  return <Image src={src} alt={alt} width={600} height={400} />;
}
