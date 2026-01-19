interface PaginationDotsProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function PaginationDots({ currentPage, totalPages, onPageChange }: PaginationDotsProps) {
  return (
    <div className="flex pb-4 justify-center gap-2">
      {Array.from({ length: totalPages }).map((_, index) => {
        const pageNum = index + 1
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentPage === pageNum ? "bg-green-500" : "bg-muted-foreground"
            }`}
            aria-label={`Go to page ${pageNum}`}
            aria-current={currentPage === pageNum ? "page" : undefined}
          />
        )
      })}
    </div>
  )
}
