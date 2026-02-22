import { Button } from "@/components/ui/button";
import {
  Send,
  Smile,
  Bookmark,
  Image as ImageIcon,
  Sparkles,
  ChevronDown,
  MessageSquare,
} from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";

interface ChatMessageInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSend: () => void;
}

export default function ChatMessageInput({
  inputValue,
  setInputValue,
  handleSend,
}: ChatMessageInputProps) {
  return (
    <div className="p-4 pt-0">
      <div className="border bg-card border-border rounded-2xl p-4 transition-all focus-within:ring-1 focus-within:ring-primary/20">
        <div className="flex items-center  gap-2 mb-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-sm font-medium gap-2 mt-[-10px]"
          >
            <MessageSquare className="h-4 w-4" />
            Message
            <ChevronDown className="h-3 w-3" />
          </Button>
        </div>

        <TextareaAutosize
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          minRows={1}
          maxRows={6}
          className="w-full min-h-10 resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground/50 scrollbar-hide"
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
            >
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
            >
              <Smile className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>

          <Button
            onClick={handleSend}
            size="sm"
            className="h-7 px-4 rounded-full"
          >
            Send Reply
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
