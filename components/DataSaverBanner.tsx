type Props = {
  quality: string;
  onOverride: () => void;
};

export default function DataSaverBanner({ quality, onOverride }: Props) {
  //   if (quality !== "low") return null;

  return (
    <div className="bg-yellow-100 text-yellow-800 p-3 rounded mb-4 flex  gap-4 items-center text-sm">
      <span>🟡 Data Saver Active — loading light mode</span>
      <button className="underline" onClick={onOverride}>
        Force full experience
      </button>
    </div>
  );
}
