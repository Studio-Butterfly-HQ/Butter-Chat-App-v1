import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import TableUpload from '@/components/dashboard/agent/table-upload'

interface UploadDocumentsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UploadDocumentsDialog({ open, onOpenChange }: UploadDocumentsDialogProps) {


  const handleSync = () => {
    // API call here

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-popover">
        <DialogHeader>
          <DialogTitle>Upload documents</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Provide files and we’ll fetch all the text data inside.
          </DialogDescription>
        </DialogHeader>

        {/* File uploader */}
        <TableUpload
          maxFiles={10}
          maxSize={40 * 1024 * 1024} // 40MB
          accept=".pdf,.doc,.docx,.txt,.csv,.json,.md,.xml"
          multiple
        />

        <DialogFooter className="flex gap-2 md:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-transparent"
          >
            Cancel
          </Button>
          <Button onClick={handleSync}>
            Sync
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
