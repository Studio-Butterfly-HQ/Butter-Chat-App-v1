import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CircleCheck,
  Link,
  Plus,
  Facebook,
  Instagram,
  MessageCircle,
  Handbag,
} from "lucide-react";
import {
  useGetSocialConnections,
  useInitiateFacebookConnection,
} from "@/provider/connections";
import { toast } from "sonner";

interface ConnectionConfig {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: "social" | "ecommerce";
}

const CONNECTION_CONFIG: ConnectionConfig[] = [
  {
    id: "facebook",
    name: "Connect Facebook",
    icon: <Facebook className="text-primary-foreground" />,
    category: "social",
  },
  {
    id: "instagram",
    name: "Connect Instagram",
    icon: <Instagram className="text-primary-foreground" />,
    category: "social",
  },
  {
    id: "whatsapp",
    name: "Connect Whatsapp",
    icon: <MessageCircle className="text-primary-foreground" />,
    category: "social",
  },
  {
    id: "woocommerce",
    name: "Integrate WooCommerce",
    icon: <Handbag className="text-primary-foreground" />,
    category: "ecommerce",
  },
  {
    id: "shopify",
    name: "Connect Shopify",
    icon: <Handbag className="text-primary-foreground" />,
    category: "ecommerce",
  },
];

export default function ConnectResourcesCard() {
  const {mutateAsync: initiateFacebookConnection, isPending: isInitiatingFacebookConnection,} = useInitiateFacebookConnection();

  const {data: socialConnectionsData, refetch} = useGetSocialConnections();

  // derive connection status from backend
  const isConnected = (id: string) =>
    socialConnectionsData?.some(
      (sc) => sc.platform_type?.toLowerCase() === id.toLowerCase()
    );

  // handle redirect success / failure
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const connected = params.get("connected");
    const error = params.get("error");

    if (connected === "facebook") {
      toast.success("Facebook connected successfully");
      refetch();
    }

    if (error === "facebook_cancelled") {
      toast.error("Facebook connection cancelled");
    }

    if (error === "facebook_failed") {
      toast.error("Facebook connection failed");
    }

    if (connected || error) {
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  const handleConnect = async (id: string) => {
    if (id === "facebook") {
      try {
        await initiateFacebookConnection();
      } catch (error) {
        console.error("Error initiating Facebook connection:", error);
      }
    }
  };

  const socialConnections = CONNECTION_CONFIG.filter((c) => c.category === "social");

  const ecommerceConnections = CONNECTION_CONFIG.filter((c) => c.category === "ecommerce");

  return (
    <Card className="bg-background border-0 shadow-none">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Link className="text-primary" size={32} />
        </div>
        <CardTitle className="text-3xl">Connect Resources</CardTitle>
        <CardDescription className="text-lg">
          Add additional info to complete your profile
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Social Media Section */}
        <div className="space-y-2">
          <h3 className="font-semibold text-primary text-base">
            Social Media
          </h3>
          <div className="space-y-2">
            {socialConnections.map((connection) => {
              const connected = isConnected(connection.id);

              return (
                <div
                  key={connection.id}
                  className="flex items-center font-medium text-sm justify-between p-3 bg-primary rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{connection.icon}</span>
                    <span className="text-sm text-primary-foreground">
                      {connection.name}
                    </span>
                  </div>

                  <button
                    onClick={() => handleConnect(connection.id)}
                    disabled={connected || isInitiatingFacebookConnection}
                    className={`rounded-full flex items-center justify-center transition-all ${
                      connected
                        ? "bg-green-500 cursor-default"
                        : "cursor-pointer"
                    }`}
                  >
                    {connected ? (
                      <CircleCheck className="text-primary-foreground" />
                    ) : (
                      <Plus className="text-primary-foreground" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* eCommerce Section */}
        <div className="space-y-2">
          <h3 className="font-semibold text-primary text-base">
            Connect eCommerce
          </h3>
          <div className="space-y-2">
            {ecommerceConnections.map((connection) => {
              const connected = isConnected(connection.id);

              return (
                <div
                  key={connection.id}
                  className="flex items-center font-medium text-sm justify-between p-3 bg-primary rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{connection.icon}</span>
                    <span className="text-sm text-primary-foreground">
                      {connection.name}
                    </span>
                  </div>

                  <button
                    onClick={() => handleConnect(connection.id)}
                    disabled={connected}
                    className={`rounded-full flex items-center justify-center transition-all ${
                      connected
                        ? "bg-green-500 cursor-default"
                        : "cursor-pointer"
                    }`}
                  >
                    {connected ? (
                      <CircleCheck className="text-primary-foreground" />
                    ) : (
                      <Plus className="text-primary-foreground" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <Button className="w-full font-medium">
          Go ahead
        </Button>
      </CardContent>
    </Card>
  );
}
