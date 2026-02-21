import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronDown, ArrowUpRight, User, Users, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeUserSidebar } from "@/store/slices/ui/ui-slice";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { SidebarHeader, SidebarContent } from "@/components/ui/sidebar";

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

// Dummy data
const dummyRecentConversations = [
  {
    timestamp: "03:05 AM - Dec 17, 2025",
    message: "Thanks for trying that. I'm going to check again.",
  },
  {
    timestamp: "10:15 AM - Jan 14, 2026",
    message: "I have a question about my last invoice.",
  },
  {
    timestamp: "06:45 PM - Jan 10, 2026",
    message: "The product arrived damaged. Can I get a replacement?",
  },
];

const dummyInteractedProducts = [
  {
    id: 1,
    name: "Strawberry Watermelon Flavor",
    price: "b1,188.00",
    timestamp: "03:05 AM - Dec 17, 2025",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=60&h=60&fit=crop",
    url: "#",
  },
  {
    id: 2,
    name: "Mango Ice",
    price: "b1,150.00",
    timestamp: "02:40 AM - Dec 16, 2025",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=60&h=60&fit=crop",
    url: "#",
  },
  {
    id: 3,
    name: "Grape Blast",
    price: "b1,200.00",
    timestamp: "01:20 AM - Dec 15, 2025",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=60&h=60&fit=crop",
    url: "#",
  },
];

const dummyRecentOrders = [
  {
    id: "#18756",
    timestamp: "03:05 AM - Dec 17, 2025",
    productName: "Strawberry Watermelon Flavor",
    image: null as string | null,
    url: "#",
  },
  {
    id: "#18720",
    timestamp: "11:30 PM - Dec 16, 2025",
    productName: "Mango Ice",
    image: null as string | null,
    url: "#",
  },
  {
    id: "#18698",
    timestamp: "09:10 PM - Dec 15, 2025",
    productName: "Grape Blast",
    image: null as string | null,
    url: "#",
  },
];

export function UserSidebar() {
  const selectedInboxUserId = useAppSelector(
    (state) => state.ui.selectedInboxUserId,
  );
  const unassignedRecord = useAppSelector((state) => state.chat.unassigned);
  const activeRecord = useAppSelector((state) => state.chat.active);
  const dispatch = useAppDispatch();

  const selectedConversation = useMemo(() => {
    if (!selectedInboxUserId) return null;
    return (
      unassignedRecord[selectedInboxUserId] ??
      activeRecord[selectedInboxUserId] ??
      null
    );
  }, [selectedInboxUserId, unassignedRecord, activeRecord]);

  useEffect(() => {
    if (selectedInboxUserId && !selectedConversation) {
      dispatch(closeUserSidebar());
    }
  }, [selectedInboxUserId, selectedConversation, dispatch]);

  if (!selectedConversation) return null;

  const { customer, assigned_to, department, tags } = selectedConversation;

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
                <AvatarImage src={customer.picture} alt={customer.name} />
                <AvatarFallback>
                  {customer.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  {customer.name}
                </h3>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-base font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                  Source: {customer.source}
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
                  {assigned_to?.name || "Unassigned"}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground pr-2 text-base">
                  Group
                </span>
                <div className="flex items-center gap-1.5 text-foreground font-medium">
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                  {department?.department_name || "General"}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {(tags ?? []).map((tag: string, index: number) => (
                <Tag key={index} label={tag} />
              ))}
            </div>
          </div>
          {/* Recent Conversation */}
          <CollapsibleSection title="Recent Conversation">
            <div className="space-y-4">
              {dummyRecentConversations.map((conv, index) => (
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
              {dummyInteractedProducts.map((product) => (
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
              {dummyRecentOrders.map((order, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <Avatar className="h-12 w-12 rounded-lg border border-border">
                    <AvatarImage
                      src={order.image || ""}
                      alt={order.productName}
                      className="object-cover"
                    />
                    <AvatarFallback className="rounded-lg">
                      <Users />
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
