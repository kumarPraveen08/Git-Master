import type { ReactNode } from "react";

export type Task = {
  id: string;
  instruction: string;
  hint: string;
  expected: RegExp;
  successMsg: string;
};

export type Level = {
  id: string;
  title: string;
  description: string;
  concept?: string;
  tasks: Task[];
};

export type Module = {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  levels: Level[];
};

export type HistoryLine = {
  type: "system" | "command" | "success" | "error";
  text: string;
};
