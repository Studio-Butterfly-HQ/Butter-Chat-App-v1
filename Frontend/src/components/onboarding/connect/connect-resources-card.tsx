import { useState, useEffect } from "react";
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

interface Connection {
  id: string;
  name: string;
  icon: React.ReactNode;
  connected: boolean;
  category: "social" | "ecommerce";
  url: string;
}

export default function ConnectResourcesCard() {
  const {
    mutateAsync: initiateFacebookConnection,
    isPending: isInitiatingFacebookConnection,
  } = useInitiateFacebookConnection();
  const {
    data: socialConnectionsData,
    refetch,
    isLoading,
  } = useGetSocialConnections();

  const [connections, setConnections] = useState<Connection[]>([
    {
      id: "facebook",
      name: "Connect Facebook",
      icon: <Facebook className="text-primary-foreground" />,
      connected: false,
      category: "social",
      url: "",
    },
    {
      id: "instagram",
      name: "Connect Instagram",
      icon: <Instagram className="text-primary-foreground" />,
      connected: false,
      category: "social",
      url: "",
    },
    {
      id: "whatsapp",
      name: "Connect Whatsapp",
      icon: <MessageCircle className="text-primary-foreground" />,
      connected: false,
      category: "social",
      url: "",
    },
    {
      id: "woocommerce",
      name: "Integrate WooCommerce",
      icon: <Handbag className="text-primary-foreground" />,
      connected: false,
      category: "ecommerce",
      url: "",
    },
    {
      id: "shopify",
      name: "Connect Shopify",
      icon: <Handbag className="text-primary-foreground" />,
      connected: false,
      category: "ecommerce",
      url: "",
    },
  ]);

  // Sync state with backend data
  useEffect(() => {
    if (socialConnectionsData) {
      setConnections((prev) =>
        prev.map((conn) => {
          const backendConn = socialConnectionsData.find(
            (sc) => sc.platform_name.toLowerCase() === conn.id,
          );
          if (backendConn) {
            return {
              ...conn,
              connected: true,
            };
          }
          return conn;
        }),
      );
    }
  }, [socialConnectionsData]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const connected = params.get("connected");

    if (connected === "facebook") {
      toast.success("Facebook connected successfully");
      refetch();
      params.delete("connected");
      // window.history.replaceState({}, "", `?${params.toString()}`);
      const newSearch = params.toString();
      window.history.replaceState(
        {},
        "",
        newSearch ? `?${newSearch}` : window.location.pathname,
      );
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

  const handleComplete = () => {
    console.log("Connections completed:", connections);
  };

  const socialConnections = connections.filter((c) => c.category === "social");
  const ecommerceConnections = connections.filter(
    (c) => c.category === "ecommerce",
  );

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
          <h3 className="font-semibold text-primary text-base">Social Media</h3>
          <div className="space-y-2">
            {socialConnections.map((connection) => (
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
                  disabled={connection.connected}
                  className={`rounded-full flex items-center justify-center transition-all ${
                    connection.connected
                      ? "bg-green-500 cursor-default"
                      : "cursor-pointer"
                  }`}
                >
                  {connection.connected ? (
                    <CircleCheck className="text-primary-foreground" />
                  ) : (
                    <Plus className="text-primary-foreground" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* eCommerce Section */}
        <div className="space-y-2">
          <h3 className="font-semibold text-primary text-base">
            Connect eCommerce
          </h3>
          <div className="space-y-2">
            {ecommerceConnections.map((connection) => (
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
                  disabled={connection.connected} //add loading state
                  className={`rounded-full flex items-center justify-center transition-all ${
                    connection.connected
                      ? "bg-green-500 cursor-default"
                      : "cursor-pointer"
                  }`}
                >
                  {connection.connected ? (
                    <CircleCheck className="text-primary-foreground" />
                  ) : (
                    <Plus className="text-primary-foreground" />
                  )}
                </button>{" "}
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <Button onClick={handleComplete} className="w-full font-medium">
          Go ahead
        </Button>
      </CardContent>
    </Card>
  );
}
