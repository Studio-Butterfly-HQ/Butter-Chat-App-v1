import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AccountsSkeleton } from "@/components/dashboard/settings/connect-accounts/accounts-skeletons";
import { useGetSocialConnections } from "@/provider/connections/connections.queries";
import { toast } from "sonner";

export default function ConnectAccountsPage() {
  const { data: connectedAccounts, isLoading } = useGetSocialConnections();

  const availableAccounts = [
    {
      name: "Facebook",
      description: "Connect your Facebook pages.",
      platform: "Facebook",
    },
    {
      name: "Instagram",
      description: "Connect your Instagram business accounts.",
      platform: "instagram",
    },
    {
      name: "WhatsApp Business",
      description: "Connect your WhatsApp business number.",
      platform: "whatsapp",
    },
  ];

  const handleDisconnect = (id: string) => {
    // TODO: Implement disconnect logic
    toast.info("Disconnect functionality coming soon");
    console.log("Disconnecting", id);
  };

  return (
    <>
      <header className="flex flex-col border-b border-border md:flex-row mb-0.5 min-h-16 md:h-16 shrink-0 items-start md:items-center justify-between gap-3 md:gap-2 py-3 md:py-0 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 w-full md:w-auto">
          <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
            <span className="text-sm md:text-base font-semibold whitespace-nowrap">
              Connect Accounts
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 w-full md:w-auto justify-start md:justify-end overflow-x-auto">
          <Badge
            variant="outline"
            className="cursor-pointer text-muted-foreground rounded-full hover:bg-accent px-2 md:px-3 py-1.5 text-xs font-normal whitespace-nowrap"
          >
            <BookOpen className="h-3 w-3 mr-1.5" />
            <span>Learn More</span>
          </Badge>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Connect Social Accounts Card */}
        <Card className="bg-transparent">
          <CardHeader>
            <CardTitle className="text-xl">Connect Social Accounts</CardTitle>
            <CardDescription>
              Allow your AI agent and team to respond to messages from these
              platforms.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {availableAccounts.map((account) => (
              <div
                key={account.platform}
                className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-base">{account.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {account.description}
                  </p>
                </div>
                <Button variant="default" size="sm" className="h-8">
                  <Plus />
                  Connect
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Connected Accounts Card */}
        <Card className="bg-transparent">
          <CardHeader>
            <CardTitle className="text-xl">Connected Accounts</CardTitle>
            <CardDescription>
              {isLoading
                ? "Loading your connected accounts..."
                : `You have ${
                    connectedAccounts?.length
                      ? `${connectedAccounts.length} ${
                          connectedAccounts.length === 1
                            ? "account"
                            : "accounts"
                        }`
                      : "no accounts"
                  } connected.`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {isLoading ? (
              <AccountsSkeleton />
            ) : !connectedAccounts || connectedAccounts.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No accounts connected yet.
              </p>
            ) : (
              connectedAccounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-base">
                      {account.platform_name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {account.platform_type}
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="h-8"
                    onClick={() => handleDisconnect(account.id)}
                  >
                    <X />
                    Disconnect
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
