import { useState, useEffect } from "react"
import Header from "@/components/onboarding/header"
import PaginationDots from "@/components/onboarding/pagination-dots"
import ProfileUpdateCard from "@/components/profile/profile-update-card"
import ConnectResourcesCard from "@/components/connect/connect-resources-card"
import CreateAgentCard from "@/components/agent/create-agent-card"
import Footer from "@/components/onboarding/footer"
import { useNavigate } from "react-router-dom"

interface OnboardingStepProps {
  isFirst: boolean
  isLast: boolean
}

export default function Onboarding() {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState<number>(() => { 
    const saved = localStorage.getItem("onboarding_step");
    return saved ? Number(saved) : 1
  })

  const pages: React.ComponentType<OnboardingStepProps>[] = [
    ProfileUpdateCard,
    ConnectResourcesCard,
    CreateAgentCard,
  ]
  const pageTitles = [
    "Profile Information",
    "Connect Resources",
    "Create AI Agent",
  ]
  const totalPages = pages.length
  const isFirst = currentPage === 1
  const isLast = currentPage === totalPages

  const next = () => {
    if (!isLast) {
      setCurrentPage(p => p + 1)
    } else {
      localStorage.removeItem("onboarding_step");
      navigate("/")
    }
  }

  const prev = () => {
    if (!isFirst) setCurrentPage(p => p - 1)
  }
  
  useEffect(() => {
    localStorage.setItem("onboarding_step", String(currentPage))
  }, [currentPage])


  const CurrentPage = pages[currentPage - 1]
  return (
    <div className="min-h-screen flex flex-col p-6 lg:p-8 lg:pt-0 pt-0">
      <Header/>
      <main className="flex-1 flex items-center justify-center lg:p-8 py-4">
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
        onPageChange={setCurrentPage}
      />
      <Footer
        currentPage={currentPage}
        totalPages={totalPages}
        pageTitles={pageTitles}
        onPrev={prev}
        onNext={next}
      />
    </div>
  )
}
