import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { toast } from "sonner";
import { FRONTEND_BASE_URL } from "@/constants/api";

interface ShareAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShareAgentDialog({
  open,
  onOpenChange,
}: ShareAgentDialogProps) {
  const [isCopied, setIsCopied] = useState(false);
  const company = useAppSelector((state) => state.auth.company);

  const shareUrl = `${FRONTEND_BASE_URL}/chat/${company?.id || ""}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text-primary">
            Share Test Link
          </DialogTitle>
          <DialogDescription>
            Share this link to let others test your AI agent.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 relative flex items-center">
          <Input
            value={shareUrl}
            readOnly
            className="pr-10 bg-muted/50 border-border"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute p-2 right-0 h-9 w-9 text-muted-foreground hover:bg-transparent hover:text-primary"
            onClick={copyToClipboard}
          >
            {isCopied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only">Copy link</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
