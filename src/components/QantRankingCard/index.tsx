import { useQuantRanking } from "../../api/hooks";
import { Card } from "../common/Card";
import { QantRankingRow } from "./QantRankingRow";

export const QantRankingCard = () => {
  const { data, isLoading } = useQuantRanking();

  return (
    <Card>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Qant Ranking</h2>

      <div className="flex flex-col">
        <QantRankingRow label="Sector" isLoading={isLoading}>
          {data?.sector}
        </QantRankingRow>

        <QantRankingRow label="Industry" isLoading={isLoading}>
          {data?.industry}
        </QantRankingRow>

        <QantRankingRow label="Ranked Overall" isLoading={isLoading}>
          <b>{data?.rankings.overall?.rank} </b> out of{" "}
          <b>{data?.rankings.overall?.total}</b>
        </QantRankingRow>

        <QantRankingRow label="Ranked in Sector" isLoading={isLoading}>
          <b>{data?.rankings?.sector?.rank} </b> out of{" "}
          <b>{data?.rankings?.sector?.total}</b>
        </QantRankingRow>

        <QantRankingRow
          label="Ranked in Industry"
          isLoading={isLoading}
          underline={false}
        >
          <b>{data?.rankings?.industry_specific?.rank} </b> out of{" "}
          <b>{data?.rankings?.industry_specific?.total}</b>
        </QantRankingRow>

        <a href="#" className="text-blue-500 text-sm font-medium py-3 px-4">
          <b>Ratings Beat The Market »</b>
        </a>
      </div>
    </Card>
  );
};
