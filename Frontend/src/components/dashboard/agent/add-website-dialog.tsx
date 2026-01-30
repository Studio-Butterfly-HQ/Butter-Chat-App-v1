import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { useState } from "react"

interface AddWebsiteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddWebsiteDialog({
  open,
  onOpenChange,
}: AddWebsiteDialogProps) {
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [scanOption, setScanOption] = useState("child-pages")
  const [cssSelector, setCssSelector] = useState("")
  const [excludeSelectors, setExcludeSelectors] = useState("")

  const handleSync = () => {
    // API call here
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-popover">
        <DialogHeader>
          <DialogTitle className="text-xl text-primary">Add Website</DialogTitle>
          <DialogDescription className=" text-muted-foreground">
            Enter the URL of the site you want to sync.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 mt-2">
          <div className="space-y-2">
            <Label>
              Website URL <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="https://domainname.com"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className="h-10"
            />
            <p className="text-sm text-muted-foreground">
              Only publicly accessible URLs are supported.
            </p>
          </div>

          <div className="space-y-3">
            <RadioGroup value={scanOption} onValueChange={setScanOption}>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="child-pages" id="child-pages" />
                <Label htmlFor="child-pages" className="font-normal text-muted-foreground">
                  Scan only child pages of specified url
                </Label>
              </div>

              <div className="flex items-center   gap-3">
                <RadioGroupItem value="all-pages" id="all-pages" />
                <Label htmlFor="all-pages" className="font-normal text-muted-foreground">
                  Scan all pages of specified url
                </Label>
              </div>

              <div className="flex items-center gap-3">
                <RadioGroupItem value="specified-url" id="specified-url" />
                <Label htmlFor="specified-url" className=" font-normal text-muted-foreground">
                  Scan only specified url
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Accordion type="single"  collapsible>
            <AccordionItem value="advanced" className="border-none">
              <AccordionTrigger className="hover:no-underline">
                Advanced options
              </AccordionTrigger>
              <AccordionContent className="space-y-4 border-t pt-4 pb-2 border-border ">
                <div className="space-y-2">
                  <Label>Content CSS selector</Label>
                  <Input
                    placeholder="main:content"
                    value={cssSelector}
                    onChange={(e) => setCssSelector(e.target.value)}
                  />
                </div>
                  <p className="text-sm text-muted-foreground">When specified, only content inside this selector will be extracted.</p>
                <div className="space-y-2">
                  <Label>CSS selectors to exclude</Label>
                  <Input
                    placeholder="footer, nav, .sidebar"
                    value={excludeSelectors}
                    onChange={(e) => setExcludeSelectors(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">Add a list of CSS selectors you want to ignore.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <DialogFooter className="flex gap-2 md:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-transparent"
          >
            Cancel
          </Button>
          <Button onClick={handleSync}>Sync</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
