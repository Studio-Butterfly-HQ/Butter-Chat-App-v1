import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function AIMessageRenderer({ content }: { content: string }) {
  return (
    <div className="break-words">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Headers
          h1: ({ node, ...props }) => (
            <h1
              className="text-2xl font-bold mt-6 mb-4 first:mt-0"
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-xl font-semibold mt-5 mb-3" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-lg font-medium mt-4 mb-2" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-base font-medium mt-3 mb-2" {...props} />
          ),

          // Text
          p: ({ node, ...props }) => (
            <p className="mb-4 last:mb-0 leading-5" {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-foreground" {...props} />
          ),
          em: ({ node, ...props }) => <em className="italic" {...props} />,

          // Lists
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-6 mb-4 space-y-1.5" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-6 mb-4 space-y-1.5" {...props} />
          ),
          li: ({ node, ...props }) => <li className="pl-1" {...props} />,

          // Code
          code: ({ node, inline, className, children, ...props }: any) => {
            if (inline) {
              return (
                <code
                  className="bg-muted px-1.5 py-0.5 rounded text-[13px] font-mono font-medium text-foreground"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ node, ...props }) => (
            <pre
              className="rounded-lg bg-[#0d1117] p-4 overflow-x-auto my-4 text-sm border border-border/40"
              {...props}
            />
          ),

          // Quote
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-primary/20 pl-4 py-1 my-4 text-muted-foreground italic bg-muted/30 rounded-r-lg"
              {...props}
            />
          ),

          // Tables
          table: ({ node, ...props }) => (
            <ScrollArea className="my-4 w-full rounded-lg border border-border">
              <table className="min-w-full text-left text-sm" {...props} />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          ),
          thead: ({ node, ...props }) => (
            <thead
              className="whitespace-nowrap bg-muted/50 text-muted-foreground font-medium border-b border-border "
              {...props}
            />
          ),
          tbody: ({ node, ...props }) => (
            <tbody className="divide-y divide-border" {...props} />
          ),
          tr: ({ node, ...props }) => (
            <tr className="hover:bg-muted/30 transition-colors" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="px-4 py-3 font-medium" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-4 py-3 align-top" {...props} />
          ),

          // Links
          a: ({ node, ...props }) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
            />
          ),

          // Divider
          hr: ({ node, ...props }) => (
            <hr className="my-6 border-border" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
