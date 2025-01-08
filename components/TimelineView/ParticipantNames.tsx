import { cn } from "@/lib/utils/cn";

export type ParticipantNamesProps = { participants: string[] };

export default function ParticipantNames({
  participants,
}: ParticipantNamesProps): JSX.Element {
  return (
    <div className="flex-shrink-0 flex flex-col gap-y-1.5">
      {participants.map((name) => (
        <div
          key={name}
          className={cn(
            "h-3 leading-none flex-shrink-0 text-right text-white/50",
            "font-medium text-xs md:text-sm select-none"
          )}
        >
          <div className="h-3 leading-3 block md:hidden">{shortenFullName(name)}</div>
          <div className="h-3 leading-3 hidden md:block">{name}</div>
        </div>
      ))}
    </div>
  );
}

function shortenFullName(fullName: string): string {
  const names = fullName.split(/\s+/);
  if (names.length === 1) {
    return names[0];
  }

  const [firstName, lastName] = names;
  return `${firstName} ${lastName[0].toLocaleUpperCase()}.`;
}
