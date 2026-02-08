import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteWeburi } from "@/provider/weburi/weburi.queries";
import type { Weburi } from "@/provider/weburi/weburi.types";

interface DeleteWebsiteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  weburi: Weburi | null;
}

export function DeleteWebsiteDialog({
  open,
  onOpenChange,
  weburi,
}: DeleteWebsiteDialogProps) {
  const { mutateAsync: deleteWeburi, isPending: isDeleting } =
    useDeleteWeburi();

  const handleConfirmDelete = async () => {
    if (weburi) {
      try {
        await deleteWeburi(weburi.id);
        onOpenChange(false);
      } catch (error) {
        console.error("Error in deleting website: ", error);
      }
    }
  };

  // Extract domain name from URI for display
  const getDomainName = (uri: string) => {
    try {
      const url = new URL(uri);
      return url.hostname.replace("www.", "");
    } catch {
      return uri;
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-popover max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-medium">
            Delete Website
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-semibold">
              "{weburi ? getDomainName(weburi.uri) : ""}"
            </span>
            ? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting} className="bg-transparent">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
