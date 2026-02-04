import React from "react";
import { ChevronDown, ArrowUpRight, User, Users, X } from "lucide-react";
import messageData from "@/constants/dummy/user.json";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {closeUserSidebar} from "@/store/slices/ui/ui-slice";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
  SidebarHeader,
  SidebarContent,
} from "@/components/ui/sidebar";

const CollapsibleSection = ({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Collapsible defaultOpen={defaultOpen} className="group/collapsible">
      <Separator className="bg-border" />
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="flex w-full items-center justify-between py-4 px-0 h-auto hover:bg-transparent"
        >
          <span className="text-sm font-semibold text-foreground uppercase tracking-wider">
            {title}
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pb-4">{children}</CollapsibleContent>
    </Collapsible>
  );
};

const Tag = ({ label }: { label: string }) => (
  <Badge
    variant="secondary"
    className="bg-muted text-muted-foreground rounded-xl px-2.5 py-0.5 text-xs font-normal border-none"
  >
    {label}
  </Badge>
);

export function UserSidebar() {
  const selectedInboxUserId = useAppSelector(
    (state) => state.ui.selectedInboxUserId,
  );
  const dispatch = useAppDispatch();

  const selectedUser =
    (messageData as any[]).find((u) => u.id === selectedInboxUserId) ||
    (messageData as any[])[0];

  if (!selectedUser) return null;

  const {
    user,
    assignment,
    tags,
    recentConversations,
    interactedProducts,
    recentOrders,
  } = selectedUser;

  return (
    <div className="flex bg-popover rounded-xl border border-border dark:border-none h-full flex-col">
      <SidebarHeader className="border-b p-4 border-border h-16 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold">Customer</span>
        </div>
        <Button
          variant="ghost"
          onClick={() => {
            dispatch(closeUserSidebar());
          }}
          size="icon"
          className="h-7 w-7"
        >
          <X className="h-4 w-4" />
        </Button>
      </SidebarHeader>

      <SidebarContent className="scrollbar-hide p-4">
        <div className="h-full">
          {/* User Profile */}
          <div className="pb-4 space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  {user.name}
                </h3>
                <a
                  href={user.sourceUrl}
                  className="inline-flex items-center gap-1 text-base font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                  Source: {user.source}
                  <ArrowUpRight className="h-4 w-4 flex-shrink-0" />
                </a>
              </div>
            </div>

            {/* Assignment Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground pr-2 text-base">
                  Assigned to
                </span>
                <div className="flex items-center gap-1.5 text-foreground font-medium">
                  <User className="h-4 w-4 text-muted-foreground" />
                  {assignment.assignedTo}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground pr-2 text-base">
                  Group
                </span>
                <div className="flex items-center gap-1.5 text-foreground font-medium">
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                  {assignment.group}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag: string, index: number) => (
                <Tag key={index} label={tag} />
              ))}
            </div>
          </div>
          {/* Recent Conversation */}
          <CollapsibleSection title="Recent Conversation">
            <div className="space-y-4">
              {recentConversations.map((conv: any, index: number) => (
                <div key={index} className="space-y-1">
                  <p className="text-sm font-medium uppercase">
                    {conv.timestamp}
                  </p>
                  <p className="text-sm text-muted-foreground truncate leading-snug">
                    {conv.message}
                  </p>
                </div>
              ))}
            </div>
          </CollapsibleSection>

          {/* Interacted Products */}
          <CollapsibleSection title="Interacted Products">
            <div className="space-y-4">
              {interactedProducts.map((product: any) => (
                <div key={product.id} className="flex items-center gap-3 group">
                  <Avatar className="h-12 w-12 rounded-lg border border-border">
                    <AvatarImage
                      src={product.image}
                      alt={product.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="rounded-lg">P</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <a
                      href={product.url}
                      className="flex items-center gap-1 text-base text-foreground font-normal"
                    >
                      <span className="truncate">{product.name}</span>
                      <ArrowUpRight className="h-4 w-4 flex-shrink-0" />
                    </a>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground text-sm font-semibold">
                        {product.price}
                      </span>
                      <span className="truncate text-muted-foreground">
                        {product.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>

          {/* Recent Orders */}
          <CollapsibleSection title="Recent Orders">
            <div className="space-y-4">
              {recentOrders.map((order: any, index: number) => (
                <div key={index} className="flex items-center gap-3 group">
                  <Avatar className="h-12 w-12 rounded-lg border border-border">
                    <AvatarImage
                      src={order.image}
                      alt={order.productName}
                      className="object-cover"
                    />
                    <AvatarFallback className="rounded-lg">
                      {" "}
                      <Users />{" "}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <a
                      href={order.url}
                      className="flex items-center gap-1 text-base text-foreground font-normal"
                    >
                      <span className="truncate">{order.productName}</span>
                      <ArrowUpRight className="h-4 w-4 flex-shrink-0" />
                    </a>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground text-sm font-semibold">
                        {order.id}
                      </span>
                      <span className="truncate text-muted-foreground font-normal ml-1">
                        {order.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        </div>
      </SidebarContent>
    </div>
  );
}

export default UserSidebar;
