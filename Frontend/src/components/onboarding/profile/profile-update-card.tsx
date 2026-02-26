import { useEffect } from "react";
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
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { AvatarUpload } from "../../common/avatar-upload";

import {
  useProfileMeta,
  useUpdateCompanyProfile,
  useUploadAvatar,
  useDetectLocation,
} from "@/provider/profile";
import { ProfileFormValues, profileSchema } from "@/schemas/profileSchema";

interface ProfileUpdateCardProps {
  onNext: () => void;
}

export default function ProfileUpdateCard({ onNext }: ProfileUpdateCardProps) {
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

      onNext();
    } catch (error) {
      console.error("Error in profile update card: ", error);
    }
  };

  useEffect(() => {
    if (!profileMeta || !detectedLocation) return;

    // Use setTimeout to avoid race conditions with initial render/mounting
    // to ensure they run after the component has fully mounted and rendered.
    const timer = setTimeout(() => {
      const currentValues = form.getValues();

      if (!currentValues.country && detectedLocation.country) {
        const c = profileMeta.countries.find(
          (x) => x.value === detectedLocation.country,
        );
        if (c) {
          form.setValue("country", c.value);
        }
      }

      if (!currentValues.timezone && detectedLocation.timezone) {
        const t = profileMeta.timezones.find(
          (x) => x.value === detectedLocation.timezone,
        );
        if (t) {
          form.setValue("timezone", t.value);
        }
      }

      if (!currentValues.language && detectedLocation.language) {
        const l = profileMeta.languages.find((x) =>
          x.value.startsWith(detectedLocation.language!),
        );
        if (l) {
          form.setValue("language", l.value);
        }
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [profileMeta, detectedLocation, form]);
  return (
    <Card className="bg-transparent border-0 shadow-none">
      <CardHeader className="flex flex-col items-center text-center">
        <CardTitle className="text-3xl">Personal Info</CardTitle>
        <CardDescription className="text-lg mb-6">
          Add additional info to complete your profile
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            <AvatarUpload
              profilePhoto={profilePhoto}
              handlePhotoUpload={handlePhotoUpload}
              type="user"
            />
            {/* Category */}
            <FormField
              control={form.control}
              name="company_category"
              render={({ field }) => (
                <FormItem>
                  <Field orientation="vertical">
                    <FieldLabel className="font-semibold">
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
                    <FieldLabel className="font-semibold">Country</FieldLabel>
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
                    <FieldLabel className="font-semibold">Language</FieldLabel>
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
                    <FieldLabel className="font-semibold">Timezone</FieldLabel>
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
                <> Save & Continue </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
