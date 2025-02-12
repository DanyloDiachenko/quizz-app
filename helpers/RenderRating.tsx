import { IoStar } from "react-icons/io5";
import { cn } from "./cn";

interface RenderRatingProps {
    rating: number;
    className?: string;
}

export const RenderRating = ({ rating, className }: RenderRatingProps) => {
    return (
        <div className={cn("flex", className)}>
            {[...Array(5)].map((_, i) => (
                <IoStar
                    key={i}
                    className={cn(
                        "size-5",
                        i < Math.floor(rating) ? "text-yellow" : "text-gray",
                    )}
                />
            ))}
        </div>
    );
};
