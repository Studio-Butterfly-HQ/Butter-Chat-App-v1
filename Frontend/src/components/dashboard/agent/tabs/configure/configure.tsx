import { useState } from "react";
import { Agent } from "@/provider/agent/agent.types";
import { Accordion } from "@/components/ui/accordion";
import { IdentityForm } from "./IdentityForm";
import { PersonalityForm } from "./PersonalityForm";
import { InstructionsForm } from "./InstructionsForm";
import { FallbackForm } from "./FallbackForm";
import { HandoverForm } from "./HandoverForm";

interface ConfigureProps {
  selectedAgent?: Agent;
}

export const Configure = ({ selectedAgent }: ConfigureProps) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const closeItem = (itemToDelete: string) => {
    setOpenItems((prev) => prev.filter((item) => item !== itemToDelete));
  };

  return (
    <div className="p-4 pt-0 space-y-3 max-w-full overflow-x-hidden">
      <Accordion
        type="multiple"
        value={openItems}
        onValueChange={setOpenItems}
        className="space-y-3"
      >
        <IdentityForm
          selectedAgent={selectedAgent}
          onToggle={() => closeItem("identity")}
        />
        <PersonalityForm
          selectedAgent={selectedAgent}
          onToggle={() => closeItem("personality")}
        />
        <InstructionsForm
          selectedAgent={selectedAgent}
          onToggle={() => closeItem("general-instruction")}
        />
        <FallbackForm
          selectedAgent={selectedAgent}
          onToggle={() => closeItem("ai-unable")}
        />
        <HandoverForm
          selectedAgent={selectedAgent}
          onToggle={() => closeItem("human-agent")}
        />
      </Accordion>
    </div>
  );
};
