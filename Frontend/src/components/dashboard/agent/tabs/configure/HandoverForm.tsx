import { Agent } from "@/provider/agent/agent.types";
import { useUpdateAgent } from "@/provider/agent/agent.queries";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  handoverSchema,
  HandoverFormValues,
} from "@/schemas/configureAgentSchema";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BadgeCheck, Check, X } from "lucide-react";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface HandoverFormProps {
  selectedAgent?: Agent;
  onToggle: () => void;
}

export const HandoverForm = ({
  selectedAgent,
  onToggle,
}: HandoverFormProps) => {
  const form = useForm<HandoverFormValues>({
    resolver: zodResolver(handoverSchema),
    defaultValues: {
      humanTransferMessage: "",
    },
    mode: "onChange",
  });

  const { reset, control, handleSubmit } = form;
  const { mutateAsync: updateAgent } = useUpdateAgent();

  useEffect(() => {
    if (selectedAgent) {
      reset({
        humanTransferMessage: selectedAgent.conversation_pass_instructions,
      });
    }
  }, [selectedAgent, reset]);

  const onSubmit = async (data: HandoverFormValues) => {
    if (!selectedAgent) return;
    try {
      await updateAgent({
        id: selectedAgent.id,
        payload: { conversation_pass_instructions: data.humanTransferMessage },
      });
    } catch (error) {
      console.error("Error updating handover form: ", error);
    }
  };
  const handleCancel = () => {
    if (selectedAgent) {
      reset({
        humanTransferMessage: selectedAgent.conversation_pass_instructions,
      });
    }
    onToggle();
  };

  return (
    <AccordionItem
      value="human-agent"
      className="border border-border rounded-xl"
    >
      <AccordionTrigger className="hover:no-underline p-4">
        <div className="flex items-center gap-4">
          <BadgeCheck className="h-6 w-6" />
          <div className="text-left">
            <div className="font-medium text-foreground">
              If customer asks to speak to a human agent
            </div>
            <div className="text-sm font-normal text-muted-foreground">
              Transfer customer to the first available agent or put them into a
              queue.
            </div>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-4 border-t border-border space-y-4">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={control}
              name="humanTransferMessage"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-muted-foreground">
                    Transfer Message
                  </Label>
                  <Textarea
                    {...field}
                    placeholder="Define transfer behavior..."
                    className="bg-transparent border-border min-h-[100px]"
                  />
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button size="sm" type="submit">
                <Check className="h-4 w-4" />
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent"
                type="button"
                onClick={handleCancel}
              >
                <X className="h-4 w-4" /> Cancel
              </Button>
            </div>
          </form>
        </Form>
      </AccordionContent>
    </AccordionItem>
  );
};
