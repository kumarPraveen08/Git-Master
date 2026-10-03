import { useState } from "react";
import { AppHeader } from "./components/AppHeader";
import { Certificate } from "./components/Certificate";
import { LessonPanel } from "./components/LessonPanel";
import { Sidebar } from "./components/Sidebar";
import { Terminal } from "./components/Terminal";
import { useCourseProgress } from "./hooks/useCourseProgress";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const course = useCourseProgress();

  return (
    <div className="relative flex h-dvh overflow-hidden bg-[#0d1117] font-sans text-[#c9d1d9]">
      {course.courseComplete && (
        <Certificate
          userName={course.userName}
          onRestart={() => course.setCourseComplete(false)}
        />
      )}

      {menuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          aria-label="Close course menu"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <Sidebar
        open={menuOpen}
        activeModuleIndex={course.activeModuleIndex}
        activeLevelIndex={course.activeLevelIndex}
        completedLevels={course.completedLevels}
        expandedModules={course.expandedModules}
        onToggleModule={course.toggleModuleExpand}
        onJumpToLevel={course.jumpToLevel}
        onReset={course.handleResetProgress}
        onClose={() => setMenuOpen(false)}
      />

      <main className="flex h-dvh min-w-0 flex-1 flex-col">
        <AppHeader
          moduleTitle={course.activeModule.title}
          levelTitle={course.activeLevel.title}
          completedCount={course.completedLevels.size}
          totalLevels={course.totalLevels}
          onOpenMenu={() => setMenuOpen(true)}
        />

        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          <LessonPanel
            level={course.activeLevel}
            currentTaskIndex={course.currentTaskIndex}
            showHint={course.showHint}
            onToggleHint={() => course.setShowHint((open) => !open)}
            onNextLevel={course.handleNextLevel}
            hasNextLevel={course.hasNextLevel}
          />
          <section className="flex min-h-0 w-full flex-1 flex-col bg-[#010409] p-3 md:p-6 lg:h-full lg:w-[55%] lg:flex-none">
            <div className="min-h-0 flex-1">
              <Terminal
                tasks={course.activeLevel.tasks}
                currentTaskIndex={course.currentTaskIndex}
                onTaskComplete={course.handleTaskComplete}
                currentBranch={course.currentBranch}
                setCurrentBranch={course.setCurrentBranch}
                setUserName={course.setUserName}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
