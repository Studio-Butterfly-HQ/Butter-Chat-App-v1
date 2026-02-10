import { Agent } from "@/provider/agent/agent.types";
import { useUpdateAgent } from "@/provider/agent/agent.queries";
import { useUploadAvatar } from "@/provider/profile/profile.queries";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  identitySchema,
  IdentityFormValues,
} from "@/schemas/configureAgentSchema";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IdCard, Check, X } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { FileWithPreview } from "@/hooks/use-file-upload";
import FileUploadCompact from "./compact-upload";

interface IdentityFormProps {
  selectedAgent?: Agent;
  onToggle: () => void;
}

export const IdentityForm = ({
  selectedAgent,
  onToggle,
}: IdentityFormProps) => {
  const form = useForm<IdentityFormValues>({
    resolver: zodResolver(identitySchema),
    defaultValues: {
      agentName: "",
    },
    mode: "onChange",
  });

  const { reset, control, handleSubmit } = form;
  const { mutateAsync: updateAgent, isPending: isUpdating } = useUpdateAgent();
  const { mutateAsync: uploadAvatar, isPending: isUploading } = useUploadAvatar();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadKey, setUploadKey] = useState(0);
  const isPending = isUpdating || isUploading;

  useEffect(() => {
    if (selectedAgent) {
      reset({
        agentName: selectedAgent.agent_name,
      });
    }
  }, [selectedAgent, reset]);

  const handleFilesChange = (files: FileWithPreview[]) => {
    if (files.length > 0 && files[0].file instanceof File) {
      setSelectedFile(files[0].file);
    } else {
      setSelectedFile(null);
    }
  };

  const onSubmit = async (data: IdentityFormValues) => {
    if (!selectedAgent) return;
    try {
      let avatarUrl: string | undefined;

      if (selectedFile) {
        const res = await uploadAvatar(selectedFile);
        avatarUrl = res.url;
      }

      await updateAgent({
        id: selectedAgent.id,
        payload: {
          agent_name: data.agentName,
          ...(avatarUrl && { avatar: avatarUrl }),
        },
      });
      setSelectedFile(null);
      setUploadKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error updating identity form: ", error);
    }
  };

  const handleCancel = () => {
    if (selectedAgent) {
      reset({ agentName: selectedAgent.agent_name });
    }
    onToggle();
  };

  return (
    <AccordionItem value="identity" className="border border-border rounded-xl">
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
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              <Label className="text-muted-foreground text-sm">Avatar</Label>
              <FileUploadCompact
                key={uploadKey}
                maxFiles={1}
                accept="image/*"
                multiple={false}
                onFilesChange={handleFilesChange}
              />
            </div>
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
