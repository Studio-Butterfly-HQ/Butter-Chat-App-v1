import { Agent } from "@/provider/agent/agent.types";
import { useUpdateAgent } from "@/provider/agent/agent.queries";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  fallbackSchema,
  FallbackFormValues,
} from "@/schemas/configureAgentSchema";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertCircle, Check, X } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch2 } from "@/components/ui/switch2";
import { useEffect } from "react";

interface FallbackFormProps {
  selectedAgent?: Agent;
  onToggle: () => void;
}

export const FallbackForm = ({
  selectedAgent,
  onToggle,
}: FallbackFormProps) => {
  const form = useForm<FallbackFormValues>({
    resolver: zodResolver(fallbackSchema),
    defaultValues: {
      aiFallback: "message",
      aiFallbackCustom: "",
      aiFallbackWait: false,
    },
    mode: "onChange",
  });

  const { reset, control, handleSubmit } = form;
  const { mutateAsync: updateAgent, isPending } = useUpdateAgent();

  useEffect(() => {
    if (selectedAgent) {
      reset({
        aiFallback: selectedAgent.choice_when_unable as "transfer" | "message",
        aiFallbackCustom: selectedAgent.transfer_connecting_message,
        aiFallbackWait: selectedAgent.auto_transfer === "disabled",
      });
    }
  }, [selectedAgent, reset]);

  const onSubmit = async (data: FallbackFormValues) => {
    if (!selectedAgent) return;
    try {
      await updateAgent({
        id: selectedAgent.id,
        payload: {
          choice_when_unable: data.aiFallback,
          transfer_connecting_message: data.aiFallbackCustom,
          auto_transfer: data.aiFallbackWait ? "disabled" : "enabled",
        },
      });
    } catch (error) {
      console.log("Error updating fallback form: ", error);
    }
  };

  const handleCancel = () => {
    if (selectedAgent) {
      reset({
        aiFallback: selectedAgent.choice_when_unable as "transfer" | "message",
        aiFallbackCustom: selectedAgent.transfer_connecting_message,
        aiFallbackWait: selectedAgent.auto_transfer === "disabled",
      });
    }
    onToggle();
  };

  return (
    <AccordionItem
      value="ai-unable"
      className="border border-border rounded-xl"
    >
      <AccordionTrigger className="hover:no-underline p-4">
        <div className="flex items-center gap-4">
          <AlertCircle className="h-6 w-6" />
          <div className="text-left">
            <div className="font-medium text-foreground">
              If AI agent is unable to assist user
            </div>
            <div className="text-sm text-muted-foreground">
              Choose what happens when the AI agent is unable to help the
              customer.
            </div>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="border-t border-border p-4 space-y-4">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={control}
              name="aiFallback"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-muted-foreground">
                    If AI agent is unable to assist user
                  </Label>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full h-10">
                      <SelectValue placeholder="Select fallback behavior" />
                    </SelectTrigger>

                    <SelectContent
                      position="popper"
                      sideOffset={4}
                      className="max-w-full"
                      avoidCollisions={false}
                    >
                      <SelectItem value="message">
                        Show custom message only
                      </SelectItem>
                      <SelectItem value="transfer">
                        Transfer customer to first available agent or put into
                        queue
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="aiFallbackCustom"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-muted-foreground">
                    Custom Instructions
                  </Label>
                  <Textarea
                    {...field}
                    className="min-h-[120px] bg-transparent"
                    placeholder="Define fallback behavior..."
                  />
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="aiFallbackWait"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                  <div className="space-y-0.5">
                    <Label>
                      Wait for customer confirmation before transferring
                    </Label>
                  </div>
                  <Switch2 checked={field.value} onChange={field.onChange} />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <Button size="sm" type="submit" disabled={isPending}>
                {isPending ? (
                  <Spinner className="h-4 w-4" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                type="button"
                onClick={handleCancel}
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </AccordionContent>
    </AccordionItem>
  );
};
