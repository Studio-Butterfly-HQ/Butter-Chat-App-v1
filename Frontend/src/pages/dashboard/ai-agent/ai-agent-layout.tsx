import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { resetAiAgentTabs } from "@/store/slices/ui/ui-slice";

export default function AiAgentLayout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetAiAgentTabs());
    };
  }, [dispatch]);

  return (
    <div className="flex h-full flex-col">
      <Outlet />
    </div>
  );
}
