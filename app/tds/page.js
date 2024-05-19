"use client";
import { useGetDataByCategory } from "../api/api-hooks";
import { endpoints } from "../api/config";
import { Preloader } from "../components/Preloader/Preloader";
import { CardsListSection } from "../components/CardsListSection/CardsListSection";

export default function New() {
  const tdsGames = useGetDataByCategory(endpoints.games, "TDS");
  return (
    <main className="main-inner">
      {tdsGames ? (
        <CardsListSection id="TDS" title="Тавер-дефенс" data={tdsGames} />
      ) : (
        <Preloader />
      )}
    </main>
  );
}
