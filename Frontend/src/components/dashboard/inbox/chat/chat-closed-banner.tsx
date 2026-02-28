import { Info } from "lucide-react";

export default function ChatClosedBanner() {
  return (
    <div className="p-4 pt-0">
      <div className="flex flex-row bg-card items-center justify-center gap-2 border border-border rounded-2xl p-4 min-h-[137px]">
        <Info className="h-5 w-5 text-muted-foreground" />
        <p className="text-sm font-medium text-muted-foreground">
          This chat has been closed
        </p>
      </div>
    </div>
  );
}
