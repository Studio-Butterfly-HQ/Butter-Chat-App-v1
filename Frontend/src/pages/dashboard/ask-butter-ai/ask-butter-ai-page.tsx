import ChatBox from "@/components/dashboard/butter-ai/chat-box";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AskButterAiPage() {
  return (
    <div className="flex dark:h-[calc(100vh-1.5rem)] h-[calc(100vh-1.6rem)] flex-col justify-center overflow-hidden">
      <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-6"
          />
          <h1 className="text-sm md:text-base font-semibold">ButterAI 3.2</h1>
        </div>
        <div className="flex items-center gap-2 px-4">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </header>
      <ChatBox />
    </div>
  );
}
