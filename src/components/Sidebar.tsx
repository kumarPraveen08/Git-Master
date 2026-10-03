import { CheckCircle, ChevronDown, ChevronRight, Lock, RotateCcw } from "lucide-react";
import { MODULES } from "../_data/Modules";
import { GitHubMark } from "./GitHubMark";

type SidebarProps = {
  open: boolean;
  activeModuleIndex: number;
  activeLevelIndex: number;
  completedLevels: Set<string>;
  expandedModules: Set<number>;
  onToggleModule: (moduleIndex: number) => void;
  onJumpToLevel: (moduleIndex: number, levelIndex: number) => void;
  onReset: () => void;
  onClose: () => void;
};

export function Sidebar({
  open,
  activeModuleIndex,
  activeLevelIndex,
  completedLevels,
  expandedModules,
  onToggleModule,
  onJumpToLevel,
  onReset,
  onClose,
}: SidebarProps) {
  return (
    <aside
      className={`${open ? "flex" : "hidden"} fixed inset-y-0 left-0 z-40 h-dvh w-80 shrink-0 flex-col border-r border-[#30363d] bg-[#161b22] md:static md:flex`}
    >
      <div className="flex items-center justify-between border-b border-[#30363d] bg-[#0d1117] p-5">
        <div className="flex items-center space-x-3">
          <div className="rounded-lg bg-gradient-to-br from-[#1f6feb] to-[#238636] p-2 shadow-lg">
            <GitHubMark size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">
              Git Master
            </h1>
            <p className="font-mono text-[11px] tracking-wider text-[#8b949e] uppercase">
              Interactive Academy
            </p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="rounded-md p-2 text-[#8b949e] transition-colors hover:bg-[#f85149]/10 hover:text-[#f85149]"
          title="Reset All Progress"
          type="button"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      <div className="custom-scrollbar flex-1 overflow-y-auto p-2">
        {MODULES.map((module, moduleIndex) => {
          const isModuleActive = moduleIndex === activeModuleIndex;
          const isExpanded = expandedModules.has(moduleIndex);
          const moduleCompletedCount = module.levels.filter((level) =>
            completedLevels.has(level.id),
          ).length;
          const moduleProgress = Math.round(
            (moduleCompletedCount / module.levels.length) * 100,
          );

          return (
            <div key={module.id} className="mb-2">
              <button
                type="button"
                onClick={() => onToggleModule(moduleIndex)}
                className={`flex w-full items-center justify-between rounded-lg border p-3 transition-colors ${
                  isModuleActive
                    ? "border-[#30363d] bg-[#21262d]"
                    : "border-transparent hover:bg-[#21262d]/50"
                }`}
              >
                <div className="flex min-w-0 items-center space-x-3">
                  <div
                    className={`rounded-md p-1.5 ${isModuleActive ? "bg-[#1f6feb]/20 text-[#58a6ff]" : "bg-[#30363d] text-[#8b949e]"}`}
                  >
                    {module.icon}
                  </div>
                  <div className="min-w-0 text-left">
                    <h2
                      className={`truncate text-sm font-semibold ${isModuleActive ? "text-white" : "text-[#8b949e]"}`}
                    >
                      {module.title}
                    </h2>
                    {moduleProgress > 0 && moduleProgress < 100 && (
                      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-[#30363d]">
                        <div
                          className="h-full bg-[#3fb950]"
                          style={{ width: `${moduleProgress}%` }}
                        />
                      </div>
                    )}
                    {moduleProgress === 100 && (
                      <p className="mt-0.5 font-mono text-[10px] text-[#3fb950]">
                        COMPLETED
                      </p>
                    )}
                  </div>
                </div>
                <div className="ml-2 text-[#8b949e]">
                  {isExpanded ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="relative mt-1 pl-4 before:absolute before:top-2 before:bottom-2 before:left-[19px] before:w-px before:bg-[#30363d]">
                  {module.levels.map((level, levelIndex) => {
                    const isActive =
                      moduleIndex === activeModuleIndex &&
                      levelIndex === activeLevelIndex;
                    const isCompleted = completedLevels.has(level.id);
                    const prevLevelId =
                      levelIndex > 0
                        ? module.levels[levelIndex - 1].id
                        : moduleIndex > 0
                          ? MODULES[moduleIndex - 1].levels[
                              MODULES[moduleIndex - 1].levels.length - 1
                            ].id
                          : null;
                    const isUnlocked =
                      (moduleIndex === 0 && levelIndex === 0) ||
                      (prevLevelId !== null &&
                        completedLevels.has(prevLevelId)) ||
                      isCompleted;

                    return (
                      <button
                        key={level.id}
                        type="button"
                        onClick={() => {
                          onJumpToLevel(moduleIndex, levelIndex);
                          onClose();
                        }}
                        disabled={!isUnlocked}
                        className={`relative my-1 flex w-full items-center rounded-md px-4 py-2 text-left transition-all ${
                          isActive
                            ? "bg-[#1f6feb]/10 text-[#c9d1d9]"
                            : "text-[#8b949e] hover:bg-[#21262d]"
                        } ${!isUnlocked ? "cursor-not-allowed opacity-40" : ""}`}
                      >
                        <div className="z-10 mr-3 bg-[#161b22] py-1">
                          {isCompleted ? (
                            <CheckCircle size={14} className="text-[#238636]" />
                          ) : !isUnlocked ? (
                            <Lock size={14} className="text-[#8b949e]" />
                          ) : (
                            <div
                              className={`h-2 w-2 rounded-full border ${isActive ? "border-[#58a6ff] bg-[#58a6ff]" : "border-[#8b949e]"}`}
                            />
                          )}
                        </div>
                        <span
                          className={`truncate text-sm font-medium ${isActive ? "text-white" : ""}`}
                        >
                          {level.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
