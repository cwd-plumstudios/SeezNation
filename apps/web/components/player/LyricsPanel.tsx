import type { Lyrics } from "@/lib/types";

interface LyricsPanelProps {
  lyrics: Lyrics;
}

// Static scrolling text for now. `lyrics.syncedJson` carries time-coded
// lines for karaoke-style highlighting — see the plan's open questions.
export function LyricsPanel({ lyrics }: LyricsPanelProps) {
  return (
    <div className="mt-6 whitespace-pre-line rounded bg-white/5 p-4 text-white/80">
      {lyrics.body}
    </div>
  );
}
