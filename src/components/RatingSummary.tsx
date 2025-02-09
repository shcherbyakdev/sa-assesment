import { useUser } from "../api/queries";
import { Card } from "./common/Card";
import { StatRow } from "./common/StatRow";

interface RatingsSummaryProps {
  ratings: any[];
}

export const RatingsSummary = ({ ratings }: RatingsSummaryProps) => {
  const { data: user } = useUser();

  return (
    <Card title="Ratings Summary">
      <div className="space-y-2">
        {ratings.map((rating) => (
          <StatRow
            key={rating.analyst}
            label={rating.analyst}
            value={`${rating.recommendation} ${rating.rating.toFixed(2)}`}
          />
        ))}
      </div>
    </Card>
  );
};
