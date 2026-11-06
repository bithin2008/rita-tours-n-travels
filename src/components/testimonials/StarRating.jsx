import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StarRating({ rating = 5, className }) {
  return (
    <div className={cn("flex items-center gap-0.5", className)} role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          aria-hidden="true"
          className={cn(
            "h-3.5 w-3.5",
            star <= Math.round(rating) ? "fill-sunshine text-sunshine" : "fill-transparent text-navy/20",
          )}
        />
      ))}
    </div>
  );
}