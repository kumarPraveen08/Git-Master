import { CheckCircle, ChevronRight, Info, Lightbulb, Play } from "lucide-react";
import type { Level } from "../types";

type LessonPanelProps = {
  level: Level;
  currentTaskIndex: number;
  showHint: boolean;
  onToggleHint: () => void;
  onNextLevel: () => void;
  hasNextLevel: boolean;
};

export function LessonPanel({
  level,
  currentTaskIndex,
  showHint,
  onToggleHint,
  onNextLevel,
  hasNextLevel,
}: LessonPanelProps) {
  const levelComplete = currentTaskIndex >= level.tasks.length;

  return (
    <section className="custom-scrollbar min-h-0 w-full flex-1 overflow-y-auto border-b border-[#30363d] bg-[#0d1117] lg:h-full lg:w-[45%] lg:flex-none lg:border-r lg:border-b-0">
      <div className="p-5 md:p-8">
        <div className="mb-6">
          <h2 className="mb-3 text-2xl font-extrabold text-white md:text-3xl">
            {level.title}
          </h2>
          <p className="text-base leading-relaxed text-[#8b949e] md:text-lg">
            {level.description}
          </p>
        </div>

        {level.concept && (
          <div className="relative mb-8 overflow-hidden rounded-xl border border-[#1f6feb]/20 bg-[#1f6feb]/5 p-5">
            <div className="absolute top-0 left-0 h-full w-1 bg-[#1f6feb]/50" />
            <div className="flex items-start">
              <Info
                size={20}
                className="mt-0.5 mr-3 shrink-0 text-[#58a6ff]"
              />
              <div>
                <h3 className="mb-2 font-semibold text-white">The Concept</h3>
                <p className="text-sm leading-relaxed text-[#8b949e]">
                  {level.concept}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="mb-4 flex items-center text-sm font-semibold tracking-wider text-[#8b949e] uppercase">
            <Play size={14} className="mr-2" /> Mission Tasks
          </h3>

          {level.tasks.map((task, index) => {
            const isTaskDone = index < currentTaskIndex;
            const isTaskActive = index === currentTaskIndex;

            return (
              <div
                key={task.id}
                className={`relative overflow-hidden rounded-xl border p-4 transition-all duration-300 ${
                  isTaskDone
                    ? "border-[#238636]/30 bg-[#238636]/10"
                    : isTaskActive
                      ? "border-[#58a6ff]/40 bg-[#21262d] shadow-[0_0_15px_rgba(88,166,255,0.1)]"
                      : "border-[#30363d] bg-[#0d1117] opacity-50"
                }`}
              >
                {isTaskActive && (
                  <div className="absolute top-0 left-0 h-full w-1 bg-[#58a6ff]" />
                )}
                <div className="flex items-start">
                  <div
                    className={`mt-0.5 mr-3 shrink-0 ${
                      isTaskDone
                        ? "text-[#3fb950]"
                        : isTaskActive
                          ? "text-[#58a6ff]"
                          : "text-[#8b949e]"
                    }`}
                  >
                    {isTaskDone ? (
                      <CheckCircle size={18} />
                    ) : (
                      <div className="mt-0.5 h-4 w-4 rounded-full border-2 border-current" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-[15px] ${isTaskDone ? "text-[#8b949e] line-through" : "font-medium text-[#c9d1d9]"}`}
                    >
                      {task.instruction}
                    </p>
                    {isTaskActive && (
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={onToggleHint}
                          className="flex items-center rounded border border-[#30363d] bg-[#0d1117] px-3 py-1.5 text-xs text-[#8b949e] transition-colors hover:text-[#c9d1d9]"
                        >
                          <Lightbulb
                            size={12}
                            className={`mr-1.5 ${showHint ? "text-yellow-500" : ""}`}
                          />
                          {showHint ? "Hide Hint" : "Need a hint?"}
                        </button>
                        {showHint && (
                          <div className="animate-fade-in-up mt-2 rounded-md border border-[#30363d] bg-[#010409] p-3 font-mono text-sm text-[#58a6ff]">
                            {task.hint}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {levelComplete && hasNextLevel && (
          <div className="animate-fade-in-up mt-8 rounded-xl border border-[#238636]/30 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#238636]/20 to-transparent p-6 text-center">
            <h3 className="mb-3 text-xl font-bold text-[#3fb950]">
              Level Complete
            </h3>
            <p className="mb-4 text-sm text-[#8b949e]">
              You have finished every task in this lesson.
            </p>
            <button
              type="button"
              onClick={onNextLevel}
              className="flex w-full items-center justify-center rounded-lg bg-[#238636] py-3 font-bold text-white shadow-[0_0_15px_rgba(35,134,54,0.3)] transition-all hover:bg-[#2ea043] hover:shadow-[0_0_20px_rgba(46,160,67,0.5)]"
            >
              Proceed to Next Stage
              <ChevronRight size={18} className="ml-1" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
