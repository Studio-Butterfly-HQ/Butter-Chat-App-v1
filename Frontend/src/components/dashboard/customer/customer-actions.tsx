import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Eye, Inbox, Ban, LogOut } from "lucide-react";
import type { Customer } from "@/provider/customer";

interface CustomerActionsProps {
  customer: Customer;
}

export const CustomerActions = ({ customer }: CustomerActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
        <EllipsisVertical className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44 rounded-lg">
        <DropdownMenuLabel className="font-normal text-muted-foreground text-xs">
          Customer More Options
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Eye className="h-4 w-4" />
          View
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Inbox className="h-4 w-4" />
          View Inbox
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Ban className="h-4 w-4" />
          Suspend
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="h-4 w-4" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
