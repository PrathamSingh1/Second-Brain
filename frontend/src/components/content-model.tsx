"use client";

import { useState } from "react";
import {
  IconX,
  IconBrandYoutube,
  IconBrandX,
  IconLink,
  IconPlus,
} from "@tabler/icons-react";

type CardType = "youtube" | "twitter";

interface ContentModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: { title: string; link: string; type: CardType }) => void;
}

export default function ContentModal({
  open,
  onClose,
  onAdd,
}: ContentModalProps) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState<CardType>("youtube");

  if (!open) return null;

  const handleSubmit = () => {
    if (!title.trim() || !link.trim()) return;
    onAdd({ title: title.trim(), link: link.trim(), type });
    setTitle("");
    setLink("");
    setType("youtube");
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        className="w-[22rem] rounded-xl bg-white flex flex-col p-6"
        style={{
          boxShadow:
            "0 1px 1px rgba(0,0,0,0.05), 0 4px 6px rgba(34,42,53,0.04), 0 24px 68px rgba(47,48,55,0.05), 0 2px 3px rgba(0,0,0,0.04)",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <h2 className="text-[14px] font-bold text-neutral-800">
              Add Content
            </h2>
            <p className="mt-1 text-[12px] text-neutral-500">
              Paste a YouTube or Twitter/X link to embed.
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 active:scale-[0.97]"
          >
            <IconX className="h-4 w-4" />
          </button>
        </div>

        {/* Divider */}
        <div className="my-4 h-px w-full bg-neutral-100" />

        {/* Form */}
        <div className="rounded-lg border border-dashed border-neutral-200 bg-gray-50 divide-y divide-neutral-200 overflow-hidden">
          {/* Title field */}
          <div className="flex items-center gap-3 px-4 py-3">
            <div
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-white"
              style={{
                boxShadow:
                  "0 1px 1px rgba(0,0,0,0.05), 0 4px 6px rgba(34,42,53,0.04), 0 2px 3px rgba(0,0,0,0.04)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-neutral-500"
              >
                <path d="M4 7V4h16v3" />
                <path d="M9 20h6" />
                <path d="M12 4v16" />
              </svg>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <p className="text-[11px] font-semibold text-neutral-500 mb-0.5">
                Title
              </p>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Fireship — 100s of TypeScript"
                className="w-full bg-transparent text-[12px] text-neutral-700 placeholder:text-neutral-300 outline-none"
              />
            </div>
          </div>

          {/* Link field */}
          <div className="flex items-center gap-3 px-4 py-3">
            <div
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-white"
              style={{
                boxShadow:
                  "0 1px 1px rgba(0,0,0,0.05), 0 4px 6px rgba(34,42,53,0.04), 0 2px 3px rgba(0,0,0,0.04)",
              }}
            >
              <IconLink className="h-4 w-4 text-neutral-500" />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <p className="text-[11px] font-semibold text-neutral-500 mb-0.5">
                Link
              </p>
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://..."
                className="w-full bg-transparent text-[12px] text-neutral-700 placeholder:text-neutral-300 outline-none"
              />
            </div>
          </div>

          {/* Type selector */}
          <div className="flex items-center gap-3 px-4 py-3">
            <div
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-white"
              style={{
                boxShadow:
                  "0 1px 1px rgba(0,0,0,0.05), 0 4px 6px rgba(34,42,53,0.04), 0 2px 3px rgba(0,0,0,0.04)",
              }}
            >
              {type === "youtube" ? (
                <IconBrandYoutube className="h-4 w-4 text-red-500" />
              ) : (
                <IconBrandX className="h-4 w-4 text-neutral-700" />
              )}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <p className="text-[11px] font-semibold text-neutral-500 mb-1.5">
                Type
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setType("youtube")}
                  className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold"
                  style={{
                    background:
                      type === "youtube"
                        ? "rgba(220,38,38,0.08)"
                        : "transparent",
                    color: type === "youtube" ? "#dc2626" : "#a3a3a3",
                    boxShadow:
                      type === "youtube"
                        ? "0 1px 1px rgba(0,0,0,0.05), 0 2px 3px rgba(0,0,0,0.04)"
                        : "none",
                  }}
                >
                  <IconBrandYoutube className="h-3 w-3" />
                  YouTube
                </button>
                <button
                  onClick={() => setType("twitter")}
                  className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold"
                  style={{
                    background:
                      type === "twitter"
                        ? "rgba(29,161,242,0.08)"
                        : "transparent",
                    color: type === "twitter" ? "#1da1f2" : "#a3a3a3",
                    boxShadow:
                      type === "twitter"
                        ? "0 1px 1px rgba(0,0,0,0.05), 0 2px 3px rgba(0,0,0,0.04)"
                        : "none",
                  }}
                >
                  <IconBrandX className="h-3 w-3" />
                  Twitter / X
                </button>
              </div>
            </div>
          </div>

          {/* Submit row */}
          <div className="flex items-center justify-center gap-2 px-4 py-3">
            <button
              onClick={handleSubmit}
              disabled={!title.trim() || !link.trim()}
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-semibold text-neutral-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-100 active:scale-[0.97] cursor-pointer"
              style={{
                boxShadow:
                  "0 1px 1px rgba(0,0,0,0.05), 0 4px 6px rgba(34,42,53,0.04), 0 2px 3px rgba(0,0,0,0.04)",
              }}
            >
              <IconPlus className="h-4 w-4" />
              Add Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
