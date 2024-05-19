import { getNormalizedGamesDataByCategory } from "./api/api-utils";
import { Banner } from "./components/Banner/banner";
import { Promo } from "./components/Promo/promo";
import { endpoints } from "./api/config";
import { CardsListSection } from "./components/CardsListSection/CardsListSection";
import { CardsSlider } from "./components/CardsListSection/CardSlider";

export default async function Home() {
  const popularGames = await getNormalizedGamesDataByCategory(
    endpoints.games,
    "popular"
  );
  const newGames = await getNormalizedGamesDataByCategory(
    endpoints.games,
    "new"
  );

  return (
    <main className="main">
      <Banner />
    
      <CardsListSection type="slider" id="popular" title="Популярные" data={popularGames} />

      <CardsListSection type="slider" id="new" title="Новинки" data={newGames} />
      
      <Promo />
    </main>
  );
}
