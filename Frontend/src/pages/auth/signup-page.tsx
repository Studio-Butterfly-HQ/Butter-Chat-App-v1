import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye, EyeOff, MessageCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupFormValues } from "@/schemas/signupSchema";
import { Spinner } from "@/components/ui/spinner";
import { useSignup } from "@/provider/auth";
import { useNavigate } from "react-router-dom";
import { EmailInput } from "@/components/auth/email-input";
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
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const subdomainTouched = useRef(false);
  const { mutateAsync, isPending } = useSignup();
  const navigate = useNavigate();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      company_name: "",
      subdomain: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    mode: "onBlur",
  });
  const company_name = form.watch("company_name");
  const password = form.watch("password");
  const confirm_password = form.watch("confirm_password");

  const passwordsMatch =
    password && confirm_password && password === confirm_password;

  const handleSubmit = async (data: SignupFormValues) => {
    try {
      const { confirm_password, ...payload } = data;
      const res = await mutateAsync(payload);
      if (res.success) {
        navigate("/onboarding", { replace: true });
      }
    } catch (error) {
      console.error("Error in signup page: ", error);
    }
  };

  useEffect(() => {
    if (!company_name) {
      form.setValue("subdomain", "");
      return;
    }
    if (subdomainTouched.current) return;

    const generatedSubdomain = company_name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // spaces → hyphen
      .replace(/[^a-z0-9-]/g, "") // remove symbols like @ # $
      .replace(/-+/g, "-") // collapse multiple hyphens
      .replace(/^-+|-+$/g, "");
    form.setValue("subdomain", generatedSubdomain);
  }, [company_name, form]);

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      <div className="w-full lg:w-1/2 h-screen flex flex-col">
        <div className="flex items-center gap-2 p-6 lg:p-8">
          <MessageCircle className="text-primary text-2xl" />
          <span className="text-primary text-2xl font-medium">ButterChat</span>
        </div>

        <div className="flex-1 h-0 min-h-0">
          {" "}
          {/* todo pb-3 */}
          <ScrollArea className="h-full">
            <div className="px-6 lg:px-8 pb-6 lg:pb-8 min-h-[calc(100vh-6rem)] flex flex-col justify-center">
              <div className="md:p-8 pt-8 flex items-center justify-center">
                <div className="w-full max-w-md">
                  <Card className="bg-transparent border-0 shadow-none">
                    <div className="flex flex-col items-center gap-2 mb-6">
                      <h1 className="text-primary text-3xl font-bold text-center">
                        Create your account
                      </h1>
                      <p className="text-muted-foreground text-lg text-center ">
                        Fill in the form below to create your account
                      </p>
                    </div>

                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="flex flex-col gap-4 mb-6"
                      >
                        {/* Company Name */}
                        <FormField
                          control={form.control}
                          name="company_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary text-base font-semibold">
                                Company Name
                              </FormLabel>
                              <Input {...field} placeholder="XYZ Corporation" />
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />

                        {/* Subdomain */}
                        <FormField
                          control={form.control}
                          name="subdomain"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary text-base font-semibold">
                                Subdomain
                              </FormLabel>
                              <ButtonGroup className="w-full">
                                <InputGroup>
                                  <InputGroupInput
                                    {...field}
                                    onChange={(e) => {
                                      subdomainTouched.current = true;
                                      field.onChange(e);
                                    }}
                                    placeholder="xyzcorp"
                                  />
                                </InputGroup>
                                <ButtonGroupText>
                                  .butterchat.io
                                </ButtonGroupText>
                              </ButtonGroup>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />

                        {/* Email */}
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary text-base font-semibold">
                                Email
                              </FormLabel>
                              <EmailInput
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                              />
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />

                        {/* Password */}
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary font-semibold">
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
                              {/* <p className="text-muted-foreground text-sm">
                          Must be at least 8 characters
                        </p> */}
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />

                        {/* Confirm Password */}
                        <FormField
                          control={form.control}
                          name="confirm_password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary text-base font-semibold">
                                Confirm Password
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
                              {/* {form.formState.errors.confirm_password && passwordsMatch && (<p className="text-green-500 text-sm">Passwords match</p>)} */}
                            </FormItem>
                          )}
                        />

                        <Button
                          className="rounded-lg font-medium"
                          disabled={isPending}
                        >
                          {isPending ? (
                            <>
                              {" "}
                              <Spinner /> Please wait...{" "}
                            </>
                          ) : (
                            <> Create Account </>
                          )}
                        </Button>
                      </form>
                    </Form>

                    <div className="flex items-center gap-3 mb-4">
                      <Separator className="flex-1" />
                      <span className="text-md text-muted-foreground">
                        Or continue with
                      </span>
                      <Separator className="flex-1" />
                    </div>

                    <div className="flex gap-4 mb-4">
                      <Button variant="outline" className="flex-1 rounded-xl">
                        <img
                          src="/icons/facebook.svg"
                          alt="Facebook"
                          className="h-5 w-5"
                        />
                      </Button>
                      <Button variant="outline" className="flex-1 rounded-xl">
                        <img
                          src="/icons/google.svg"
                          alt="Google"
                          className="h-5 w-5"
                        />
                      </Button>
                      <Button variant="outline" className="flex-1 rounded-xl">
                        <img
                          src="/icons/linkedin.svg"
                          alt="LinkedIn"
                          className="h-5 w-5"
                        />
                      </Button>
                    </div>

                    <p className="text-center text-muted-foreground mb-4">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="underline text-muted-foreground"
                      >
                        Sign in
                      </Link>
                    </p>

                    <Separator className="mb-4" />

                    <p className="text-center text-muted-foreground text-sm">
                      By clicking continue, you agree to our{" "}
                      <span className="underline cursor-pointer">Terms</span>{" "}
                      and{" "}
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

      {/* <div className="hidden lg:flex w-1/2 p-2">
        <img
          src="/auth/signup.jpg"
          alt="Signup"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div> */}

      <div className="hidden lg:flex w-1/2 p-2">
        <video
          src="/auth/butter-register-1.mp4"
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
