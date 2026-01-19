import { ChevronLeft, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { useResetPassword } from "@/provider/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { resetPasswordSchema, ResetPasswordFormValues } from "@/schemas/resetPasswordSchema"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export default function ResetPasswordPage() {
  const { mutateAsync, isPending } = useResetPassword()
  
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  })

  const handleSubmit = async (data: ResetPasswordFormValues) => {
    try {
      const res = await mutateAsync(data)
    }
    catch (error) {
      console.error("Error in reset password page in: ", error)
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* LEFT SIDE */}
      <div className="w-full lg:w-1/2 min-h-screen flex flex-col p-6 lg:p-8">
        <div className="flex items-center gap-2">
          <MessageCircle className="text-primary text-2xl" />
          <span className="text-primary text-2xl font-medium">
            ButterChat
          </span>
        </div>

        {/* CENTERED FORM */}
        <div className="flex-1 md:p-16 flex items-center justify-center">
          <div className="w-full max-w-md">
            <Card className="bg-transparent border-0 shadow-none">
              {/* Header */}
              <div className="flex flex-col items-center gap-2 mb-6">
                <h1 className="text-primary text-3xl font-bold">
                  Reset Password
                </h1>
                <p className="text-muted-foreground text-lg text-center ">
                  Enter your email and we'll send you instructions to reset your
                  password
                </p>
              </div>

              {/* Form */}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="flex flex-col gap-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-1">
                        <FormLabel className="text-primary text-base font-semibold">
                          Email
                        </FormLabel>
                        <Input
                          {...field}
                          type="email"
                          placeholder="user@xyzcorp.com"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button className="rounded-lg font-medium" disabled={isPending}>
                    {isPending ? <> <Spinner /> Please wait... </>: <> Send password reset link </>}
                  </Button>
                </form>
              </Form>

              {/* Back to login */}
              <Link
                to="/login"
                className="mt-4 flex items-center justify-center gap-2 text-md text-muted-foreground hover:text-primary"
              >
                <ChevronLeft />
                Back to login
              </Link>
            </Card>
          </div>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="hidden lg:flex w-1/2 p-2">
        <img
          src="/auth/reset.jpg"
          alt="Reset"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    </div>
  )
}
