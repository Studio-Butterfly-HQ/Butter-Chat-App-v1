import { useEffect } from "react";
import Header from "@/components/onboarding/header";
import PaginationDots from "@/components/onboarding/pagination-dots";
import ProfileUpdateCard from "@/components/profile/profile-update-card";
import ConnectResourcesCard from "@/components/connect/connect-resources-card";
import CreateAgentCard from "@/components/dashboard/agent/create-agent-card";
import Footer from "@/components/onboarding/footer";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setOnboardingStep,
  resetOnboardingStep,
} from "@/store/slices/ui/ui-slice";

interface OnboardingStepProps {
  isFirst: boolean;
  isLast: boolean;
}

export default function Onboarding() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.ui.onboardingStep);

  const pages: React.ComponentType<OnboardingStepProps>[] = [
    ProfileUpdateCard,
    ConnectResourcesCard,
    CreateAgentCard,
  ];
  const pageTitles = [
    "Profile Information",
    "Connect Resources",
    "Create AI Agent",
  ];
  const totalPages = pages.length;
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  const next = () => {
    if (!isLast) {
      dispatch(setOnboardingStep(currentPage + 1));
    } else {
      dispatch(resetOnboardingStep());
      navigate("/");
    }
  };

  const prev = () => {
    if (!isFirst) dispatch(setOnboardingStep(currentPage - 1));
  };

  useEffect(() => {
    return () => {
      dispatch(resetOnboardingStep());
    };
  }, [dispatch]);

  const CurrentPage = pages[currentPage - 1];
  return (
    <div className="min-h-screen flex flex-col p-6 lg:p-8 lg:pt-0 pt-0">
      <Header />
      <main className="flex-1 flex items-center justify-center lg:p-4">
        <div className="w-full max-w-md">
          <CurrentPage
            isFirst={currentPage === 1}
            isLast={currentPage === pages.length}
          />
        </div>
      </main>
      <PaginationDots
        currentPage={currentPage}
        totalPages={pages.length}
        onPageChange={(page) => dispatch(setOnboardingStep(page))}
      />
      <Footer
        currentPage={currentPage}
        totalPages={totalPages}
        pageTitles={pageTitles}
        onPrev={prev}
        onNext={next}
      />
    </div>
  );
}
