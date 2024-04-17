"use client";
import { useGetDataByCategory } from "../api/api-hooks";
import { endpoints } from "../api/config";
import { Preloader } from "../components/Preloader/Preloader";
import { CardsListSection } from "../components/CardsListSection/CardsListSection";

export default function New() {
  const runnerGames = useGetDataByCategory(endpoints.games, "runner");
  return (
    <main className="main-inner">
      {runnerGames ? (
        <CardsListSection id="runner" title="Раннеры" data={runnerGames} />
      ) : (
        <Preloader />
      )}
    </main>
  );
}
