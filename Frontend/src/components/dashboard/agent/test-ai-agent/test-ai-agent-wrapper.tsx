import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLocation } from "react-router-dom"

import { Sidebar } from "@/components/ui/sidebar"
import AIAgentChat from "@/components/dashboard/agent/test-ai-agent/test-ai-agent"
import { useAppSelector } from "@/store/hooks"
import { cn } from "@/lib/utils"

export function TestAiAgentWrapper(
  props: React.ComponentProps<typeof Sidebar>,
) {
  const location = useLocation()
  const isTestAiAgentPage = location.pathname.startsWith("/ai-agent")

  const isOpen = useAppSelector(
    (state) => state.ui.isTestAiAgentOpen,
  )

  if (!isTestAiAgentPage) return null

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "25vw" }}
          exit={{ width: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="sticky top-0 h-svh hidden lg:flex overflow-hidden"
        >
          <Sidebar
            {...props}
            collapsible="none"
            className={cn("h-full bg-background rounded-xl p-3 pl-0 flex-shrink-0",props.className,)}
            style={{ width: "25vw" }}
          >
            <AIAgentChat />
          </Sidebar>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
