import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { BotMessageSquare  } from "lucide-react"

export default function CreateAgentCard() {
  const [personality, setPersonality] = React.useState("friendly")

  const handleSubmit = () => {
    console.log({
      name: "",
      personality,
    })
  }

  return (
      <Card className="bg-background border-0 shadow-none">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <BotMessageSquare size={34}/>
          </div>

          <CardTitle className="text-3xl">
            Create AI Agent
          </CardTitle>

          <CardDescription className="text-lg">
            Add additional info to complete your profile
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* AI Agent Name */}
          <div className="space-y-2">
            <label className="text-base font-semibold">
              AI Agent Name
            </label>
            <Input placeholder="John Doe" />
          </div>

          {/* Personality */}
          <div className="space-y-2">
            <label className="text-base font-semibold">
              Personality
            </label>

            <ToggleGroup
              type="single"
              value={personality}
              onValueChange={(value) =>
                value && setPersonality(value)
              }
              className="flex flex-wrap justify-between gap-x-0 gap-y-2"
            >
              <ToggleGroupItem className="rounded-2xl border text-muted-foreground px-4" value="friendly">
                Friendly
              </ToggleGroupItem>
              <ToggleGroupItem className="rounded-2xl border text-muted-foreground px-4" value="neutral">
                Neutral
              </ToggleGroupItem>
              <ToggleGroupItem className="rounded-2xl border text-muted-foreground px-4"  value="professional">
                Professional
              </ToggleGroupItem>
              <ToggleGroupItem className="rounded-2xl border text-muted-foreground px-4"  value="humorous">
                Humorous
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* General Instructions */}
          <div className="space-y-2">
            <label className="font-semibold text-primary text-base">
              General Instructions
            </label>
            <Textarea
              placeholder="Give instructions for the AI agent..."
              className="min-h-[80px]"
            />
          </div>

          {/* Submit */}
          <Button
            className="w-full font-medium"
            onClick={handleSubmit}
          >
            Create AI Agent
          </Button>
        </CardContent>
      </Card>
  )
}
