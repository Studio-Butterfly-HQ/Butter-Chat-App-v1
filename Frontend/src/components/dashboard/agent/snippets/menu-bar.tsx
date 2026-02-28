import { Editor, useEditorState } from "@tiptap/react";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading,
  Bold,
  Italic,
  Strikethrough,
  Code,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  UnlinkIcon,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo,
  Redo,
  ChevronDown,
  CornerDownLeft,
  ExternalLink,
  Trash2,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReactNode, useState } from "react";

// LinkComponent

function LinkComponent({
  editor,
  children,
}: {
  editor: Editor;
  children: ReactNode;
}) {
  const [linkUrl, setLinkUrl] = useState("");
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);

  const handleSetLink = () => {
    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
    } else {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }
    setIsLinkPopoverOpen(false);
    setLinkUrl("");
  };

  const handleOpenChange = (open: boolean) => {
    setIsLinkPopoverOpen(open);
    if (open) {
      const previousUrl = editor.getAttributes("link").href;
      setLinkUrl(previousUrl || "");
    }
  };

  return (
    <Popover open={isLinkPopoverOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className="w-[400px] rounded-xl bg-popover overflow-hidden h-12 flex items-center pr-1 pl-0"
        sideOffset={10}
      >
        <div className="flex items-center w-full justify-between">
          <Input
            placeholder="Paste a link..."
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSetLink();
              }
            }}
            className="flex-1 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 h-full border-none w-full"
            autoFocus
          />
          <div className="flex items-center gap-1 text-muted-foreground shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-sm hover:bg-transparent"
              onClick={handleSetLink}
            >
              <CornerDownLeft className="h-3.5 w-3.5" />
            </Button>
            <div className="w-[1px] h-4 bg-border mx-1"></div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-sm hover:bg-transparent"
              onClick={() => {
                if (linkUrl) window.open(linkUrl, "_blank");
              }}
              disabled={!linkUrl}
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-sm hover:bg-transparent"
              onClick={() => setLinkUrl("")}
              disabled={!linkUrl}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export const MenuBar = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive("bold") ?? false,
      isItalic: ctx.editor.isActive("italic") ?? false,
      isStrike: ctx.editor.isActive("strike") ?? false,
      isCode: ctx.editor.isActive("code") ?? false,
      isUnderline: ctx.editor.isActive("underline") ?? false,
      isLink: ctx.editor.isActive("link") ?? false,
      isBulletList: ctx.editor.isActive("bulletList") ?? false,
      isOrderedList: ctx.editor.isActive("orderedList") ?? false,
      isBlockquote: ctx.editor.isActive("blockquote") ?? false,
      isAlignLeft: ctx.editor.isActive({ textAlign: "left" }) ?? false,
      isAlignCenter: ctx.editor.isActive({ textAlign: "center" }) ?? false,
      isAlignRight: ctx.editor.isActive({ textAlign: "right" }) ?? false,
      isAlignJustify: ctx.editor.isActive({ textAlign: "justify" }) ?? false,
      isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
      isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
      isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
      isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
      canUndo: ctx.editor.can().chain().focus().undo().run(),
      canRedo: ctx.editor.can().chain().focus().redo().run(),
    }),
  });

  return (
    <div className="border-b border-border p-2 px-4 flex flex-wrap items-center justify-center gap-1 bg-popover shrink-0">
      <div className="flex items-center gap-0.5">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 px-2 flex items-center gap-1 hover:text-foreground ${
              editorState.isHeading1 ||
              editorState.isHeading2 ||
              editorState.isHeading3 ||
              editorState.isHeading4
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground"
            }`}
          >
            {editorState.isHeading1 ? (
              <Heading1 className="h-4 w-4" />
            ) : editorState.isHeading2 ? (
              <Heading2 className="h-4 w-4" />
            ) : editorState.isHeading3 ? (
              <Heading3 className="h-4 w-4" />
            ) : editorState.isHeading4 ? (
              <Heading4 className="h-4 w-4" />
            ) : (
              <Heading className="h-4 w-4" />
            )}
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="min-w-[140px] items-center flex gap-0.5 flex-col"
        >
          <DropdownMenuItem
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`w-full flex items-center gap-3 justify-center ${editorState.isHeading1 ? "bg-accent" : "text-muted-foreground"}`}
          >
            <Heading1 className="h-4 w-4" />
            <span
              className={`font-medium ${editorState.isHeading1 ? "text-primary" : "text-muted-foreground"}`}
            >
              Heading 1
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`w-full flex items-center gap-3 justify-center ${editorState.isHeading2 ? "bg-accent" : "text-muted-foreground"}`}
          >
            <Heading2 className="h-4 w-4" />
            <span
              className={`font-medium ${editorState.isHeading2 ? "text-primary" : "text-muted-foreground"}`}
            >
              Heading 2
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={`w-full flex items-center gap-3 justify-center ${editorState.isHeading3 ? "bg-accent" : "text-muted-foreground"}`}
          >
            <Heading3 className="h-4 w-4" />
            <span
              className={`font-medium ${editorState.isHeading3 ? "text-primary" : "text-muted-foreground"}`}
            >
              Heading 3
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={`w-full flex items-center gap-3 justify-center ${editorState.isHeading4 ? "bg-accent" : "text-muted-foreground"}`}
          >
            <Heading4 className="h-4 w-4" />
            <span
              className={`font-medium ${editorState.isHeading4 ? "text-primary" : "text-muted-foreground"}`}
            >
              Heading 4
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center gap-0.5 ml-1">
        <Toggle
          size="sm"
          pressed={editorState.isBulletList}
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
        >
          <List className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editorState.isOrderedList}
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      <div className="flex items-center gap-0.5">
        <Toggle
          size="sm"
          pressed={editorState.isBold}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editorState.isItalic}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editorState.isStrike}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editorState.isCode}
          onPressedChange={() => editor.chain().focus().toggleCode().run()}
        >
          <Code className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editorState.isUnderline}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="h-4 w-4" />
        </Toggle>

        {editorState.isLink ? (
          <Toggle
            size="sm"
            pressed
            onPressedChange={() =>
              editor.chain().focus().extendMarkRange("link").unsetLink().run()
            }
          >
            <UnlinkIcon className="h-4 w-4" />
          </Toggle>
        ) : (
          <LinkComponent editor={editor}>
            <Toggle size="sm" aria-label="Toggle link">
              <LinkIcon className="h-4 w-4" />
            </Toggle>
          </LinkComponent>
        )}
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      <div className="flex items-center gap-0.5">
        <Toggle
          size="sm"
          pressed={editorState.isAlignLeft}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("left").run()
          }
        >
          <AlignLeft className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editorState.isAlignCenter}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("center").run()
          }
        >
          <AlignCenter className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editorState.isAlignRight}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("right").run()
          }
        >
          <AlignRight className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editorState.isAlignJustify}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("justify").run()
          }
        >
          <AlignJustify className="h-4 w-4" />
        </Toggle>
      </div>
    </div>
  );
};
