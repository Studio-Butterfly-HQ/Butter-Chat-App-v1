import { Outlet } from 'react-router-dom'

export default function AiAgentLayout() {
  return (
    <div className="min-h-screen bg-popover rounded-xl">
      <Outlet />
    </div>
  )
}
