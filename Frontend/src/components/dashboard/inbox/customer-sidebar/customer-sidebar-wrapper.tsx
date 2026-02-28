import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar } from "@/components/ui/sidebar";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import CustomerSidebar from "@/components/dashboard/inbox/customer-sidebar/customer-sidebar";
import { closeUserSidebar } from "@/store/slices/ui/ui-slice";

export function CustomerSidebarWrapper({
  children,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isInboxPage = location.pathname.startsWith("/inbox");
  const isUserSidebarOpen = useAppSelector(
    (state) => state.ui.isUserSidebarOpen,
  );
  useEffect(() => {
    if (!isInboxPage && isUserSidebarOpen) {
      dispatch(closeUserSidebar());
    }
  }, [isInboxPage, isUserSidebarOpen, dispatch]);

  if (!isInboxPage || !isUserSidebarOpen) {
    return null;
  }

  return (
    <Sidebar
      collapsible="none"
      side="right"
      className="sticky hidden lg:flex bg-background top-0 h-svh p-2 pl-0 w-1/5"
      {...props}
    >
      <CustomerSidebar />
    </Sidebar>
  );
}
