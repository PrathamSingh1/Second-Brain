import { IconPlus } from "@tabler/icons-react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  icon?: boolean;
}

export const Button = ({ text, onClick, icon = false }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-neutral-800 rounded-lg text-[12px] font-semibold w-fit text-neutral-200 cursor-pointer active:scale-[0.97] select-none whitespace-nowrap"
      style={{
        boxShadow:
          "0 1px 1px rgba(0,0,0,0.05), 0 4px 6px rgba(34,42,53,0.04), 0 2px 3px rgba(0,0,0,0.04)",
      }}
    >
      {icon && <IconPlus className="h-4 w-4 flex-shrink-0" />}
      <span className="hidden sm:inline">{text}</span>
      {!icon && <span className="sm:hidden">{text}</span>}
    </button>
  );
};
