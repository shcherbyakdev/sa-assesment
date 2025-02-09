import { RatingsSummary } from "./components/RatingSummary";

function App() {
  const mockRatingSummaries = [
    {
      analyst: "John Doe",
      recommendation: "BUY",
      rating: 4.5,
    },
    {
      analyst: "Jane Smith",
      recommendation: "HOLD",
      rating: 3.0,
    },
    {
      analyst: "Alice Johnson",
      recommendation: "SELL",
      rating: 2.0,
    },
    {
      analyst: "Bob Brown",
      recommendation: "BUY",
      rating: 4.0,
    },
    {
      analyst: "Charlie Davis",
      recommendation: "HOLD",
      rating: 3.5,
    },
  ];

  return (
    <>
      <RatingsSummary ratings={mockRatingSummaries} />
    </>
  );
}

export default App;
