import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  customerLoginSchema,
  CustomerLoginFormValues,
} from "@/schemas/customerLoginSchema";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCustomerLogin } from "@/provider/customer";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

interface LoginFormProps {
  onToggle: () => void;
  companyId: string;
}

export function LoginForm({ onToggle, companyId }: LoginFormProps) {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCustomerLogin();

  const form = useForm<CustomerLoginFormValues>({
    resolver: zodResolver(customerLoginSchema),
    defaultValues: {
      contact: "",
      password: "",
      source: "WEB",
      company_id: companyId,
    },
    mode: "onBlur",
  });

  const handleSubmit = async (data: CustomerLoginFormValues) => {
    try {
      const res = await mutateAsync(data);
      if (res.success) {
        navigate(`/test-agent/chat/${companyId}`);
      }
    } catch (error) {
      console.error("Error in customer login: ", error);
    }
  };

  return (
    <>
      <CardHeader className="text-start">
        <CardTitle className="text-3xl font-semibold">Welcome Back</CardTitle>
        <CardDescription className="text-base">
          Enter your credentials to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-left">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Email</FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter your email"
                    className="bg-muted/50 border-0"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Password</FormLabel>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter your password"
                    className="bg-muted/50 border-0"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              size="lg"
              className="w-full"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Spinner /> Please wait...
                </>
              ) : (
                <>Start Conversation</>
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm text-muted-foreground mt-4">
          Don't have an account?{" "}
          <button
            onClick={onToggle}
            className="font-medium underline hover:text-primary transition-colors"
          >
            Sign up
          </button>
        </div>
      </CardContent>
    </>
  );
}
