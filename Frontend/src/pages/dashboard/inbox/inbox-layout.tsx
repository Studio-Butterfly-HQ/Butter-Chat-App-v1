import { Outlet } from "react-router-dom";

export default function InboxLayout() {
  return (
    <div className="flex h-full flex-col">
      <Outlet />
    </div>
  );
}
