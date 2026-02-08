import { Agent } from "@/provider/agent/agent.types";
import { useUpdateAgent } from "@/provider/agent/agent.queries";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  instructionsSchema,
  InstructionsFormValues,
} from "@/schemas/configureAgentSchema";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText, Check, X } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface InstructionsFormProps {
  selectedAgent?: Agent;
  onToggle: () => void;
}

export const InstructionsForm = ({
  selectedAgent,
  onToggle,
}: InstructionsFormProps) => {
  const form = useForm<InstructionsFormValues>({
    resolver: zodResolver(instructionsSchema),
    defaultValues: {
      generalInstruction: "",
    },
    mode: "onChange",
  });

  const { reset, control, handleSubmit } = form;
  const { mutateAsync: updateAgent, isPending } = useUpdateAgent();

  useEffect(() => {
    if (selectedAgent) {
      reset({
        generalInstruction: selectedAgent.general_instructions,
      });
    }
  }, [selectedAgent, reset]);

  const onSubmit = async (data: InstructionsFormValues) => {
    if (!selectedAgent) return;
    try {
      await updateAgent({
        id: selectedAgent.id,
        payload: { general_instructions: data.generalInstruction },
      });
    } catch (error) {
      console.error("Error updating instructions form: ", error);
    }
  };

  const handleCancel = () => {
    if (selectedAgent) {
      reset({ generalInstruction: selectedAgent.general_instructions });
    }
    onToggle();
  };

  return (
    <AccordionItem
      value="general-instruction"
      className="border border-border rounded-xl"
    >
      <AccordionTrigger className="hover:no-underline p-4">
        <div className="flex items-center gap-4">
          <FileText className="h-6 w-6" />
          <div className="text-left">
            <div className="font-medium text-foreground">
              General Instruction
            </div>
            <div className="text-sm font-normal text-muted-foreground">
              Provide general instructions or information for the AI.
            </div>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-4 border-t border-border space-y-4">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={control}
              name="generalInstruction"
              render={({ field }) => (
                <FormItem>
                  <Textarea
                    {...field}
                    placeholder="Enter instructions for the AI..."
                    className="bg-muted border-border min-h-[100px]"
                  />
                  <FormMessage className="text-sm" />
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
