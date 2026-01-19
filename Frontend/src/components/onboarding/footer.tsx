import { ChevronLeft, ChevronRight } from "lucide-react"

interface FooterProps {
  currentPage: number
  totalPages: number
  pageTitles: string[]
  onPrev: () => void
  onNext: () => void
}

export default function Footer({
  currentPage,
  totalPages,
  pageTitles,
  onPrev,
  onNext,
}: FooterProps) {
  const hasPrev = currentPage > 1
  const isLast = currentPage === totalPages

  return (
    <footer className="w-full flex items-center justify-between">
      
      {/* PREVIOUS */}
      {hasPrev ? (
        <div
          onClick={onPrev}
          role="button"
          tabIndex={0}
          className="flex items-center text-muted-foreground hover:text-foreground transition gap-1 cursor-pointer"
        >
          <ChevronLeft className="text-foreground"  size={28} />
          <span className="text-sm lg:text-base ">{pageTitles[currentPage - 2]}</span>
        </div>
      ) : (
        <div />
      )}

      {/* NEXT / HOME */}
      <div
        onClick={onNext}
        role="button"
        tabIndex={0}
        className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition cursor-pointer"
      >
        <span className=" text-sm lg:text-base ">{isLast ? "Home Page" : pageTitles[currentPage]}</span>
        <ChevronRight className="text-foreground" size={28} />
      </div>
    </footer>
  )
}
