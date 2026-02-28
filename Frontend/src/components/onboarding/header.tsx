import { Button } from "@/components/ui/button"
import { CornerUpRight } from 'lucide-react';
import {MessageCircle} from "lucide-react"
import { useNavigate } from "react-router-dom";


export default function Header() {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/");
  };
  return (
    <header className="flex sticky top-0 z-50 w-full py-8 lg:pt-8 lg:bg-transparent lg:border-0 border-b bg-background items-center justify-between">
      <div className="flex items-center gap-2">
        <MessageCircle className="text-primary text-2xl"/>
        <span className="text-primary text-2xl font-medium">
          ButterChat
        </span>
      </div>
        <Button
          variant="outline"
          onClick={clickHandler}
        >
          Skip Now
          <CornerUpRight />
        </Button>
    </header>
  )
}
