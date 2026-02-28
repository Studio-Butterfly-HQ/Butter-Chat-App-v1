import { useState, memo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TableUpload from "@/components/dashboard/agent/documents/table-upload";
import { useUploadDocuments } from "@/provider/document/document.queries";
import type { FileWithPreview } from "@/hooks/use-file-upload";
import { Spinner } from "@/components/ui/spinner";
import { MAX_DOCUMENTS_UPLOAD } from "@/constants";

interface UploadDocumentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UploadDocumentsDialog = memo(function UploadDocumentsDialog({
  open,
  onOpenChange,
}: UploadDocumentsDialogProps) {
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const { mutateAsync, isPending } = useUploadDocuments();

  const handleSync = async () => {
    if (selectedFiles.length === 0) {
      return;
    }

    try {
      // Extract File objects from FileWithPreview (filter out FileMetadata)
      const files = selectedFiles
        .filter((f) => f.file instanceof File)
        .map((f) => f.file as File);

      if (files.length === 0) {
        return;
      }

      await mutateAsync(files);
      setSelectedFiles([]);
      onOpenChange(false);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-popover">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">Upload documents</DialogTitle>
          <DialogDescription className=" text-muted-foreground">
            Provide files and we’ll fetch all the text data inside.
          </DialogDescription>
        </DialogHeader>

        {/* File uploader */}
        <TableUpload
          maxFiles={MAX_DOCUMENTS_UPLOAD}
          maxSize={100 * 1024 * 1024} // 100MB
          accept=".pdf,.doc,.docx,.txt,.csv,.json,.md,.xml"
          multiple
          onFilesChange={setSelectedFiles}
          simulateUpload={false}
        />

        <DialogFooter className="flex gap-2 md:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-transparent"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSync}
            disabled={isPending || selectedFiles.length === 0}
          >
            {isPending ? (
              <>
                <Spinner />
                Uploading...
              </>
            ) : (
              "Upload"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
