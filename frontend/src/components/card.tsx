import { useEffect, useRef } from "react";
import {
  IconBrandYoutube,
  IconBrandX,
  IconExternalLink,
} from "@tabler/icons-react";

type CardType = "youtube" | "twitter";

interface CardProps {
  title: string;
  link: string;
  type: CardType;
}

function getYouTubeEmbedUrl(url: string): string {
  // Handle youtu.be short links
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;

  // Handle youtube.com/watch?v=
  const longMatch = url.match(/[?&]v=([^&]+)/);
  if (longMatch) return `https://www.youtube.com/embed/${longMatch[1]}`;

  // Handle youtube.com/embed/ already
  if (url.includes("/embed/")) return url;

  return url;
}

function getTwitterStatusUrl(url: string): string {
  // Normalize x.com → twitter.com for the embed blockquote href
  return url.replace("x.com", "twitter.com");
}

function YouTubeEmbed({ url }: { url: string }) {
  const embedUrl = getYouTubeEmbedUrl(url);
  return (
    <div
      className="relative w-full overflow-hidden rounded-lg bg-neutral-100"
      style={{ aspectRatio: "16/9" }}
    >
      <iframe
        className="absolute inset-0 h-full w-full"
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}

function TwitterEmbed({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const twitterUrl = getTwitterStatusUrl(url);

  useEffect(() => {
    if (!containerRef.current) return;

    // Load Twitter widget script if not already present
    const existingScript = document.querySelector(
      'script[src="https://platform.twitter.com/widgets.js"]',
    );

    const renderWidget = () => {
      if ((window as any).twttr?.widgets) {
        (window as any).twttr.widgets.load(containerRef.current);
      }
    };

    if (existingScript) {
      renderWidget();
    } else {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      script.onload = renderWidget;
      document.body.appendChild(script);
    }
  }, [url]);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden rounded-lg"
      style={{ minHeight: "120px" }}
    >
      <blockquote className="twitter-tweet" data-theme="light">
        <a href={twitterUrl}></a>
      </blockquote>
    </div>
  );
}

export const Card = ({ title, link, type }: CardProps) => {
  return (
    <div
      className="w-85 rounded-xl bg-white flex flex-col p-6"
      style={{
        boxShadow:
          "0 1px 1px rgba(0,0,0,0.05), 0 4px 6px rgba(34,42,53,0.04), 0 24px 68px rgba(47,48,55,0.05), 0 2px 3px rgba(0,0,0,0.04)",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-[14px] font-bold text-neutral-800 leading-tight">
            {title}
          </h2>
          <span
            className="inline-flex items-center gap-1 self-start rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
            style={{
              background:
                type === "youtube"
                  ? "rgba(220,38,38,0.08)"
                  : "rgba(29,161,242,0.08)",
              color: type === "youtube" ? "#dc2626" : "#1da1f2",
            }}
          >
            {type === "youtube" ? (
              <>
                <IconBrandYoutube className="h-3 w-3" />
                YouTube
              </>
            ) : (
              <>
                <IconBrandX className="h-3 w-3" />
                Twitter / X
              </>
            )}
          </span>
        </div>

        {/* External link */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-0.5 flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100"
          style={{
            boxShadow:
              "0 1px 1px rgba(0,0,0,0.05), 0 4px 6px rgba(34,42,53,0.04), 0 2px 3px rgba(0,0,0,0.04)",
          }}
          aria-label="Open original link"
        >
          <IconExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Divider */}
      <div className="mb-4 h-px w-full bg-neutral-100" />

      {/* Embed area */}
      <div className="relative flex-1 rounded-lg border border-dashed border-neutral-200 bg-gray-50 p-3 max-h-72 overflow-y-auto">
        {type === "youtube" ? (
          <YouTubeEmbed url={link} />
        ) : (
          <TwitterEmbed url={link} />
        )}
      </div>
    </div>
  );
};
