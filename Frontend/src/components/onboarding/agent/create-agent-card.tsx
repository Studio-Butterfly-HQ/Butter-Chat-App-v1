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

import { ArrowLeft, BotMessageSquare } from "lucide-react";

import {
  createAgentSchema,
  CreateAgentFormValues,
} from "@/schemas/createAgentSchema";
import { useCreateAgent } from "@/provider/agent";
import { Spinner } from "@/components/ui/spinner";
import { useGetAgents } from "@/provider/agent";

interface CreateAgentCardProps {
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function CreateAgentCard({
  onNext,
  onPrev,
  isFirst,
  isLast,
}: CreateAgentCardProps) {
  const { mutateAsync, isPending } = useCreateAgent();
  const { refetch } = useGetAgents();
  const form = useForm<CreateAgentFormValues>({
    resolver: zodResolver(createAgentSchema),
    defaultValues: {
      name: "",
      personality: "friendly",
      instructions: "",
    },
    mode: "onBlur",
  });

  const handleSubmit = async (data: CreateAgentFormValues) => {
    try {
      const payload = {
        agent_name: data.name,
        personality: data.personality,
        general_instructions: data.instructions,
        // Default values for required fields
        choice_when_unable: "transfer",
        conversation_pass_instructions:
          "Transfer conversation when customer requests human agent... dummy text",
        auto_transfer: "enabled",
        transfer_connecting_message:
          "Connecting you to a human agent.... dummy text",
      };
      await mutateAsync(payload);
      await refetch();
      form.reset();
      onNext();
    } catch (error) {
      console.error("Error in create agent card: ", error);
    }
  };

  return (
    <Card className="bg-transparent border-0 shadow-none">
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
                  <FormLabel className="text-primary">AI Agent Name</FormLabel>
                  <Input {...field} placeholder="John Doe" />
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            {/* Personality */}
            <FormField
              control={form.control}
              name="personality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Personality</FormLabel>

                  <ToggleGroup
                    type="single"
                    value={field.value}
                    onValueChange={field.onChange}
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
                  <FormLabel className="text-primary">General Instructions</FormLabel>
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
          <CardFooter className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={onPrev}
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
            <Button
              className="flex-1 font-medium bg-foreground text-background hover:bg-foreground/90"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Spinner className="mr-2" /> Creating...
                </>
              ) : (
                <>{isLast ? "Complete Setup" : "Save & Continue"}</>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
