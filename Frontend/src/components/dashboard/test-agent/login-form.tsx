import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface LoginFormProps {
  onToggle: () => void;
  onSubmit: () => void;
}

export function LoginForm({ onToggle, onSubmit }: LoginFormProps) {
  return (
    <>
      <CardHeader className="text-start">
        <CardTitle className="text-3xl font-semibold">Welcome Back</CardTitle>
        <CardDescription className="text-base">
          Enter your credentials to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-left">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="Enter your email"
            className="bg-muted/50 border-0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="bg-muted/50 border-0"
          />
        </div>
        <Button size="lg" className="w-full" onClick={onSubmit}>
          Start Conversation
        </Button>

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
