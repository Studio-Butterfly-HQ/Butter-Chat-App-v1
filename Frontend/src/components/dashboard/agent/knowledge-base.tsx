import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Earth, Code2, Plus, ArrowUpRight, Table, FileUp} from "lucide-react"
import { useState } from "react"
import { AddWebsiteDialog } from "./add-website-dialog"
import { UploadDocumentsDialog } from "./upload-documents-dialog"

export function KnowledgeBase() {
  const [openAddWebsiteDialog, setOpenAddWebsiteDialog] = useState(false)
  const [openUploadDocumentsDialog, setOpenUploadDocumentsDialog] = useState(false)

  return (
    <div className="p-4 pt-0 space-y-3">
      {/* Website */}
      <Card className="border border-border rounded-xl">
        <CardContent className="p-3.5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center  gap-3">
              <Earth className="h-6 w-6 shrink-0" />
              <div>
                <div className="font-medium text-primary">Website</div>
                <div className="text-sm text-muted-foreground">
                  Sync content from a public website.
                </div>
              </div>
            </div>

            <div className="flex w-full items-center gap-2 md:w-auto">
              <Button
                size="sm"
                className="rounded-full gap-2 w-full md:w-auto"
                onClick={() => setOpenAddWebsiteDialog(true)}
              >
                <Plus className="h-4 w-4" />
                Add website
              </Button>

              <AddWebsiteDialog
                open={openAddWebsiteDialog}
                onOpenChange={setOpenAddWebsiteDialog}
              />

              <Button
                size="icon"
                className="rounded-full h-9 w-9 px-4"
              >
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card className="border border-border rounded-xl">
        <CardContent className="p-3.5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <FileUp className="h-6 w-6 shrink-0" />
              <div>
                <div className="font-medium text-primary">Documents</div>
                <div className="text-sm text-muted-foreground">
                  Import content from documents that are not available publicly.
                </div>
              </div>
            </div>

            <div className="flex w-full items-center gap-2 md:w-auto">
              <Button
                size="sm"
                className="rounded-full gap-2 w-full md:w-auto"
                onClick={() => setOpenUploadDocumentsDialog(true)}
              >
                <Plus className="h-4 w-4" />
                Upload Document
              </Button>

              <UploadDocumentsDialog
                open={openUploadDocumentsDialog}
                onOpenChange={setOpenUploadDocumentsDialog}
              />

              <Button
                size="icon"
                className="rounded-full h-9 w-9 hidden md:flex"
              >
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <Card className="border border-border rounded-xl">
        <CardContent className="p-3.5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <Table className="h-6 w-6 shrink-0" />
              <div>
                <div className="font-medium text-primary">Form</div>
                <div className="text-sm text-muted-foreground">
                  Create and manage structured data forms for your AI agent.
                </div>
              </div>
            </div>

            <Button
              size="sm"
              variant="secondary"
              className="rounded-full gap-2 px-4 w-full md:w-auto"
            >
              Manage Forms
              <ArrowUpRight className="h-4 w-4 hidden md:block" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Snippets */}
      <Card className="border border-border rounded-xl">
        <CardContent className="p-3.5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <Code2 className="h-6 w-6 shrink-0" />
              <div>
                <div className="font-medium text-primary">Snippets</div>
                <div className="text-sm text-muted-foreground">
                  Add custom FAQs, answers or other snippets.
                </div>
              </div>
            </div>

            <Button
              size="sm"
              variant="secondary"
              className="rounded-full gap-2 px-4 w-full md:w-auto"
            >
              Manage Snippets
              <ArrowUpRight className="h-4 w-4 hidden md:block" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

