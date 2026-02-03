import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BACKEND_BASE_URL } from "@/constants/api";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { MessageCircle } from "lucide-react";

const invitationSchema = z.object({
  user_name: z.string().min(3, "Must be at least 3 characters"),
  password: z.string().min(6, "Must be at least 6 characters"),
  bio: z.string().optional(),
});

type InvitationFormValues = z.infer<typeof invitationSchema>;

export default function InvitationPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<InvitationFormValues>({
    defaultValues: {
      user_name: "",
      password: "",
      bio: "",
    },
  });

  const onSubmit = async (values: InvitationFormValues) => {
    if (!token) {
      toast.error("Invitation token is missing");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/users/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if(!data.success){
        console.log("error: ", data.error.details)
        toast.error(data.message);
        return;
      }
      toast.success("Profile updated successfully!");
    //   navigate("/login");
    } catch (error: any) {
      console.error("Error updating profile: ", error.response.data.error.details);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      <div className="w-full h-screen flex flex-col">
        <div className="flex items-center gap-2 p-6 lg:p-8">
          <MessageCircle className="text-primary text-2xl" />
          <span className="text-primary text-2xl font-medium">ButterChat</span>
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <Card className="bg-transparent border-0 shadow-none">
              <CardHeader>
                <CardTitle className="text-xl">Accept Invitation</CardTitle>
                <CardDescription className="text-base">
                  Complete your profile to join ButterChat
                </CardDescription>
              </CardHeader>
              <CardContent>
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
                            Password
                          </FormLabel>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                          />
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
