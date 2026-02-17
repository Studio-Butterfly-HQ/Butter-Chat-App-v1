import { useEffect } from "react";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";

import {
  useProfileMeta,
  useUpdateCompanyProfile,
  useUploadAvatar,
  useDetectLocation,
} from "@/provider/profile";
import { ProfileFormValues, profileSchema } from "@/schemas/profileSchema";

export default function ProfileUpdateCard() {
  const { profilePhoto, avatarFile, handlePhotoUpload } = usePhotoUpload({
    fallbackPhoto: "/placeholder.svg?height=112&width=112",
  });

  const { data: profileMeta, isLoading: isLoadingProfileMeta } =
    useProfileMeta();
  const { mutateAsync: updateProfile, isPending: isUpdatingProfile } =
    useUpdateCompanyProfile();
  const { mutateAsync: uploadAvatar, isPending: isUploadingAvatar } =
    useUploadAvatar();
  const { data: detectedLocation, isLoading: isDetectingLocation } =
    useDetectLocation();

  const isPending = isUpdatingProfile || isUploadingAvatar;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      company_category: "",
      country: "",
      language: "",
      timezone: "",
    },
    mode: "onBlur",
  });

  const handleSubmit = async (data: ProfileFormValues) => {
    try {
      let logoUrl: string | undefined;

      if (avatarFile) {
        const uploadRes = await uploadAvatar(avatarFile);
        logoUrl = uploadRes.url;
      }

      await updateProfile({
        ...data,
        logo: logoUrl,
      });
    } catch (error) {
      console.error("Error in profile update card: ", error);
    }
  };

  useEffect(() => {
    if (!profileMeta || !detectedLocation) return;

    if (!form.getValues("country") && detectedLocation.country) {
      const c = profileMeta.countries.find(
        (x) => x.value === detectedLocation.country,
      );
      c && form.setValue("country", c.value);
    }

    if (!form.getValues("timezone") && detectedLocation.timezone) {
      const t = profileMeta.timezones.find(
        (x) => x.value === detectedLocation.timezone,
      );
      t && form.setValue("timezone", t.value);
    }

    if (!form.getValues("language") && detectedLocation.language) {
      const l = profileMeta.languages.find((x) =>
        x.value.startsWith(detectedLocation.language!),
      );
      l && form.setValue("language", l.value);
    }
  }, [profileMeta, detectedLocation, form]);
  return (
    <Card className="bg-background border-0 shadow-none">
      <CardHeader className="flex flex-col items-center text-center">
        <CardTitle className="text-3xl font-bold">Update Profile</CardTitle>
        <CardDescription className="text-lg">
          Add additional info to complete your profile
        </CardDescription>

        <div className="relative mt-8 mb-4">
          <Avatar className="h-36 mt-2 w-36">
            <AvatarImage
              src={profilePhoto}
              className="h-full w-full object-cover"
            />
            <AvatarFallback>YN</AvatarFallback>
          </Avatar>

          <label
            htmlFor="photo-upload"
            className="absolute bottom-4 right-0 bg-blue-500 rounded-full p-2 text-white cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </label>
        </div>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            {/* Category */}
            <FormField
              control={form.control}
              name="company_category"
              render={({ field }) => (
                <FormItem>
                  <Field orientation="vertical">
                    <FieldLabel className="font-semibold text-base">
                      Company Category
                    </FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="health">Healthcare</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            {/* Country */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <Field orientation="vertical">
                    <FieldLabel className="font-semibold text-base">
                      Country
                    </FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        disabled={isLoadingProfileMeta || isDetectingLocation}
                      >
                        <SelectValue
                          placeholder={
                            isLoadingProfileMeta || isDetectingLocation
                              ? "Loading location..."
                              : "Select a country..."
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {profileMeta?.countries.map((c) => (
                          <SelectItem key={c.value} value={c.value}>
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            {/* Language */}
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <Field orientation="vertical">
                    <FieldLabel className="font-semibold text-base">
                      Language
                    </FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        disabled={isLoadingProfileMeta || isDetectingLocation}
                      >
                        <SelectValue
                          placeholder={
                            isLoadingProfileMeta || isDetectingLocation
                              ? "Loading language..."
                              : "Select a language..."
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {profileMeta?.languages.map((l) => (
                          <SelectItem key={l.value} value={l.value}>
                            {l.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            {/* Timezone */}
            <FormField
              control={form.control}
              name="timezone"
              render={({ field }) => (
                <FormItem>
                  <Field orientation="vertical">
                    <FieldLabel className="font-semibold text-base">
                      Timezone
                    </FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        disabled={isLoadingProfileMeta || isDetectingLocation}
                      >
                        <SelectValue
                          placeholder={
                            isLoadingProfileMeta || isDetectingLocation
                              ? "Loading timezone..."
                              : "Select a timezone..."
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {profileMeta?.timezones.map((t) => (
                          <SelectItem key={t.value} value={t.value}>
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter>
            <Button
              className="w-full font-medium"
              disabled={
                isLoadingProfileMeta || isDetectingLocation || isPending
              }
              type="submit"
            >
              {isPending ? (
                <>
                  <Spinner /> Please wait...
                </>
              ) : (
                <> Complete Profile </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
