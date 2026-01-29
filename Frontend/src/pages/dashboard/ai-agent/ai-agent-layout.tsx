import { Outlet } from 'react-router-dom'

export default function AiAgentLayout() {
  return (
    <div className="min-h-[calc(100vh-1.5rem)] overflow-y-auto bg-popover rounded-xl">
      <Outlet />
    </div>
  )
}
