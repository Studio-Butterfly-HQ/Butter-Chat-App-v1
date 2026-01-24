import { NavLink, useNavigate } from "react-router-dom"
import { useAppDispatch } from "@/store/hooks"
import { logout } from "@/store/slices/auth/auth-slice"
import { persistor } from "@/store"

import type { LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavProjects({ projects,}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    dispatch(logout())
    await persistor.purge()
    navigate("/login", { replace: true })
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            {item.name === "Log out" ? (
              <SidebarMenuButton onClick={handleLogout}>
                <item.icon />
                <span>{item.name}</span>
              </SidebarMenuButton>
            ) : (
              <SidebarMenuButton asChild>
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-2 font-medium text-foreground"
                      : "flex items-center gap-2 text-muted-foreground"
                  }
                >
                  <item.icon />
                  <span>{item.name}</span>
                </NavLink>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
