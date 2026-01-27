import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Earth, Code2, Plus, ArrowUpRight, Table, FileUp} from "lucide-react"
import { useState } from "react"
import { AddWebsiteDialog } from "./add-website-dialog"

export function KnowledgeBase() {
  const [open, setOpen] = useState(false)
  return (
    <div className="p-4 pt-0 space-y-3">
      {/* Website */}
      <Card className="border border-border rounded-xl">
        <CardContent className="flex items-center justify-between p-3.5">
          <div className="flex items-center gap-4">
              <Earth  className="h-6 w-6" />
            <div>
              <div className="font-medium text-primary">Website</div>
              <div className="text-sm font-normal text-muted-foreground">
                Sync content from a public website.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="rounded-full gap-2 px-4"
              onClick={() => setOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Add website
            </Button>
            <AddWebsiteDialog open={open} onOpenChange={setOpen} />
            <Button
              size="icon"
              className="rounded-full h-9 w-9"
            >
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card className="border border-border rounded-xl">
        <CardContent className="flex items-center justify-between p-3.5">
          <div className="flex items-center gap-4">
              <FileUp  className="h-6 w-6" />
            <div>
              <div className="font-medium text-primary">Documents</div>
              <div className="text-sm font-normal text-muted-foreground">
                Import content from documents that are not available publicly.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" className="rounded-full gap-2 px-4">
              <Plus className="h-4 w-4" />
              Upload Document
            </Button>
            <Button size="icon" className="rounded-full h-9 w-9">
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <Card className="border border-border rounded-xl">
        <CardContent className="flex items-center justify-between p-3.5">
          <div className="flex items-center gap-4">
              <Table  className="h-6 w-6 " />
            <div>
              <div className="font-medium text-primary">Form</div>
              <div className="text-sm font-normal text-muted-foreground">
                Create and manage structured data forms for your AI agent.
              </div>
            </div>
          </div>

          <Button size="sm" variant="secondary" className="rounded-full gap-2 px-4">
            Manage Forms
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Snippets */}
      <Card className="border border-border rounded-xl">
        <CardContent className="flex items-center justify-between p-3.5">
          <div className="flex items-center gap-4">
              <Code2 className="h-6 w-6" />
            <div>
              <div className="font-medium text-primary">Snippets</div>
              <div className="text-sm font-normal text-muted-foreground">
                Add custom FAQs, answers or other snippets.
              </div>
            </div>
          </div>

          <Button size="sm" variant="secondary" className="rounded-full gap-2 px-4">
            Manage Snippets
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
