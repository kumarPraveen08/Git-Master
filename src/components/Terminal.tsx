import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { CheckCircle } from "lucide-react";
import type { HistoryLine, Task } from "../types";

type TerminalProps = {
  tasks: Task[];
  currentTaskIndex: number;
  onTaskComplete: () => void;
  currentBranch: string;
  setCurrentBranch: (branch: string) => void;
  setUserName: (name: string) => void;
};

export function Terminal({
  tasks,
  currentTaskIndex,
  onTaskComplete,
  currentBranch,
  setCurrentBranch,
  setUserName,
}: TerminalProps) {
  const [history, setHistory] = useState<HistoryLine[]>([
    {
      type: "system",
      text: "Welcome to GitShell v3.0.0. ZSH environment loaded.",
    },
    { type: "system", text: "GitHub CLI (gh) installed and ready." },
    { type: "system", text: "Type commands to complete your objectives." },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, currentTaskIndex]);

  const handleCommand = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const trimmedInput = input.trim();
      if (!trimmedInput) return;

      setCmdHistory((prev) => [...prev, trimmedInput]);
      setHistoryIndex(-1);

      const newHistory: HistoryLine[] = [
        ...history,
        {
          type: "command",
          text: `user@git-learner:~/project${currentBranch ? ` (${currentBranch})` : ""}$ ${trimmedInput}`,
        },
      ];

      if (trimmedInput === "clear") {
        setHistory([]);
        setInput("");
        return;
      }

      const currentTask = tasks[currentTaskIndex];
      const branchCreateMatch = trimmedInput.match(
        /git\s+(?:checkout\s+-b|switch\s+-c)\s+([^\s]+)/,
      );
      const branchSwitchMatch = trimmedInput.match(
        /git\s+(?:checkout|switch)\s+([^\s]+)/,
      );
      const gitInitMatch = /^git\s+init$/.test(trimmedInput);
      const configNameMatch = trimmedInput.match(
        /git\s+config\s+(?:--global\s+)?user\.name\s+["']([^"']+)["']/,
      );

      if (configNameMatch) {
        setUserName(configNameMatch[1]);
      }

      if (currentTask && currentTask.expected.test(trimmedInput)) {
        newHistory.push({ type: "success", text: currentTask.successMsg });

        if (gitInitMatch) setCurrentBranch("main");
        else if (branchCreateMatch) setCurrentBranch(branchCreateMatch[1]);
        else if (
          branchSwitchMatch &&
          branchSwitchMatch[1] !== "-b" &&
          branchSwitchMatch[1] !== "-c"
        ) {
          setCurrentBranch(branchSwitchMatch[1]);
        }

        setTimeout(() => {
          onTaskComplete();
        }, 600);
      } else if (trimmedInput === "git status") {
        newHistory.push({
          type: "system",
          text:
            "On branch " +
            (currentBranch || "main") +
            "\nnothing to commit, working tree clean",
        });
      } else if (
        trimmedInput.startsWith("git") ||
        trimmedInput.startsWith("gh")
      ) {
        newHistory.push({
          type: "error",
          text: "Command executed, but it doesn't match the current objective. Need help? Click 'Need a hint?'",
        });
      } else {
        newHistory.push({
          type: "error",
          text: `zsh: command not found: ${trimmedInput.split(" ")[0]}`,
        });
      }

      setHistory(newHistory);
      setInput("");
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (cmdHistory.length === 0) return;
      const newIndex =
        historyIndex === -1
          ? cmdHistory.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(cmdHistory[newIndex]);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(newIndex);
        setInput(cmdHistory[newIndex]);
      }
    }
  };

  return (
    <div
      className="flex h-full cursor-text flex-col overflow-hidden rounded-xl border border-[#30363d] bg-[#010409] font-mono shadow-2xl"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center space-x-2 border-b border-[#30363d] bg-[#161b22] px-4 py-3">
        <div className="flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="ml-4 flex-1 text-center text-xs font-semibold tracking-wider text-gray-400">
          zsh — git-learner
        </div>
      </div>

      <div className="custom-scrollbar flex-1 overflow-y-auto p-4 text-sm leading-relaxed md:p-6 md:text-[15px]">
        {history.map((line, index) => (
          <div
            key={index}
            className={`mb-1.5 ${
              line.type === "command"
                ? "text-gray-200"
                : line.type === "success"
                  ? "whitespace-pre-line text-[#3fb950]"
                  : line.type === "error"
                    ? "text-[#f85149]"
                    : "text-[#58a6ff]"
            }`}
          >
            {line.text}
          </div>
        ))}

        {currentTaskIndex < tasks.length && (
          <div className="mt-3 flex items-center text-white">
            <span className="mr-2 font-bold whitespace-nowrap text-[#3fb950]">
              user@git-learner:
              <span className="text-[#58a6ff]">~/project</span>
              {currentBranch && (
                <span className="text-[#d2a8ff]"> ({currentBranch})</span>
              )}
              $
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleCommand}
              className="min-w-0 flex-1 border-none bg-transparent p-0 text-white outline-none"
              autoFocus
              spellCheck="false"
              autoComplete="off"
              aria-label="Terminal command"
            />
          </div>
        )}

        {currentTaskIndex >= tasks.length && (
          <div className="mt-4 flex items-center rounded border border-[#d2a8ff]/30 bg-[#d2a8ff]/10 p-3 font-bold text-[#d2a8ff]">
            <CheckCircle size={18} className="mr-2 shrink-0" />
            All objectives for this module completed.
          </div>
        )}
        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
}
