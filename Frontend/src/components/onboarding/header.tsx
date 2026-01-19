import { Button } from "@/components/ui/button"
import { CornerUpRight } from 'lucide-react';
import {MessageCircle} from "lucide-react"
import { useNavigate } from "react-router-dom";


export default function Header() {
  const navigate = useNavigate();
  const clickHandler = () => {
    localStorage.removeItem("onboarding_step");
    navigate("/");
  };
  return (
    <header className="flex items-center justify-between">
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
