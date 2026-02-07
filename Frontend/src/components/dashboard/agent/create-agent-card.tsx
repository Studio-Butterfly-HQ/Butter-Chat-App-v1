import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { BotMessageSquare } from "lucide-react";

import {
  createAgentSchema,
  CreateAgentFormValues,
} from "@/schemas/createAgentSchema";
import { useCreateAgent } from "@/provider/agent";
import { Spinner } from "@/components/ui/spinner";
import { useGetAgents } from "@/provider/agent";

export default function CreateAgentCard() {
  const { mutateAsync, isPending } = useCreateAgent();
  const { data } = useGetAgents();

  const form = useForm<CreateAgentFormValues>({
    resolver: zodResolver(createAgentSchema),
    defaultValues: {
      name: "",
      personality: "friendly",
      instructions: "",
    },
    mode: "onBlur",
  });

  const { watch, setValue } = form;
  const personality = watch("personality");

  const handleSubmit = async (data: CreateAgentFormValues) => {
    try {
      const payload = {
        agent_name: data.name,
        personality: data.personality,
        general_instructions: data.instructions,
        // Default values for required fields
        choice_when_unable: "transfer_to_human",
        conversation_pass_instructions:
          "Transfer conversation when customer requests human agent... dummy text",
        auto_tranfer: "enabled",
        transfer_connecting_message: "Connecting you to a human agent.... dummy text",
      };
      const res = await mutateAsync(payload);
      const getAgents = await useGetAgents();

    } catch (error) {
      console.error("Error in create agent card: ", error);
    }
  };

  return (
    <Card className="bg-background border-0 shadow-none">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <BotMessageSquare size={34} />
        </div>

        <CardTitle className="text-3xl">Create AI Agent</CardTitle>

        <CardDescription className="text-lg">
          Add additional info to complete your profile
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            {/* AI Agent Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary text-base font-semibold">
                    AI Agent Name
                  </FormLabel>
                  <Input {...field} placeholder="John Doe" />
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            {/* Personality */}
            <FormField
              control={form.control}
              name="personality"
              render={() => (
                <FormItem>
                  <FormLabel className="text-primary text-base font-semibold">
                    Personality
                  </FormLabel>

                  <ToggleGroup
                    type="single"
                    value={personality}
                    onValueChange={(value: "friendly" | "neutral" | "professional" | "humorous") =>
                      value && setValue("personality", value)
                    }
                    className="flex flex-wrap justify-between gap-x-0 gap-y-2"
                  >
                    <ToggleGroupItem
                      className="rounded-2xl border text-muted-foreground px-4"
                      value="friendly"
                    >
                      Friendly
                    </ToggleGroupItem>

                    <ToggleGroupItem
                      className="rounded-2xl border text-muted-foreground px-4"
                      value="neutral"
                    >
                      Neutral
                    </ToggleGroupItem>

                    <ToggleGroupItem
                      className="rounded-2xl border text-muted-foreground px-4"
                      value="professional"
                    >
                      Professional
                    </ToggleGroupItem>

                    <ToggleGroupItem
                      className="rounded-2xl border text-muted-foreground px-4"
                      value="humorous"
                    >
                      Humorous
                    </ToggleGroupItem>
                  </ToggleGroup>

                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            {/* General Instructions */}
            <FormField
              control={form.control}
              name="instructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary font-semibold text-base">
                    General Instructions
                  </FormLabel>
                  <Textarea
                    {...field}
                    placeholder="Give instructions for the AI agent..."
                    className="min-h-[80px]"
                  />
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              className="w-full font-medium"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Spinner /> Creating AI Agent...
                </>
              ) : (
                <> Create AI Agent </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
