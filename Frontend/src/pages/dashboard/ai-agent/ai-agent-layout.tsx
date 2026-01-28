import { Outlet } from 'react-router-dom'

export default function AiAgentLayout() {
  return (
    <div className="min-h-[calc(100vh-90px)] bg-popover rounded-b-xl">
      <Outlet />
    </div>
  )
}
