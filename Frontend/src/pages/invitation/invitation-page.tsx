import { useState } from "react";
import { usePhotoUpload } from "@/hooks/use-photo-upload";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye, EyeOff, MessageCircle } from "lucide-react";
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
import { AvatarUpload } from "@/components/common/avatar-upload";
import { useUploadAvatar } from "@/provider/profile/profile.queries";

export default function InvitationPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [showPassword, setShowPassword] = useState(false);
  const { profilePhoto, avatarFile, handlePhotoUpload } = usePhotoUpload({
    fallbackPhoto: "/placeholder.svg?height=112&width=112",
  });
  const navigate = useNavigate();

  const { mutateAsync: registerUser, isPending: loading } = useRegisterUser();
  const { mutateAsync: uploadAvatar, isPending: isUploading } =
    useUploadAvatar(token);

  const form = useForm<InvitationFormValues>({
    resolver: zodResolver(invitationSchema),
    defaultValues: {
      user_name: "",
      password: "",
      bio: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: InvitationFormValues) => {
    if (!token) {
      toast.error("Invitation token is missing");
      return;
    }
    try {
      let profileUri: string | undefined;

      if (avatarFile) {
        const res = await uploadAvatar(avatarFile);
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
                    <CardHeader className="pt-0">
                      <CardTitle className="text-primary text-3xl text-center">
                        Accept Invitation
                      </CardTitle>
                      <CardDescription className="text-muted-foreground text-lg text-center">
                        Complete your profile to join ButterChat
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-0 pb-0">
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="flex flex-col gap-4 mb-6"
                        >
                          <AvatarUpload
                            profilePhoto={profilePhoto}
                            handlePhotoUpload={handlePhotoUpload}
                            type="user"
                          />
                          <FormField
                            control={form.control}
                            name="user_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-primary font-semibold">
                                  Username{" "}
                                  <span className="text-red-500">*</span>
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
                                <FormLabel className="text-primary font-semibold">
                                  Password{" "}
                                  <span className="text-red-500">*</span>
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
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
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
                                <FormLabel className="text-primary font-semibold">
                                  Bio
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
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
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
