import { useEffect, useState } from "react";
import { Agent } from "@/provider/agent/agent.types";
import { useUpdateAgent } from "@/provider/agent/agent.queries";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IdCard,
  Smile,
  FileText,
  AlertCircle,
  BadgeCheck,
  Check,
  X,
} from "lucide-react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import {
  configureAgentSchema,
  ConfigureAgentFormValues,
} from "@/schemas/configureAgentSchema";

interface ConfigureProps {
  selectedAgent?: Agent;
}

export const Configure = ({ selectedAgent }: ConfigureProps) => {
  const [openItems, setOpenItems] = useState<string[]>(["identity"]);

  const form = useForm<ConfigureAgentFormValues>({
    resolver: zodResolver(configureAgentSchema),
    defaultValues: {
      agentName: "",
      personality: "friendly",
      generalInstruction: "",
      aiFallback: "transfer",
      aiFallbackCustom: `I may not have that information at the moment, but one of our human agents will be happy to assist you. If you'd like to connect to our human agents, press yes, or if you have a specific product in mind, you can directly contact our customer service team at +88 09 678 444 777 or email customerservice.aerong@brac.net`,
      aiFallbackWait: false,
      humanTransferMessage: "I am connecting you to a human agent.",
    },
    mode: "onChange",
  });

  const { mutateAsync: updateAgent } = useUpdateAgent();
  const { watch, setValue, control, handleSubmit, reset } = form;
  const personality = watch("personality");

  useEffect(() => {
    if (!selectedAgent) return;

    reset({
      agentName: selectedAgent.agent_name,
      personality: (selectedAgent.personality as any) || "friendly",
      generalInstruction: selectedAgent.general_instructions,
      aiFallback: "transfer",
      aiFallbackCustom: selectedAgent.transfer_connecting_message,
      aiFallbackWait: selectedAgent.auto_tranfer === "disabled",
      humanTransferMessage: selectedAgent.conversation_pass_instructions,
    });
  }, [selectedAgent, reset]);

  const onSubmit = async (data: ConfigureAgentFormValues) => {
    if (!selectedAgent) return;

    const payload = {
      agent_name: data.agentName,
      personality: data.personality,
      general_instructions: data.generalInstruction,
      choice_when_unable: data.aiFallback,
      transfer_connecting_message: data.aiFallbackCustom,
      // If waiting is true, auto_transfer is disabled (manual confirmation needed)
      // If waiting is false, auto_transfer is active
      auto_tranfer: data.aiFallbackWait ? "disabled" : "enabled",
      conversation_pass_instructions: data.humanTransferMessage,
    };
    try {
      await updateAgent({ id: selectedAgent.id, payload });
    } catch (error) {
      console.log("Error updating configure-page: ", error);
    }
  };

  const handleCancel = (section: string) => {
    if (section === "identity") {
      setValue("agentName", "");
    }
    if (section === "personality") {
      setValue("personality", "friendly");
    }
    if (section === "general-instruction") {
      setValue("generalInstruction", "");
    }
    if (section === "ai-unable") {
      setValue("aiFallback", "transfer");
      setValue(
        "aiFallbackCustom",
        `I may not have that information at the moment, but one of our human agents will be happy to assist you. If you'd like to connect to our human agents, press yes, or if you have a specific product in mind, you can directly contact our customer service team at +88 09 678 444 777 or email customerservice.aerong@brac.net`,
      );
      setValue("aiFallbackWait", false);
    }
    if (section === "human-agent") {
      setValue("humanTransferMessage", "I am connecting you to a human agent.");
    }
    setOpenItems((prev) => prev.filter((v) => v !== section));
  };

  return (
    <div className="p-4 pt-0 space-y-3 max-w-full overflow-x-hidden">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Accordion
            type="multiple"
            value={openItems}
            onValueChange={setOpenItems}
            className="space-y-3"
          >
            {/* Identity Section */}
            <AccordionItem
              value="identity"
              className="border border-border rounded-xl"
            >
              <AccordionTrigger className="hover:no-underline p-4">
                <div className="flex items-center gap-4">
                  <IdCard className="h-6 w-6" />
                  <div className="text-left">
                    <div className="font-medium text-primary">Agent Name</div>
                    <div className="text-sm font-normal text-muted-foreground">
                      Name & Avatar
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 border-t border-border space-y-4">
                <FormField
                  control={control}
                  name="agentName"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-muted-foreground text-sm">
                        Agent Name
                      </Label>
                      <Input
                        {...field}
                        placeholder="Enter agent name"
                        className="bg-transparent"
                      />
                      <FormMessage className="text-sm" />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <Label className="text-muted-foreground text-sm">
                    Avatar
                  </Label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      type="button"
                      className="bg-muted"
                    >
                      Choose File
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      No File Choosen
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" type="submit">
                    <Check className="h-4 w-4 mr-2" /> Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent"
                    type="button"
                    onClick={() => handleCancel("identity")}
                  >
                    <X className="h-4 w-4 mr-2" /> Cancel
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Personality Section */}
            <AccordionItem
              value="personality"
              className="border border-border rounded-xl"
            >
              <AccordionTrigger className="hover:no-underline p-4">
                <div className="flex items-center gap-4">
                  <Smile className="h-6 w-6" />
                  <div className="text-left">
                    <div className="font-medium text-foreground">
                      Personality
                    </div>
                    <div className="text-sm font-normal text-muted-foreground">
                      Determines the tone of voice for AI-generated messages.
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 border-t border-border space-y-4">
                <FormField
                  control={control}
                  name="personality"
                  render={() => (
                    <FormItem>
                      <ToggleGroup
                        type="single"
                        value={personality}
                        onValueChange={(
                          value:
                            | "friendly"
                            | "neutral"
                            | "professional"
                            | "humorous",
                        ) => value && setValue("personality", value)}
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
                            variant="outline"
                          >
                            <Smile className="h-4 w-4" />
                            {trait.label}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                      <FormMessage className="text-sm" />
                    </FormItem>
                  )}
                />

                <div className="flex gap-2">
                  <Button size="sm" type="submit">
                    <Check className="h-4 w-4 mr-2" /> Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent"
                    type="button"
                    onClick={() => handleCancel("personality")}
                  >
                    <X className="h-4 w-4 mr-2" /> Cancel
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* General Instruction Section */}
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
                  <Button size="sm" type="submit">
                    <Check className="h-4 w-4 mr-2" /> Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent"
                    type="button"
                    onClick={() => handleCancel("general-instruction")}
                  >
                    <X className="h-4 w-4 mr-2" /> Cancel
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* AI Unable to Assist Section */}
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
                      Choose what happens when the AI agent is unable to help
                      the customer.
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="border-t border-border p-4 space-y-4">
                <FormField
                  control={control}
                  name="aiFallback"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-muted-foreground">
                        If AI agent is unable to assist user
                      </Label>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full h-10">
                          <SelectValue placeholder="Select fallback behavior" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="transfer">
                            Transfer customer to first available agent or put
                            into queue
                          </SelectItem>
                          <SelectItem value="message">
                            Show custom message only
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
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormItem>
                  )}
                />

                <div className="flex gap-2">
                  <Button size="sm" type="submit">
                    <Check className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    type="button"
                    onClick={() => handleCancel("ai-unable")}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Human Agent Section */}
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
                      Transfer customer to the first available agent or put them
                      into a queue.
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 border-t border-border space-y-4">
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
                    <Check className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent"
                    type="button"
                    onClick={() => handleCancel("human-agent")}
                  >
                    <X className="h-4 w-4 mr-2" /> Cancel
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </form>
      </Form>
    </div>
  );
};
