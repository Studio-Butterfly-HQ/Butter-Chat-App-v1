import { useCallback } from "react";
import { SocketMessage } from "@/socket/socket-types";

export const useSocketParser = () => {
  const parseMultipleJSON = useCallback((raw: string): SocketMessage[] => {
    const results: SocketMessage[] = [];
    let depth = 0;
    let start = 0;
    let inString = false;
    let escape = false;

    for (let i = 0; i < raw.length; i++) {
      const ch = raw[i];

      if (escape) {
        escape = false;
        continue;
      }
      if (ch === "\\" && inString) {
        escape = true;
        continue;
      }
      if (ch === '"') {
        inString = !inString;
        continue;
      }
      if (inString) continue;

      if (ch === "{") {
        if (depth === 0) start = i;
        depth++;
      } else if (ch === "}") {
        depth--;
        if (depth === 0) {
          try {
            const obj = JSON.parse(raw.slice(start, i + 1));
            results.push(obj);
          } catch {
            // skip malformed chunk
          }
        }
      }
    }

    return results;
  }, []);

  return { parseMultipleJSON };
};
