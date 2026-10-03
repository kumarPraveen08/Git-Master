import { useEffect, useState } from "react";
import { MODULES } from "../_data/Modules";

const STORAGE = {
  module: "gitAcademy_activeModuleIndex",
  level: "gitAcademy_activeLevelIndex",
  task: "gitAcademy_currentTaskIndex",
  completed: "gitAcademy_completedLevels",
  expanded: "gitAcademy_expandedModules",
  branch: "gitAcademy_currentBranch",
  userName: "gitAcademy_userName",
  courseComplete: "gitAcademy_courseComplete",
} as const;

function readNumber(key: string, fallback: number, max: number) {
  const saved = localStorage.getItem(key);
  if (saved === null) return fallback;
  const value = Number.parseInt(saved, 10);
  if (Number.isNaN(value) || value < 0 || value > max) return fallback;
  return value;
}

function readIdSet(key: string, fallback: Iterable<string>) {
  const saved = localStorage.getItem(key);
  if (!saved) return new Set(fallback);
  try {
    const parsed: unknown = JSON.parse(saved);
    if (
      Array.isArray(parsed) &&
      parsed.every((item) => typeof item === "string")
    ) {
      return new Set(parsed);
    }
  } catch {
    // Ignore corrupt saved progress and start from the fallback.
  }
  return new Set(fallback);
}

function readIndexSet(key: string, fallback: Iterable<number>) {
  const saved = localStorage.getItem(key);
  if (!saved) return new Set(fallback);
  try {
    const parsed: unknown = JSON.parse(saved);
    if (
      Array.isArray(parsed) &&
      parsed.every((item) => typeof item === "number")
    ) {
      return new Set(parsed);
    }
  } catch {
    // Ignore corrupt saved progress and start from the fallback.
  }
  return new Set(fallback);
}

export function useCourseProgress() {
  const [activeModuleIndex, setActiveModuleIndex] = useState(() =>
    readNumber(STORAGE.module, 0, MODULES.length - 1),
  );
  const [activeLevelIndex, setActiveLevelIndex] = useState(() => {
    const moduleIndex = readNumber(STORAGE.module, 0, MODULES.length - 1);
    return readNumber(
      STORAGE.level,
      0,
      MODULES[moduleIndex].levels.length - 1,
    );
  });
  const [currentTaskIndex, setCurrentTaskIndex] = useState(() =>
    readNumber(STORAGE.task, 0, 100),
  );
  const [completedLevels, setCompletedLevels] = useState(() =>
    readIdSet(STORAGE.completed, []),
  );
  const [expandedModules, setExpandedModules] = useState(() =>
    readIndexSet(STORAGE.expanded, [0]),
  );
  const [currentBranch, setCurrentBranch] = useState(
    () => localStorage.getItem(STORAGE.branch) ?? "",
  );
  const [userName, setUserName] = useState(
    () => localStorage.getItem(STORAGE.userName) ?? "",
  );
  const [courseComplete, setCourseComplete] = useState(
    () => localStorage.getItem(STORAGE.courseComplete) === "true",
  );

  const activeModule = MODULES[activeModuleIndex];
  const activeLevel = activeModule.levels[activeLevelIndex];

  useEffect(() => {
    localStorage.setItem(STORAGE.module, String(activeModuleIndex));
    localStorage.setItem(STORAGE.level, String(activeLevelIndex));
    localStorage.setItem(STORAGE.task, String(currentTaskIndex));
    localStorage.setItem(
      STORAGE.completed,
      JSON.stringify([...completedLevels]),
    );
    localStorage.setItem(
      STORAGE.expanded,
      JSON.stringify([...expandedModules]),
    );
    localStorage.setItem(STORAGE.branch, currentBranch);
    localStorage.setItem(STORAGE.userName, userName);
    localStorage.setItem(STORAGE.courseComplete, String(courseComplete));
  }, [
    activeModuleIndex,
    activeLevelIndex,
    currentTaskIndex,
    completedLevels,
    expandedModules,
    currentBranch,
    userName,
    courseComplete,
  ]);

  const hintScope = `${activeLevel.id}:${currentTaskIndex}`;
  const [hint, setHint] = useState({ scope: hintScope, open: false });
  const showHint = hint.scope === hintScope && hint.open;
  const setShowHint = (value: boolean | ((open: boolean) => boolean)) => {
    setHint((current) => {
      const open = current.scope === hintScope && current.open;
      return {
        scope: hintScope,
        open: typeof value === "function" ? value(open) : value,
      };
    });
  };

  const handleResetProgress = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleTaskComplete = () => {
    if (currentTaskIndex < activeLevel.tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
      return;
    }

    const newCompleted = new Set(completedLevels);
    newCompleted.add(activeLevel.id);
    setCompletedLevels(newCompleted);
    setCurrentTaskIndex(activeLevel.tasks.length);

    const isLastModule = activeModuleIndex === MODULES.length - 1;
    const isLastLevel = activeLevelIndex === activeModule.levels.length - 1;
    if (isLastModule && isLastLevel) {
      setTimeout(() => setCourseComplete(true), 1500);
    }
  };

  const jumpToLevel = (modIdx: number, lvlIdx: number) => {
    const targetLvl = MODULES[modIdx].levels[lvlIdx];
    let isUnlocked = false;

    if (modIdx === 0 && lvlIdx === 0) {
      isUnlocked = true;
    } else {
      const prevLvlId =
        lvlIdx > 0
          ? MODULES[modIdx].levels[lvlIdx - 1].id
          : MODULES[modIdx - 1].levels[MODULES[modIdx - 1].levels.length - 1]
              .id;
      isUnlocked =
        completedLevels.has(prevLvlId) || completedLevels.has(targetLvl.id);
    }

    if (!isUnlocked) return;

    setActiveModuleIndex(modIdx);
    setActiveLevelIndex(lvlIdx);
    setCurrentTaskIndex(
      completedLevels.has(targetLvl.id) ? targetLvl.tasks.length : 0,
    );
    setExpandedModules((current) => new Set(current).add(modIdx));
  };

  const handleNextLevel = () => {
    if (activeLevelIndex < activeModule.levels.length - 1) {
      jumpToLevel(activeModuleIndex, activeLevelIndex + 1);
    } else if (activeModuleIndex < MODULES.length - 1) {
      jumpToLevel(activeModuleIndex + 1, 0);
    }
  };

  const toggleModuleExpand = (moduleIndex: number) => {
    setExpandedModules((current) => {
      const next = new Set(current);
      if (next.has(moduleIndex)) next.delete(moduleIndex);
      else next.add(moduleIndex);
      return next;
    });
  };

  const totalLevels = MODULES.reduce(
    (count, module) => count + module.levels.length,
    0,
  );
  const hasNextLevel =
    activeLevelIndex < activeModule.levels.length - 1 ||
    activeModuleIndex < MODULES.length - 1;

  return {
    activeModule,
    activeModuleIndex,
    activeLevel,
    activeLevelIndex,
    currentTaskIndex,
    completedLevels,
    expandedModules,
    currentBranch,
    setCurrentBranch,
    userName,
    setUserName,
    showHint,
    setShowHint,
    courseComplete,
    setCourseComplete,
    totalLevels,
    hasNextLevel,
    handleResetProgress,
    handleTaskComplete,
    jumpToLevel,
    handleNextLevel,
    toggleModuleExpand,
  };
}
