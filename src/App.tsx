import { FactorGradesCard } from "./components/FactorGradesCard";
import { RatingsSummaryCard } from "./components/RatingSummaryCard";
import { QantRankingCard } from "./components/QantRankingCard";
import { useUserContext } from "./context/UserContext";

function App() {
  const { user } = useUserContext();

  return (
    <>
      {user?.premium && (
        <>
          <RatingsSummaryCard />
          <FactorGradesCard />
        </>
      )}
      <QantRankingCard />
    </>
  );
}

export default App;
