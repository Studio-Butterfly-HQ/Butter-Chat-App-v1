import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, MoveLeft } from "lucide-react";
import { usePhotoUpload } from "@/hooks/use-photo-upload";
import { Spinner } from "@/components/ui/spinner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AvatarUpload } from "../../common/avatar-upload";
import { useUpdateCompanyProfile, useUploadAvatar } from "@/provider/profile";

const companyIdentitySchema = z.object({
  company_category: z.string().min(1, "Business category is required"),
  website: z.string().url("Enter a valid URL").or(z.literal("")),
});

type CompanyIdentityValues = z.infer<typeof companyIdentitySchema>;

interface CompanyIdentityCardProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function CompanyIdentityCard({
  onNext,
  onPrev,
}: CompanyIdentityCardProps) {
  const { profilePhoto, avatarFile, handlePhotoUpload } = usePhotoUpload({
    fallbackPhoto: "/placeholder.svg?height=112&width=112",
  });

  const { mutateAsync: updateProfile, isPending: isUpdatingProfile } =
    useUpdateCompanyProfile();
  const { mutateAsync: uploadAvatar, isPending: isUploadingAvatar } =
    useUploadAvatar();

  const isPending = isUpdatingProfile || isUploadingAvatar;

  const form = useForm<CompanyIdentityValues>({
    resolver: zodResolver(companyIdentitySchema),
    defaultValues: {
      company_category: "",
      website: "",
    },
  });

  const handleSubmit = async (data: CompanyIdentityValues) => {
    try {
      let logoUrl: string | undefined;

      if (avatarFile) {
        const uploadRes = await uploadAvatar(avatarFile);
        logoUrl = uploadRes.url;
      }

      // await updateProfile({
      //   company_category: data.company_category,
      //   website: data.website,
      //   logo: logoUrl,
      // });

      onNext();
    } catch (error) {
      console.error("Error updating company identity: ", error);
    }
  };

  return (
    <Card className="bg-transparent border-0 shadow-none">
      <CardHeader className="flex flex-col items-center text-center">
        <CardTitle className="text-3xl">Company identity</CardTitle>
        <CardDescription className="text-lg text-muted-foreground/80">
          We'll use this to brand your AI's responses.
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-6">
            <AvatarUpload
              profilePhoto={profilePhoto}
              handlePhotoUpload={handlePhotoUpload}
              type="agent"
            />

            {/* Business Category */}
            <FormField
              control={form.control}
              name="company_category"
              render={({ field }) => (
                <FormItem>
                  <Field orientation="vertical">
                    <FormLabel className="text-primary">
                      Business Category
                      <span className="text-destructive pl-1">*</span>
                    </FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Company Website */}
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <Field orientation="vertical">
                    <FormLabel className="text-primary">
                      Company Website
                      <span className="text-destructive pl-1">*</span>
                    </FormLabel>
                    <Input placeholder="www.example.com" {...field} />
                  </Field>
                  <FormMessage className="text-xs" />
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
            <Button type="submit" className="flex-1" disabled={isPending}>
              {isPending ? (
                <>
                  <Spinner /> Please wait...
                </>
              ) : (
                <> Save & Continue </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
