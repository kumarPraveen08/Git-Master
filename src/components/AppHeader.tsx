import { BookMarked, ChevronRight, Menu } from "lucide-react";

type AppHeaderProps = {
  moduleTitle: string;
  levelTitle: string;
  completedCount: number;
  totalLevels: number;
  onOpenMenu: () => void;
};

export function AppHeader({
  moduleTitle,
  levelTitle,
  completedCount,
  totalLevels,
  onOpenMenu,
}: AppHeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-[#30363d] bg-[#0d1117] px-4 md:px-6">
      <div className="flex min-w-0 items-center space-x-2 text-sm md:space-x-3">
        <button
          type="button"
          onClick={onOpenMenu}
          className="rounded-md p-2 text-[#c9d1d9] hover:bg-[#21262d] md:hidden"
          aria-label="Open course menu"
        >
          <Menu size={18} />
        </button>
        <BookMarked size={16} className="hidden shrink-0 text-[#8b949e] sm:block" />
        <span className="hidden truncate text-[#8b949e] sm:inline">
          {moduleTitle}
        </span>
        <ChevronRight size={14} className="hidden shrink-0 text-[#8b949e] sm:block" />
        <span className="truncate font-semibold text-white">{levelTitle}</span>
      </div>
      <span className="shrink-0 rounded-full border border-[#30363d] bg-[#21262d] px-3 py-1 font-mono text-xs text-[#8b949e]">
        {completedCount} / {totalLevels}
      </span>
    </header>
  );
}
