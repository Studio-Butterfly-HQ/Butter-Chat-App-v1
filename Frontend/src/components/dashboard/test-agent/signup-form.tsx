import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface SignUpFormProps {
  onToggle: () => void;
  onSubmit: () => void;
}

export function SignUpForm({ onToggle, onSubmit }: SignUpFormProps) {
  return (
    <>
      <CardHeader className="text-start">
        <CardTitle className="text-3xl font-semibold">
          Create account
        </CardTitle>
        <CardDescription className="text-base">
          Just provide a little info to get started
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-left">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Enter your name"
            className="bg-muted/50 border-0"
          />
        </div>
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
          Sign Up
        </Button>

        <div className="text-center text-sm text-muted-foreground mt-4">
          Already have an account?{" "}
          <button
            onClick={onToggle}
            className="font-medium underline hover:text-primary transition-colors"
          >
            Login
          </button>
        </div>
      </CardContent>
    </>
  );
}
