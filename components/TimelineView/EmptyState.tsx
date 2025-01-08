export default function EmptyState(): JSX.Element {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs md:text-sm lg:text-base leading-none text-center">
      <span className="text-white/50">No history. Make some changes.</span>
    </div>
  );
}
