import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CircleCheck, Link, Plus, Facebook, Instagram, MessageCircle, Handbag  } from 'lucide-react';
import { useToggleConnection } from "@/provider/connections"

interface Connection {
  id: string
  name: string
  icon: React.ReactNode
  connected: boolean
  category: "social" | "ecommerce"
  url: string
}

export default function ConnectResourcesCard() {
  const { mutateAsync } = useToggleConnection()
  const [connections, setConnections] = useState<Connection[]>([
    { id: "facebook", name: "Connect Facebook", icon: <Facebook className="text-primary-foreground" />, connected: false, category: "social", url: "https://api.studiobutterfly.io/auth/meta/login" },
    { id: "instagram", name: "Connect Instagram", icon: <Instagram className="text-primary-foreground" />, connected: false, category: "social", url: "" },
    { id: "whatsapp", name: "Connect Whatsapp", icon: <MessageCircle className="text-primary-foreground" />, connected: false, category: "social", url: "" },
    { id: "woocommerce", name: "Integrate WooCommerce", icon: <Handbag className="text-primary-foreground" />, connected: false, category: "ecommerce", url: "" },
    { id: "shopify", name: "Connect Shopify", icon: <Handbag className="text-primary-foreground" />, connected: false, category: "ecommerce", url: "" },
  ])

  const handleToggleConnection = (id: string) => {
    setConnections((prevConnections) =>
      prevConnections.map((connection) =>
        connection.id === id ? { ...connection, connected: !connection.connected } : connection
      )
    )
  }

  const toggleConnection = async (id: string, url: string) => {
  if(id === "facebook") {
    try {
      await mutateAsync()
      handleToggleConnection(id);
    } 
    catch (error) {
      console.error("Error in facebook toggleConnection function: ", error)
    }
  }
  
}


  const handleComplete = () => {
    console.log("Connections completed:", connections)
  }

  const socialConnections = connections.filter((c) => c.category === "social")
  const ecommerceConnections = connections.filter((c) => c.category === "ecommerce")

  return (
      <Card className="bg-background border-0 shadow-none">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Link className="text-primary" size={32}/>
          </div>
          <CardTitle className="text-3xl">Connect Resources</CardTitle>
          <CardDescription className="text-lg">Add additional info to complete your profile</CardDescription>
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
                    <span className="text-sm text-primary-foreground">{connection.name}</span>
                  </div>
                  <button
                    onClick={() => toggleConnection(connection.id, connection.url)}
                    className={`rounded-full flex items-center justify-center transition-all ${
                      connection.connected ? "bg-green-500" : ""
                    }`}
                  >
                    {connection.connected ? (
                      <CircleCheck className="text-primary-foreground"/>
                    ) : (
                      <Plus className="text-primary-foreground"/>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* eCommerce Section */}
          <div className="space-y-2">
            <h3 className="font-semibold text-primary text-base">Connect eCommerce</h3>
            <div className="space-y-2">
              {ecommerceConnections.map((connection) => (
                <div
                  key={connection.id}
                  className="flex items-center font-medium text-sm justify-between p-3 bg-primary rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{connection.icon}</span>
                    <span className="text-sm text-primary-foreground">{connection.name}</span>
                  </div>
                  <button
                    onClick={() => toggleConnection(connection.id, connection.url)}
                    className={`rounded-full flex items-center justify-center transition-all ${
                      connection.connected ? "bg-green-500" : ""
                    }`}
                  >
                    {connection.connected ? (
                      <CircleCheck className="text-primary-foreground"/>
                    ) : (
                      <Plus className="text-primary-foreground"/>
                    )}
                  </button>
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
  )
}
