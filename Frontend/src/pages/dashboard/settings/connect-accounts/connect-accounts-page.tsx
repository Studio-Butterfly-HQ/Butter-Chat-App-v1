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

export default function ConnectAccountsPage() {
  const [connectedAccounts, setConnectedAccounts] = useState([
    {
      id: 1,
      name: "Facebook",
      username: "Studio Butterfly",
      platform: "facebook",
    },
    {
      id: 2,
      name: "Whatsapp",
      username: "Whatsapp (9569894456)",
      platform: "whatsapp",
    },
    {
      id: 3,
      name: "Whatsapp",
      username: "WhatsApp (+880 1305-270845)",
      platform: "whatsapp",
    },
  ]);

  const availableAccounts = [
    {
      name: "Facebook Messenger",
      description: "Connect your Facebook pages.",
      platform: "messenger",
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

  const handleDisconnect = (id: number) => {
    setConnectedAccounts(connectedAccounts.filter((acc) => acc.id !== id));
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
            className="cursor-pointer rounded-full hover:bg-accent px-2 md:px-3 py-1.5 text-xs font-normal whitespace-nowrap"
          >
            <BookOpen className="h-3 w-3 mr-1.5" />
            <span>Learn More</span>
          </Badge>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Connect Social Accounts Card */}
        <Card>
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
                <Button variant="default" size="sm" className="h-8 gap-1.5">
                  <Plus className="h-3.5 w-3.5" />
                  Connect
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Connected Accounts Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Connected Accounts</CardTitle>
            <CardDescription>
              You have {connectedAccounts.length} account(s) connected.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {connectedAccounts.length === 0 ? (
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
                    <p className="font-medium text-base">{account.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {account.username}
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="h-8 gap-1.5"
                    onClick={() => handleDisconnect(account.id)}
                  >
                    <X className="h-3.5 w-3.5" />
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
