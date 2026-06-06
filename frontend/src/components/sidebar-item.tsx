import type { ReactElement } from "react";

interface SidebarItemProps {
  text: string;
  icon: ReactElement;
  active?: boolean;
  onClick?: () => void;
}

export function SidebarItem({ text, icon, active, onClick }: SidebarItemProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer select-none text-[13px] font-medium transition-colors active:scale-[0.98]
        ${
          active
            ? "bg-neutral-100 text-neutral-800"
            : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700"
        }`}
    >
      <div className="flex-shrink-0 [&>svg]:h-[18px] [&>svg]:w-[18px]">
        {icon}
      </div>
      <div>{text}</div>
    </div>
  );
}
