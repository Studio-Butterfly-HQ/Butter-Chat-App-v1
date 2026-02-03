import * as React from "react";
import { useLocation } from "react-router-dom";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import CustomerChat from "@/components/dashboard/inbox/chat/customer-chat";
import { closeCustomerChat } from "@/store/slices/ui/ui-slice";

export function CustomerChatWrapper({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isInboxPage = location.pathname.startsWith("/inbox");
  const isCustomerChatOpen = useAppSelector(
    (state) => state.ui.isCustomerChatOpen,
  );

  if (!isInboxPage || !isCustomerChatOpen) {
    if (isCustomerChatOpen) {
      dispatch(closeCustomerChat());
    }
    return null;
  }

  return (
    <Sidebar
      collapsible="none"
      side="right"
      className="sticky hidden lg:flex top-0 h-svh p-3 pl-0 w-[42%]"
      {...props}
    >
      <SidebarContent className="bg-transparent overflow-hidden">
        <CustomerChat />
      </SidebarContent>
    </Sidebar>
  );
}
