import ProfileUpdateCard from "@/components/onboarding/profile/profile-update-card";
import CompanyIdentityCard from "@/components/onboarding/company/company-identity-card";
import ConnectResourcesCard from "@/components/onboarding/connect/connect-resources-card";
import CreateAgentCard from "@/components/onboarding/agent/create-agent-card";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setOnboardingStep, resetOnboardingStep } from "@/store/slices/ui/ui-slice";
import { completeOnboarding, logout } from "@/store/slices/auth/auth-slice";
import { Button } from "@/components/ui/button";
import {
  User,
  BotMessageSquare,
  LogOut,
  CheckCircle2,
  Circle,
  Plus,
  CornerUpRight,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: 1,
    label: "Personal Profile",
    description: "Set up your identity and avatar",
    icon: User,
  },
  {
    id: 2,
    label: "Company Info",
    description: "Tell us about your organization",
    icon: Briefcase,
  },
  {
    id: 3,
    label: "Connect Resources",
    description: "Connect social & eCommerce",
    icon: Plus,
  },
  {
    id: 4,
    label: "AI Agent Profile",
    description: "Configure your virtual assistant",
    icon: BotMessageSquare,
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.ui.onboardingStep);

  const pages: any[] = [
    ProfileUpdateCard,
    CompanyIdentityCard,
    ConnectResourcesCard,
    CreateAgentCard,
  ];

  const totalPages = pages.length;
  const isLast = currentPage === totalPages;

  const next = () => {
    if (!isLast) {
      dispatch(setOnboardingStep(currentPage + 1));
    } else {
      dispatch(completeOnboarding());
      dispatch(resetOnboardingStep());
      navigate("/");
    }
  };

  const prev = () => {
    if (currentPage > 1) {
      dispatch(setOnboardingStep(currentPage - 1));
    }
  };

  const handleSkip = () => {
    dispatch(completeOnboarding());
    dispatch(resetOnboardingStep());
    navigate("/");
  };

  const handleLogout = () => {};

  const CurrentPage = pages[currentPage - 1];
  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* LEFT SIDEBAR */}
      <aside className="w-1/5 shrink-0 flex flex-col bg-background px-4 py-6 h-full overflow-y-auto">
        {/* Header Section */}
        <div className="mb-10">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSkip}
            className="rounded-lg mb-8"
          >
            Skip Now
            <CornerUpRight className="h-3 w-3" />
          </Button>

          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-medium text-foreground tracking-tight">
              Welcome to
            </h2>
            <h1 className="text-4xl font-bold text-foreground">Butterchat</h1>
          </div>
          <p className="text-sm mt-2 text-muted-foreground">
            Provide the necessary info to complete your setup and start
            automating your customer support.
          </p>
        </div>

        {/* Steps */}
        <nav className="flex flex-col gap-2 flex-1">
          {steps.map((step) => {
            const Icon = step.icon;
            const isCompleted = currentPage > step.id;
            const isActive = currentPage === step.id;
            return (
              <button
                key={step.id}
                onClick={() => dispatch(setOnboardingStep(step.id))}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors",
                  isActive ? "bg-accent" : "hover:bg-accent/50",
                )}
              >
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-md border",
                    isActive ? "border-primary" : "border-border",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      "text-sm font-medium truncate",
                      isActive ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {step.label}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {step.description}
                  </p>
                </div>
                <div className="shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  ) : (
                    <Circle
                      className={cn(
                        "h-5 w-5",
                        isActive ? "text-primary" : "text-muted-foreground/40",
                      )}
                    />
                  )}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-border pt-4 mt-4">
          <Button
            variant="secondary"
            onClick={handleLogout}
            className="w-full flex float-start"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* RIGHT CONTENT */}
      <main className="flex-1 m-2 rounded-2xl bg-popover overflow-y-auto scrollbar-hide">
        <div className="min-h-full flex items-center justify-center p-2">
          <div className="w-full max-w-md">
            <CurrentPage
              isFirst={currentPage === 1}
              isLast={currentPage === pages.length}
              onNext={next}
              onPrev={prev}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
