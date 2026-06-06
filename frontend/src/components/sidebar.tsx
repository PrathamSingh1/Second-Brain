"use client";

import { useState } from "react";
import {
  IconBrain,
  IconHome,
  IconStack2,
  IconBookmark,
  IconTag,
  IconSettings,
  IconPlus,
} from "@tabler/icons-react";
import { SidebarItem } from "./sidebar-item";

const NAV_ITEMS = [
  { id: "home", text: "Home", icon: <IconHome /> },
  { id: "all", text: "All Content", icon: <IconStack2 /> },
  { id: "saved", text: "Saved", icon: <IconBookmark /> },
  { id: "tags", text: "Tags", icon: <IconTag /> },
];

interface SidebarProps {
  onAddContent?: () => void;
}

export function Sidebar({ onAddContent }: SidebarProps) {
  const [active, setActive] = useState("home");

  return (
    <div
      className="flex flex-col h-screen w-56 bg-white border-r border-neutral-100 px-3 py-5"
      style={{
        boxShadow:
          "0 1px 1px rgba(0,0,0,0.05), 0 4px 6px rgba(34,42,53,0.04), 0 24px 68px rgba(47,48,55,0.05), 0 2px 3px rgba(0,0,0,0.04)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3 mb-6">
        <div className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-[8px] bg-[#3b5bdb]">
          <IconBrain className="h-[17px] w-[17px] text-white" />
        </div>
        <span className="text-[15px] font-bold tracking-[-0.4px] text-neutral-800">
          Second <span className="text-[#3b5bdb]">Brain</span>
        </span>
      </div>

      {/* Add content button */}
      <button
        onClick={onAddContent}
        className="flex items-center justify-center gap-1.5 w-full mb-5 py-1.5 rounded-lg bg-neutral-800 text-neutral-200 text-[12px] font-semibold cursor-pointer select-none active:scale-[0.97]"
        style={{
          boxShadow:
            "0 1px 1px rgba(0,0,0,0.05), 0 4px 6px rgba(34,42,53,0.04), 0 2px 3px rgba(0,0,0,0.04)",
        }}
      >
        <IconPlus className="h-4 w-4" />
        Add Content
      </button>

      {/* Nav */}
      <div className="flex flex-col gap-0.5">
        {NAV_ITEMS.map((item) => (
          <SidebarItem
            key={item.id}
            text={item.text}
            icon={item.icon}
            active={active === item.id}
            onClick={() => setActive(item.id)}
          />
        ))}
      </div>

      {/* Bottom */}
      <div className="mt-auto flex flex-col gap-0.5 border-t border-neutral-100 pt-3">
        <SidebarItem
          text="Settings"
          icon={<IconSettings />}
          active={active === "settings"}
          onClick={() => setActive("settings")}
        />
      </div>
    </div>
  );
}
