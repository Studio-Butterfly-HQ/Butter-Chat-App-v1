import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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

export default function InvitationPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { mutateAsync: registerUser, isPending: loading } = useRegisterUser();

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
      const res = await registerUser({ payload: values, token });
      if (res.success) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error in invitation page:", error);
    }
  };

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
                                Username
                              </FormLabel>
                              <InputGroup>
                                <InputGroupInput
                                  placeholder="johndoe"
                                  {...field}
                                />
                              </InputGroup>
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
                                Password
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
                                Bio (Optional)
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
                          disabled={loading || !token}
                        >
                          {loading ? (
                            <>
                              <Spinner /> Please wait...
                            </>
                          ) : (
                            "Complete Setup"
                          )}
                        </Button>
                      </form>
                    </Form>

                    <Separator className="mb-4" />

                    <p className="text-center text-muted-foreground text-sm">
                      By clicking continue, you agree to our
                      <span className="underline cursor-pointer">Terms</span>
                      and
                      <span className="underline cursor-pointer">
                        Privacy Policy
                      </span>
                      .
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 p-2">
        <img
          src="/auth/login.jpg"
          alt="Invitation"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    </div>
  );
}
