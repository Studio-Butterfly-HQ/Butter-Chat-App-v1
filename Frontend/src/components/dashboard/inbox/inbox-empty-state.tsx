import { PiChats } from "react-icons/pi";

export function InboxEmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
      <div className="flex -space-x-2">
        <PiChats size={40} />
      </div>
      <p className="text-muted-foreground">
        There are no conversations in this view
      </p>
    </div>
  );
}
