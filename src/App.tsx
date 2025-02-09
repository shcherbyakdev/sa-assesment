import { FactorGradesCard } from "./components/FactorGradesCard";
import { RatingsSummaryCard } from "./components/RatingSummaryCard";
import { QantRankingCard } from "./components/QantRankingCard";
import { useUserContext } from "./context/UserContext";

function App() {
  const { user } = useUserContext();

  return (
    <>
      <RatingsSummaryCard />
      <FactorGradesCard />
      {user?.premium && <QantRankingCard />}
    </>
  );
}

export default App;
