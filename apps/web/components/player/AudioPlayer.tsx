"use client";

import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import type { Song } from "@/lib/types";

interface AudioPlayerProps {
  song: Song;
}

export function AudioPlayer({ song }: AudioPlayerProps) {
  const howlRef = useRef<Howl | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      howlRef.current?.unload();
    };
  }, []);

  const handlePlay = async () => {
    setError(null);

    if (howlRef.current) {
      howlRef.current.play();
      return;
    }

    const res = await fetch(`/api/audio/signed-url?slug=${song.slug}&type=stream`);
    const body = await res.json();

    if (!res.ok) {
      setError(body.error ?? "Playback unavailable");
      return;
    }

    howlRef.current = new Howl({
      src: [body.url],
      html5: true,
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
      onend: () => setIsPlaying(false),
    });
    howlRef.current.play();

    fetch("/api/plays", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ songSlug: song.slug }),
    }).catch(() => {});
  };

  const handlePause = () => {
    howlRef.current?.pause();
  };

  return (
    <div className="mt-6 flex items-center gap-4 rounded bg-white/5 p-4">
      <button
        onClick={isPlaying ? handlePause : handlePlay}
        className="rounded-full bg-white px-4 py-2 font-semibold text-black"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
