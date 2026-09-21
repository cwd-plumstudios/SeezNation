// Persistent bottom bar — stays active while browsing.
// TODO: lift now-playing state into shared context once the queue is wired up.
export function PlayerBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 flex h-20 items-center border-t border-white/10 bg-black/95 px-6">
      <p className="text-sm text-white/50">Nothing playing</p>
    </div>
  );
}
