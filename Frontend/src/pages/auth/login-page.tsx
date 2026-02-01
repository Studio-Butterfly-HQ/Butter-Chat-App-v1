import { useState} from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Eye, EyeOff, MessageCircle } from "lucide-react"
import { loginSchema, LoginFormValues } from "@/schemas/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { useLogin } from "@/provider/auth"
import { Spinner } from "@/components/ui/spinner"
import { EmailInput } from "@/components/auth/email-input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { mutateAsync, isPending } = useLogin()
  const navigate = useNavigate()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  })

  const handleSubmit = async (data: LoginFormValues) => {
    try {
      const res = await mutateAsync(data)
      if (res.success) {
          navigate("/dashboard")
      }
    }
    catch (error) {
      console.error("Error in login page: ", error)
    }
  }

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      <div className="w-full lg:w-1/2 h-screen flex flex-col">
        <div className="flex items-center gap-2 p-6 lg:p-8">
          <MessageCircle className="text-primary text-2xl" />
          <span className="text-primary text-2xl font-medium">ButterChat</span>
        </div>

        <div className="flex-1 h-0 min-h-0"> {/* todo pb-3 */}
          <ScrollArea className="h-full">
            <div className="px-6 lg:px-8 pb-6 lg:pb-8 min-h-[calc(100vh-6rem)] flex flex-col justify-center">
              <div className="md:p-8 pt-8 flex items-center justify-center">
                <div className="w-full max-w-md">
                  <Card className="bg-transparent border-0 shadow-none">
                    <div className="flex flex-col items-center gap-2 mb-6">
                      <h1 className="text-primary text-3xl font-bold text-center">
                        Login to your account
                      </h1>
                      <p className="text-muted-foreground text-lg text-center">
                        Enter your credentials to access your account
                      </p>
                    </div>

                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="flex flex-col gap-4 mb-6"
                      >
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
                              <div className="flex items-center justify-between">
                                <FormLabel className="text-primary text-base font-semibold">
                                  Password
                                </FormLabel>
                                <Link
                                  to="/reset-password"
                                  className="text-sm text-primary underline"
                                >
                                  Forgot password?
                                </Link>
                              </div>

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
                            <> Login </>
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
                      Don’t have an account?{" "}
                      <Link
                        to="/signup"
                        className="underline text-muted-foreground"
                      >
                        Sign up
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

      <div className="hidden lg:flex w-1/2 p-2">
        <img
          src="/auth/login.jpg"
          alt="Login"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    </div>
  );
}