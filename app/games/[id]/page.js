"use client";
import { endpoints } from "@/app/api/config";
import Styles from "./Game.module.css";
import {
  checkIfUserVoted,
  getNormalizedGameDataById,
  isResponseOk,
  vote,
} from "@/app/api/api-utils";
import { useEffect, useState } from "react";
import { GameNotFound } from "@/app/components/NotFound/NotFound";
import { Preloader } from "@/app/components/Preloader/Preloader";
import { useContext } from "react";
import { AuthContext } from "@/app/context/app-context";
import { useStore } from "@/app/store/app-store";

export default function GamePage(props) {
  const authContext = useStore()
  const [game, setGame] = useState(null);
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [isVoted, setIsVoted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setPreloaderVisible(true); // Показываем прелоадер перед загрузкой данных
      const gameData = await getNormalizedGameDataById(
        endpoints.games,
        props.params.id
      );
      if (isResponseOk(gameData)) {
        // Проверяем, что данные успешно получены
        setGame(gameData);
      } else {
        setGame(null);
      }
      setPreloaderVisible(false); // Скрываем прелоадер после загрузки данных
    }
    fetchData();
  }, []);

  useEffect(() => {
    authContext.user && game
      ? setIsVoted(checkIfUserVoted(game, authContext.user.id))
      : setIsVoted(false);
  }, [authContext.user, game]);

  const handleVote = async () => {
    const jwt = authContext.token; // Данные о токене получаем из контекста
    let usersIdArray = game.users.length
      ? game.users.map((user) => user.id)
      : [];
    usersIdArray.push(authContext.user.id); // Данные о пользователе получаем из контекста
    const response = await vote(
      `${endpoints.games}/${game.id}`,
      jwt,
      usersIdArray
    );
    if (isResponseOk(response)) {
      setGame(() => {
        return {
          ...game,
          // Данные о пользователе получаем из контекста
          users: [...game.users, authContext.user],
        };
      });
      setIsVoted(true);
    }
  };

  return game ? (
    <>
      <section className={Styles["game"]}>
        <iframe className={Styles["game__iframe"]} src={game.link}></iframe>
      </section>
      <section className={Styles["about"]}>
        <h2 className={Styles["about__title"]}>{game.title}</h2>
        <div className={Styles["about__content"]}>
          <p className={Styles["about__description"]}>{game.description}</p>
          <div className={Styles["about__author"]}>
            <p>
              Автор: {""}
              <span className={Styles["about__accent"]}>{game.developer}</span>
            </p>
          </div>
        </div>
        <div className={Styles["about__vote"]}>
          <p className={Styles["about__vote-amount"]}>
            За игру уже проголосовали:{" "}
            <span className={Styles["about__accent"]}>{game.users.length}</span>
          </p>
          <button
            disabled={!authContext.isAuth || isVoted}
            className={`button ${Styles["about__vote-button"]}`}
            onClick={handleVote}
          >
            {isVoted ? "Голос учтён" : "Голосовать"}
          </button>
        </div>
      </section>
    </>
  ) : preloaderVisible ? (
    <Preloader />
  ) : (
    <GameNotFound />
  );
}

