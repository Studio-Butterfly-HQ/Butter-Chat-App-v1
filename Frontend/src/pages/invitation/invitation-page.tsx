import type React from "react";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye, EyeOff, MessageCircle, Plus } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import {
  invitationSchema,
  type InvitationFormValues,
} from "@/schemas/invitationSchema";
import { useRegisterUser } from "@/provider/user/user.queries";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useUploadAvatar } from "@/provider/profile/profile.queries";

export default function InvitationPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [showPassword, setShowPassword] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(
    "/placeholder.svg?height=112&width=112",
  );
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const { mutateAsync: registerUser, isPending: loading } = useRegisterUser();
  const { mutateAsync: uploadAvatar, isPending: isUploading } = useUploadAvatar();

  const form = useForm<InvitationFormValues>({
    resolver: zodResolver(invitationSchema),
    defaultValues: {
      user_name: "",
      password: "",
      bio: "",
    },
    mode: "onBlur",
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setProfilePhoto("/placeholder.svg?height=112&width=112");
      setProfileFile(null);
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
    setProfileFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setProfilePhoto(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (values: InvitationFormValues) => {
    if (!token) {
      toast.error("Invitation token is missing");
      return;
    }
    try {
      let profileUri: string | undefined;

      if (profileFile) {
        const res = await uploadAvatar(profileFile);
        profileUri = res.url;
      }

      const res = await registerUser({
        payload: { ...values, profile_uri: profileUri },
        token,
      });
      if (res.success) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error in invitation page:", error);
    }
  };

  const isPending = loading || isUploading;

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      <div className="w-full lg:w-1/2 h-screen flex flex-col">
        <div className="flex items-center gap-2 p-6 lg:p-8">
          <MessageCircle className="text-primary text-2xl" />
          <span className="text-primary text-2xl font-medium">ButterChat</span>
        </div>

        <div className="flex-1 h-0 min-h-0">
          <ScrollArea className="h-full">
            <div className="px-6 lg:px-8 pb-6 lg:pb-8 min-h-[calc(100vh-6rem)] flex flex-col justify-center">
              <div className="md:p-8 pt-8 flex items-center justify-center">
                <div className="w-full max-w-md">
                  <Card className="bg-transparent border-0 shadow-none">
                    <div className="flex flex-col items-center gap-2 mb-6">
                      <h1 className="text-primary text-3xl font-bold text-center">
                        Accept Invitation
                      </h1>
                      <p className="text-muted-foreground text-lg text-center">
                        Complete your profile to join ButterChat
                      </p>

                      {/* Profile Photo Upload */}
                      <div className="relative mt-4 mb-2">
                        <Avatar className="h-36 w-36">
                          <AvatarImage
                            src={profilePhoto}
                            className="h-full w-full object-cover"
                          />
                          <AvatarFallback>YN</AvatarFallback>
                        </Avatar>

                        <label
                          htmlFor="profile-upload"
                          className="absolute bottom-2 right-0 bg-blue-500 rounded-full p-2 text-white cursor-pointer"
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
                    </div>

                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-4 mb-6"
                      >
                        <FormField
                          control={form.control}
                          name="user_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary text-base font-semibold">
                                Username <span className="text-red-500">*</span>
                              </FormLabel>
                              <Input placeholder="johndoe" {...field} />
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary text-base font-semibold">
                                Password <span className="text-red-500">*</span>
                              </FormLabel>
                              <InputGroup>
                                <InputGroupInput
                                  {...field}
                                  type={showPassword ? "text" : "password"}
                                  placeholder="••••••••••••"
                                />
                                <InputGroupAddon
                                  align="inline-end"
                                  className="cursor-pointer bg-background h-full rounded-r-md"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? <EyeOff /> : <Eye />}
                                </InputGroupAddon>
                              </InputGroup>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary text-base font-semibold">
                                Bio{" "}
                                <span className="text-muted-foreground text-sm">
                                  (optional)
                                </span>
                              </FormLabel>
                              <Textarea
                                placeholder="Tell us a little about yourself"
                                className="resize-none"
                                {...field}
                              />
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />

                        <Button
                          className="rounded-lg font-medium"
                          disabled={isPending || !token}
                        >
                          {isPending ? (
                            <>
                              <Spinner /> Please wait...
                            </>
                          ) : (
                            "Complete Setup"
                          )}
                        </Button>
                      </form>
                    </Form>
                  </Card>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* <div className="hidden lg:flex w-1/2 p-2">
        <img
          src="/auth/login.jpg"
          alt="Invitation"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div> */}
      <div className="hidden lg:flex w-1/2 p-2">
        <video
          src="/auth/butter-register-2.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover rounded-2xl"
        />
    </div>
    </div>
  );
}
