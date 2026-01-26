import {
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Crown,
  Sun,
  Moon,
  User,
  Users,
  Activity,
} from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/auth/auth-slice";
import { persistor } from "@/store";
import { useTheme } from "@/provider/theme-provider";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setTheme, theme } = useTheme();

  const handleLogout = async () => {
    dispatch(logout());
    await persistor.purge();
    navigate("/login", { replace: true });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-sm">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {user.name?.[0] ?? "U"}
                </AvatarFallback>
              </Avatar>              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-popover"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5">
                <Avatar className="h-8 w-8 rounded-sm">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {user.name?.[0] ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {/* THEME TOGGLE (ACTION, NOT LINK) */}
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <NavLink to="#">
                  <Crown className="h-4 w-4" />
                  Premium Features
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault()
                  setTheme(theme === "dark" ? "light" : "dark");
                }}
                className="flex items-center gap-2 cursor-pointer"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="h-4 w-4" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4" />
                    Dark Mode
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            {/* ACCOUNT LINKS */}
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <NavLink to="#">
                  <User className="h-4 w-4" />
                  Account
                </NavLink>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <NavLink to="#">
                  <CreditCard className="h-4 w-4" />
                  Billing
                </NavLink>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <NavLink to="/dashboard/teams">
                  <Users className="h-4 w-4" />
                  Team
                </NavLink>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <NavLink to="#">
                  <Activity className="h-4 w-4" />
                  Activity
                </NavLink>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
