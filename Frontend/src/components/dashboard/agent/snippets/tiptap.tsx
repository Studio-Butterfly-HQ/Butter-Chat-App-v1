import {
  useEditor,
  EditorContent,
  Editor,
  useEditorState,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Placeholder from "@tiptap/extension-placeholder";
import { MenuBar } from "./menu-bar";

const Tiptap = ({
  content,
  onChange,
}: {
  content?: string;
  onChange?: (html: string) => void;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Superscript,
      Subscript,
      Placeholder.configure({
        placeholder: "Write something...",
      }),
    ],
    content:
      content ||
      `
      <h2>About Aarong's fabric</h2>
      <p>Other than few exceptions such as Kids wear, most of Aarong's products are handcrafted using the finest natural fibers. The subtle variations in color, texture and finishing are the signature of the human hand. Creating each product is a lengthy process rooted in the crafts-based traditions of hand spinning, dying, weaving, wood block printing and embroidery, each with its own regional specialty and character.</p>
      <h2>Dyes used</h2>
      <p>We use both vegetable dyes and commercial dyes with the goal of minimizing our impact on the environment while striving for the best color properties. Many of our artisans use AZO free dyes.</p>
      <h2>Caring for Aarong products</h2>
      <p>Caring for your Aarong products is generally trouble free. We offer the following information and care suggestions which will help you extend the life of your Aarong products even further.</p>
      <ul data-type="bulletList">
        <li><p>See our fabric care guidelines below for hand woven:</p></li>
        <li><p>Cotton</p></li>
        <li><p>Silk</p></li>
        <li><p>Blends of cotton, linen and rayon</p></li>
        <li><p>Cotton saree</p></li>
      </ul>
    `,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "tiptap-editor max-w-4xl mx-auto focus:outline-none w-full min-h-full p-8",
      },
    },
    immediatelyRender: false,
  });

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {editor && <MenuBar editor={editor} />}
      <div className="flex-1 overflow-y-auto scrollbar-hide w-full">
        <EditorContent editor={editor} className="h-full flex flex-col" />
      </div>
    </div>
  );
};

export default Tiptap;
