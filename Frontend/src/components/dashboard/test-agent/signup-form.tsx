import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  customerRegisterSchema,
  CustomerRegisterFormValues,
} from "@/schemas/customerRegisterSchema";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCustomerRegister } from "@/provider/customer";
import { useUploadAvatar } from "@/provider/profile/profile.queries";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { Pattern } from "@/components/dashboard/test-agent/avatar-upload";
import type { FileWithPreview } from "@/hooks/use-file-upload";

interface SignUpFormProps {
  onToggle: () => void;
  companyId: string;
}

export function SignUpForm({ onToggle, companyId }: SignUpFormProps) {
  const navigate = useNavigate();
  const [avatarFile, setAvatarFile] = useState<FileWithPreview | null>(null);
  const { mutateAsync: registerCustomer, isPending: isRegistering } = useCustomerRegister();
  const { mutateAsync: uploadAvatar, isPending: isUploading } = useUploadAvatar();

  const form = useForm<CustomerRegisterFormValues>({
    resolver: zodResolver(customerRegisterSchema),
    defaultValues: {
      name: "",
      contact: "",
      password: "",
      source: "WEB",
      profile_uri: "",
      company_id: companyId,
    },
    mode: "onBlur",
  });

  const handleSubmit = async (data: CustomerRegisterFormValues) => {
    try {
      let profileUri: string | undefined;

      if (avatarFile?.file) {
        const res = await uploadAvatar(avatarFile.file as File);
        profileUri = res.url;
      }

      const res = await registerCustomer({
        ...data,
        profile_uri: profileUri,
      });
    } catch (error) {
      console.error("Error in customer register: ", error);
    }
  };

  const isPending = isRegistering || isUploading;

  return (
    <>
      <CardHeader className="text-start">
        <CardTitle className="text-3xl font-semibold">Create account</CardTitle>
        <CardDescription className="text-base">
          Just provide a little info to get started
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-left">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <Pattern onFileChange={(file) => setAvatarFile(file)} />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Name</FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter your name"
                    className="bg-muted/50 border-0"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Email</FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter your email"
                    className="bg-muted/50 border-0"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Password</FormLabel>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter your password"
                    className="bg-muted/50 border-0"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              size="lg"
              className="w-full"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Spinner /> Please wait...
                </>
              ) : (
                <>Sign Up</>
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm text-muted-foreground mt-4">
          Already have an account?{" "}
          <button
            onClick={onToggle}
            className="font-medium underline hover:text-primary transition-colors"
          >
            Login
          </button>
        </div>
      </CardContent>
    </>
  );
}
