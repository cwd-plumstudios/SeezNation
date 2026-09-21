"use client";

import type { Song } from "@/lib/types";

interface QueueDrawerProps {
  queue: Song[];
  open: boolean;
  onClose: () => void;
}

export function QueueDrawer({ queue, open, onClose }: QueueDrawerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-black/95 p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Queue</h2>
        <button onClick={onClose} className="text-white/60">
          Close
        </button>
      </div>
      <ul className="mt-4 flex flex-col gap-2">
        {queue.map((song) => (
          <li key={song.id} className="text-sm">
            {song.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
