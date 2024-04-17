import Styles from "@/app/games/[id]/Game.module.css"

export const GameNotFound = (props) => {
    return (
        <section className={Styles["game"]}>
      <img
        className={Styles["dog_image"]}
        src="https://i.postimg.cc/bwjBBNfM/Game-Not-Found.jpg"
        alt="Пёсель"
      />
      <p className={Styles["not__found__game"]}>
  Упс!<br /> К сожалению Пёсель не смог догнать мячик с данной игрой...
</p>
      <img
        className={Styles["Ball"]}
        src="https://i.postimg.cc/Vvn3JScq/image.png"
        alt="Мячик"
      />
    </section>
    )
}