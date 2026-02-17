import { Agent } from "@/provider/agent/agent.types";
import { useUpdateAgent } from "@/provider/agent/agent.queries";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  personalitySchema,
  PersonalityFormValues,
} from "@/schemas/configureAgentSchema";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Smile, Check, X } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect } from "react";

type Personality = "friendly" | "neutral" | "professional" | "humorous";

interface PersonalityFormProps {
  selectedAgent?: Agent;
  onToggle: () => void;
}

export const PersonalityForm = ({
  selectedAgent,
  onToggle,
}: PersonalityFormProps) => {
  const form = useForm<PersonalityFormValues>({
    resolver: zodResolver(personalitySchema),
    defaultValues: {
      personality: "friendly",
    },
    mode: "onChange",
  });

  const { reset, control, handleSubmit, setValue } = form;
  const { mutateAsync: updateAgent, isPending } = useUpdateAgent();

  useEffect(() => {
    if (selectedAgent) {
      reset({
        personality: (selectedAgent.personality as Personality) || "friendly",
      });
    }
  }, [selectedAgent, reset]);

  const onSubmit = async (data: PersonalityFormValues) => {
    if (!selectedAgent) return;
    try {
      await updateAgent({
        id: selectedAgent.id,
        payload: { personality: data.personality },
      });
    } catch (error) {
      console.error("Error updating personality form: ", error);
    }
  };

  const handleCancel = () => {
    if (selectedAgent) {
      reset({ personality: (selectedAgent.personality as Personality) || "friendly" });
    }
    onToggle();
  };

  return (
    <AccordionItem
      value="personality"
      className="border border-border rounded-xl"
    >
      <AccordionTrigger className="hover:no-underline p-4">
        <div className="flex items-center gap-4">
          <Smile className="h-6 w-6" />
          <div className="text-left">
            <div className="font-medium text-foreground">Personality</div>
            <div className="text-sm font-normal text-muted-foreground">
              Determines the tone of voice for AI-generated messages.
            </div>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-4 border-t border-border space-y-4">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={control}
              name="personality"
              render={({ field }) => (
                <FormItem>
                  <ToggleGroup
                    type="single"
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex flex-wrap justify-start gap-2"
                  >
                    {[
                      { value: "friendly", label: "Friendly" },
                      { value: "neutral", label: "Neutral" },
                      { value: "professional", label: "Professional" },
                      { value: "humorous", label: "Humorous" },
                    ].map((trait) => (
                      <ToggleGroupItem
                        key={trait.value}
                        value={trait.value}
                        className="rounded-2xl border text-muted-foreground px-4 flex gap-2 items-center"
                      >
                        {trait.label}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
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
                <X className="h-4 w-4 " /> Cancel
              </Button>
            </div>
          </form>
        </Form>
      </AccordionContent>
    </AccordionItem>
  );
};
