import { useState } from "react"
// import employees from "@/constants/employees.json"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar"

type Employee = {
  user_name: string
  email: string
  profile_uri: string
  is_online: boolean
}

export function EmployeeSearchCard() {
  const [search, setSearch] = useState("")

  // const filteredEmployees = (employees as Employee[]).filter(
  //   (emp) =>
  //     emp.user_name.toLowerCase().includes(search.toLowerCase()) ||
  //     emp.email.toLowerCase().includes(search.toLowerCase())
  // )

  return (
    <Card className="bg-popover rounded-xl p-3 space-y-3">
      {/* Search Box */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search employees"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pr-10"
        />
      </div>
      {/* <ScrollArea className="h-60">
        <div className="space-y-3">
          {filteredEmployees.map((emp) => (
            <div key={emp.email} className="flex items-center gap-3">

              <Avatar className="h-9 w-9 bg-muted">
                <AvatarImage src={emp.profile_uri} alt={emp.user_name} />
                <AvatarFallback>
                  {emp.user_name? emp.user_name.charAt(0).toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col leading-tight">
                <span className="font-medium text-sm">
                  {emp.user_name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {emp.email}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea> */}
    </Card>
  )
}
