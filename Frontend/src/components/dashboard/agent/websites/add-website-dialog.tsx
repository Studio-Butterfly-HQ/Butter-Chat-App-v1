import { memo } from "react";
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
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  addWebsiteSchema,
  AddWebsiteFormValues,
} from "@/schemas/addWebsiteSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateWeburi } from "@/provider/weburi/weburi.queries";

interface AddWebsiteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddWebsiteDialog = memo(function AddWebsiteDialog({
  open,
  onOpenChange,
}: AddWebsiteDialogProps) {
  const { mutateAsync, isPending } = useCreateWeburi();

  const form = useForm<AddWebsiteFormValues>({
    resolver: zodResolver(addWebsiteSchema),
    defaultValues: {
      uri: "",
    },
    mode: "onChange",
  });

  // const { watch, setValue } = form;
  // const scanOption = watch("scanOption");

  const handleSubmit = async (data: AddWebsiteFormValues) => {
    try {
      await mutateAsync({ uri: data.uri });
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Create weburi error:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-popover">
        <DialogHeader>
          <DialogTitle className="text-xl text-primary">
            Add Website
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter the URL of the site you want to sync.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="space-y-4 mt-2">
              {/* Website URL */}
              <FormField
                control={form.control}
                name="uri"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-primary">
                      Website URL <span className="text-red-500">*</span>
                    </FormLabel>
                    <Input {...field} placeholder="https://domainname.com" />
                    <p className="text-sm text-muted-foreground">
                      Only publicly accessible URLs are supported.
                    </p>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />

              {/* Scan Options */}
              {/* <FormField
                control={form.control}
                name="scanOption"
                render={() => (
                  <FormItem className="space-y-3">
                    <RadioGroup
                      value={scanOption}
                      onValueChange={(value) =>
                        setValue("scanOption", value as "child-pages" | "all-pages" | "specified-url")
                      }
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem
                          value="child-pages"
                          id="child-pages"
                        />
                        <Label
                          htmlFor="child-pages"
                          className="font-normal text-muted-foreground"
                        >
                          Scan only child pages of specified url
                        </Label>
                      </div>

                      <div className="flex items-center gap-3">
                        <RadioGroupItem
                          value="all-pages"
                          id="all-pages"
                        />
                        <Label
                          htmlFor="all-pages"
                          className="font-normal text-muted-foreground"
                        >
                          Scan all pages of specified url
                        </Label>
                      </div>

                      <div className="flex items-center gap-3">
                        <RadioGroupItem
                          value="specified-url"
                          id="specified-url"
                        />
                        <Label
                          htmlFor="specified-url"
                          className="font-normal text-muted-foreground"
                        >
                          Scan only specified url
                        </Label>
                      </div>
                    </RadioGroup>
                    <FormMessage className="text-sm"/>
                  </FormItem>
                )}
              /> */}

              {/* Advanced Options */}
              {/* <Accordion type="single" collapsible>
                <AccordionItem
                  value="advanced"
                  className="border-none"
                >
                  <AccordionTrigger className="hover:no-underline">
                    Advanced options
                  </AccordionTrigger>

                  <AccordionContent className="space-y-4 border-t pt-4 pb-2 border-border">
                    <FormField
                      control={form.control}
                      name="cssSelector"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>
                            Content CSS selector
                          </FormLabel>
                          <Input
                            {...field}
                            placeholder="main:content"
                          />
                          <p className="text-sm text-muted-foreground">
                            When specified, only content inside this
                            selector will be extracted.
                          </p>
                          <FormMessage className="text-sm" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="excludeSelectors"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>
                            CSS selectors to exclude
                          </FormLabel>
                          <Input
                            {...field}
                            placeholder="footer, nav, .sidebar"
                          />
                          <p className="text-sm text-muted-foreground">
                            Add a list of CSS selectors you want to
                            ignore.
                          </p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion> */}
            </div>

            <DialogFooter className="flex gap-2 md:gap-0 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="bg-transparent"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Syncing..." : "Sync"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});
