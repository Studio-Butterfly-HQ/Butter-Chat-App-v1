import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CircleCheck,
  Link,
  Plus,
  Facebook,
  Instagram,
  MessageCircle,
  Handbag,
  ArrowLeft,
  ArrowUpRight,
} from "lucide-react";
import {
  useGetSocialConnections,
  useInitiateFacebookConnection,
} from "@/provider/connections";
import { toast } from "sonner";
import { SiWoocommerce } from "react-icons/si";
import { FaShopify } from "react-icons/fa";
import { SiBigcommerce } from "react-icons/si";

interface ConnectionConfig {
  platform: string;
  name: string;
  icon: React.ReactNode;
  category: "social" | "ecommerce";
}

const CONNECTION_CONFIG: ConnectionConfig[] = [
  {
    platform: "facebook",
    name: "Connect Facebook",
    icon: <Facebook size={20} />,
    category: "social",
  },
  {
    platform: "instagram",
    name: "Connect Instagram",
    icon: <Instagram size={20} />,
    category: "social",
  },
  {
    platform: "whatsapp",
    name: "Connect Whatsapp",
    icon: <MessageCircle size={20} />,
    category: "social",
  },
  {
    platform: "woocommerce",
    name: "Integrate WooCommerce",
    icon: <Handbag size={20} />,
    category: "ecommerce",
  },
  {
    platform: "shopify",
    name: "Connect Shopify",
    icon: <Handbag size={20} />,
    category: "ecommerce",
  },
];

interface ConnectResourcesCardProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function ConnectResourcesCard({ onNext, onPrev }: ConnectResourcesCardProps) {
  const { mutateAsync: initiateFacebookConnection, isPending: isInitiatingFacebookConnection, } = useInitiateFacebookConnection();
  const { data: socialConnectionsData, refetch } = useGetSocialConnections();

  // derive connection status from backend
  const isConnected = (platform: string) => socialConnectionsData?.some((sc) => sc.platform_type?.toLowerCase() === platform.toLowerCase(),);

  // handle redirect success / failure
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const success = params.get("success");
    const error = params.get("error");

    if (success === "true") {
      toast.success("Account connected successfully");
      refetch();
    }

    if (error === "oauth_failed") {
      toast.error("Connection failed. Please try again.");
    }

    if (success || error) {
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  const handleConnect = async (platform: string) => {
    if (platform === "facebook") {
      try {
        await initiateFacebookConnection();
      } catch (error) {
        console.error("Error initiating Facebook connection:", error);
      }
    }
  };

  const socialConnections = CONNECTION_CONFIG.filter(
    (c) => c.category === "social",
  );

  const ecommerceConnections = CONNECTION_CONFIG.filter(
    (c) => c.category === "ecommerce",
  );

  return (
    <Card className="bg-transparent border-0 shadow-none">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Link className="text-primary" size={32} />
        </div>
        <CardTitle className="text-3xl">Connect Resources</CardTitle>
        <CardDescription className="text-lg">
          Add additional info to complete your profile
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Social Media Section */}
        <div className="space-y-2">
          <h3 className="font-semibold text-primary text-sm">Social Media</h3>
          <div className="space-y-2">
            {socialConnections.map((connection) => {
              const connected = isConnected(connection.platform);

              return (
                <div
                  key={connection.platform}
                  className="flex items-center font-medium text-sm border border-border justify-between p-3 bg-transparent rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span>{connection.icon}</span>
                    <span className="text-sm text-primary font-normal">
                      {connection.name}
                    </span>
                  </div>

                  <button
                    onClick={() => handleConnect(connection.platform)}
                    disabled={connected || isInitiatingFacebookConnection}
                    className={`rounded-full flex items-center justify-center transition-all ${
                      connected
                        ? "bg-green-500 cursor-default"
                        : "cursor-pointer"
                    }`}
                  >
                    {connected ? <CircleCheck size={20} /> : <Plus size={20} />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* eCommerce Section */}
        <div className="flex items-center gap-4">
          <Separator className="flex-1" />
          <span className="text-sm font-semibold text-muted-foreground whitespace-nowrap">
            eCommerce Integration
          </span>
          <Separator className="flex-1" />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-primary text-sm">
              Choose Platform
            </h3>
            <a
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground hover:underline flex items-center gap-1 transition-colors"
            >
              Integration Guide <ArrowUpRight className="h-3 shrink-0 w-3" />
            </a>
          </div>

          <Select defaultValue="woocommerce">
            <SelectTrigger className="w-full bg-transparent border-input h-11 text-sm">
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="woocommerce">
                <div className="flex items-center gap-2">
                  <Handbag className="h-4 w-4" />
                  <span>WooCommerce</span>
                </div>
              </SelectItem>
              <SelectItem value="shopify">
                <div className="flex items-center gap-2">
                  <FaShopify className="h-4 w-4" />
                  <span>Shopify</span>
                </div>
              </SelectItem>
              <SelectItem value="bigcommerce">
                <div className="flex items-center gap-2">
                  <SiBigcommerce className="h-4 w-4 text-primary" />
                  <span>BigCommerce</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <div className="border border-border rounded-xl p-4 space-y-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">
                Base URL <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="www.example.com"
                className="bg-transparent border-input h-10 text-sm text-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">
                Consumer Key <span className="text-red-500">*</span>
              </label>
              <Input
                type="password"
                placeholder="***************************"
                className="bg-transparent border-input h-10 text-sm text-primary font-mono"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">
                Consumer Secret <span className="text-red-500">*</span>
              </label>
              <Input
                type="password"
                placeholder="***************************"
                className="bg-transparent border-input h-10 text-sm text-primary font-mono"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1 bg-transparent"
            onClick={onPrev}
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          <Button
            className="flex-1 font-medium bg-foreground text-background hover:bg-foreground/90"
            disabled={isInitiatingFacebookConnection}
            onClick={onNext}
          >
            {isInitiatingFacebookConnection
              ? "Connecting..."
              : "Save & Continue"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
