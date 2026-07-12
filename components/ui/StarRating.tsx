import { Star } from "lucide-react";

type Props = {
  value: 1 | 2 | 3 | 4 | 5;
};

export function StarRating({
  value,
}: Props) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={18}
          className={
            index < value
              ? "fill-yellow-400 text-yellow-400"
              : "text-zinc-300"
          }
        />
      ))}
    </div>
  );
}