import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GeneralFormValues, generalSchema } from "@/schemas/generalSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  useUserProfile,
  useUploadAvatar,
  useUpdateUserProfile,
} from "@/provider/profile/profile.queries";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export default function General() {
  const { data: userProfile, isLoading } = useUserProfile();
  const { mutateAsync: uploadAvatar, isPending: isUploading } =
    useUploadAvatar();
  const { mutateAsync: updateProfile, isPending: isUpdating } =
    useUpdateUserProfile();

  const [profilePhoto, setProfilePhoto] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const form = useForm<GeneralFormValues>({
    resolver: zodResolver(generalSchema),
    defaultValues: {
      user_name: "",
      email: "",
      role: "",
    },
  });

  const isPending = isUploading || isUpdating;

  useEffect(() => {
    if (userProfile) {
      form.reset({
        user_name: userProfile.user_name || "",
        email: userProfile.email || "",
        role: userProfile.role || "",
      });
      setProfilePhoto(userProfile.profile_uri || "");
    }
  }, [userProfile, form]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setAvatarFile(null);
      setProfilePhoto(userProfile?.profile_uri || "");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Please select an image smaller than 5MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (
      avatarFile &&
      file.name === avatarFile.name &&
      file.size === avatarFile.size
    ) {
      return;
    }
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setProfilePhoto(ev.target?.result as string);
    reader.onerror = () => {
      toast.error("Failed to read the selected image");
      setAvatarFile(null);
      setProfilePhoto(userProfile?.profile_uri || "");
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: GeneralFormValues) => {
    if (!form.formState.isDirty && !avatarFile) {
      toast.error("No changes to save");
      return;
    }
    try {
      let profileUri = userProfile?.profile_uri;

      if (avatarFile) {
        const uploadRes = await uploadAvatar(avatarFile);
        profileUri = uploadRes.url;
      }

      await updateProfile({
        user_name: data.user_name,
        profile_uri: profileUri,
      });
      avatarFile && setAvatarFile(null);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="space-y-6 p-4 pt-0">
      <Card className="shadow-none bg-transparent p-6">
        <CardContent className="p-0 space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24 border-2 border-border">
                <AvatarImage
                  src={profilePhoto}
                  className="h-full w-full object-cover"
                />
                <AvatarFallback className="text-xl">
                  {userProfile?.user_name?.slice(0, 2).toUpperCase() || "UN"}
                </AvatarFallback>
              </Avatar>

              <label
                htmlFor="profile-upload"
                className="absolute bottom-2 right-0 bg-primary text-primary-foreground rounded-full p-1 cursor-pointer shadow-sm hover:bg-primary/90 transition-colors"
                title="Upload new photo"
              >
                <Plus className="h-4 w-4" />
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </label>
            </div>

            <div className="space-y-0">
              <h3 className="text-2xl font-semibold tracking-tight">
                {userProfile?.user_name}
              </h3>
              <p className="text-base text-muted-foreground">
                {userProfile?.email}
              </p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="user_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name"
                        className="h-10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        className="h-10 cursor-not-allowed bg-muted text-muted-foreground"
                        disabled
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Role</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-muted text-muted-foreground h-10 cursor-not-allowed"
                        disabled
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-start">
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Spinner className="mr-2" />
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
