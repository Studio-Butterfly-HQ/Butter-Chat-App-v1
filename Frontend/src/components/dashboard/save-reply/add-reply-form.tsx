import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { X, User, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { addReplySchema, AddReplyFormValues } from "@/schemas/saveReplySchema";

export default function AddReplyForm() {
  const [tagInput, setTagInput] = useState("");
  const form = useForm<AddReplyFormValues>({
    resolver: zodResolver(addReplySchema),
    defaultValues: {
      visibility: "shared",
      language: "Bangla",
      department: "General",
      body: "",
      tags: ["Ecommerce", "Order"],
    },
    mode: "onChange",
  });

  const { setValue, watch } = form;
  const tags = watch("tags");

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag)) {
        setValue("tags", [...tags, newTag]);
        setTagInput("");
      }
    }
  };

  const removeTag = (tagRemove: string) => {
    setValue(
      "tags",
      tags.filter((tag) => tag !== tagRemove),
    );
  };

  const onSubmit = (data: AddReplyFormValues) => {
    console.log("Form Submitted:", data);
    // TODO: Connect to mutation
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="visibility"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <ToggleGroup
                    type="single"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="justify-start inline-flex bg-muted p-1 rounded-full border"
                  >
                    <ToggleGroupItem
                      value="shared"
                      aria-label="Toggle shared"
                      className={cn(
                        "rounded-full px-4 data-[state=on]:bg-background data-[state=on]:text-foreground text-muted-foreground",
                        "flex items-center gap-2",
                      )}
                    >
                      <Users className="h-4 w-4" />
                      Shared
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="private"
                      aria-label="Toggle private"
                      className={cn(
                        "rounded-full px-4 data-[state=on]:bg-background data-[state=on]:text-foreground text-muted-foreground",
                        "flex items-center gap-2",
                      )}
                    >
                      <User className="h-4 w-4" />
                      Private
                    </ToggleGroupItem>
                  </ToggleGroup>
                </FormControl>
                <FormDescription className="text-sm">
                  Shared replies will be visible to all agents, not just you.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
                <FormControl>
                  <Input placeholder="Enter language..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="General">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-yellow-400" />
                        General
                      </div>
                    </SelectItem>
                    <SelectItem value="Sales">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-blue-400" />
                        Sales
                      </div>
                    </SelectItem>
                    <SelectItem value="Support">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-400" />
                        Support
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription className="text-sm">
                  Only agents in this group will see this reply.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reply Text</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your reply here..."
                    className="min-h-[120px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <div className="border rounded-md p-2 flex flex-wrap gap-2 focus-within:ring-1 focus-within:ring-ring">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="px-2 py-1 gap-1 text-sm font-normal"
                    >
                      {tag}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-destructive"
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                  <input
                    className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground text-sm min-w-[120px]"
                    placeholder="Type a tag and press Enter..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                  />
                </div>
                <FormDescription className="text-sm">
                  Selected tags will be automatically assigned to conversation.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Save Reply</Button>
        </form>
      </Form>
    </div>
  );
}
