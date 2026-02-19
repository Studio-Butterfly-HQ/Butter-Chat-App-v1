import { Suspense, lazy, ReactNode } from "react";
import { useAppSelector } from "@/store/hooks";
const YourInboxPage = lazy(() => import("./your-inbox/your-inbox-page"));
const UnassignedPage = lazy(() => import("./unassigned/unassigned-page"));

const Placeholder = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-full text-muted-foreground p-4">
    {title}
  </div>
);

export default function InboxLayout() {
  const activeInboxTab = useAppSelector((state) => state.ui.activeInboxTab);

  const INBOX_VIEWS: Record<string, ReactNode> = {
    "your-inbox": <YourInboxPage />,
    unassigned: <UnassignedPage />,
    "closed-box": <Placeholder title="Closed Box Content" />,
    "closed-chat": <Placeholder title="Closed Chat Content" />,
    "category-ecommerce": <Placeholder title="Category: eCommerce" />,
    "category-general": <Placeholder title="Category: General" />,
    "category-support": <Placeholder title="Category: Support" />,
    "view-ecommerce": <Placeholder title="View: eCommerce" />,
    "view-general": <Placeholder title="View: General" />,
    "view-support": <Placeholder title="View: Support" />,
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-full">
            Loading...
          </div>
        }
      >
        {INBOX_VIEWS[activeInboxTab] || <YourInboxPage />}
      </Suspense>
    </div>
  );
}
