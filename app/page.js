import { getGamesByCategory } from "./data/data-utils";

import { Banner } from "./components/Banner/banner";

import { Promo } from "./components/Promo/promo";

import { CardList } from "./components/CardsList/CardList";

export default function Home(props) {

const popularGames = getGamesByCategory("popular")
const newGames = getGamesByCategory("new")

  return (
    <main className="main">
      <Banner />
      <CardList id="popular" title="Популярные" data={popularGames}/>
      <CardList id="new" title="Новинки" data={newGames}/>
      <Promo />
    </main>
  );
}
