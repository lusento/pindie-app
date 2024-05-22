"use client";
import Styles from "./AuthForm.module.css";
import { useState, useEffect } from "react";
import { endpoints } from "@/app/api/config";
import { isResponseOk, getMe, authorize } from "@/app/api/api-utils";
import { useStore } from "@/app/store/app-store";

export const AuthForm = (props) => {
  const authContext = useStore();
  const [authData, setAuthData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ status: null, text: null });

  const handleInput = (e) => {
    const { name, value } = e.target; // Деструктуризация объекта event для получения имени и значения поля
    console.log(e);
    console.log(`${e.target.name}, ${e.target.value}`);
    setAuthData((prevAuthData) => ({
      ...prevAuthData, // Копирование предыдущего состояния
      [name]: value, // Обновление значения поля, соответствующего имени поля ввода
    }));
  };

  const handleReset = () => {
    setAuthData({ identifier: "", password: "" }); // Сброс состояния к начальным значениям
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = await authorize(endpoints.auth, authData);
    if (isResponseOk(userData)) {
      authContext.login({ ...userData, id: userData._id }, userData.jwt);
      setMessage({ status: "success", text: "Вы авторизовались!" });
    } else {
      setMessage({ status: "error", text: "Неверные почта или пароль" });
    }
  };

  useEffect(() => {
    let timer;
    if (authContext.user) {
      // Данные о user из контекста
      timer = setTimeout(() => {
        setMessage({ status: null, text: null });
        props.close();
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [authContext.user]); // Данные о user из контекста

  useEffect(() => {
    if (authContext.user) {
      // Проверяем, что userData содержит данные пользователя
      console.log("Запрос авторизации...");
      authorize(endpoints.auth, {
        identifier: "aski@example.com",
        password: "ilovehtml",
      })
        .then((res) => console.log(res))
        .catch((error) => console.error(error));
    }
  }, [authContext.user]); // Зависимость от userData

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className={Styles["form"]}
    >
      <h2 className={Styles["form__title"]}>Авторизация</h2>
      <div className={Styles["form__fields"]}>
        <label className={Styles["form__field"]}>
          <span className={Styles["form__field-title"]}>Email</span>
          <input
            onInput={handleInput}
            className={Styles["form__field-input"]}
            name="email"
            type="email"
            placeholder="hello@world.com"
          />
        </label>
        <label className={Styles["form__field"]}>
          <span className={Styles["form__field-title"]}>Пароль</span>
          <input
            className={Styles["form__field-input"]}
            type="password"
            name="password"
            value={authData.password}
            onChange={handleInput}
            placeholder="***********"
          />
        </label>
      </div>
      {message.status && (
        <p className={Styles["form__message"]}>{message.text}</p>
      )}
      <div className={Styles["form__actions"]}>
        <button className={Styles["form__reset"]} type="reset">
          Очистить
        </button>
        <button className={Styles["form__submit"]} type="submit">
          Войти
        </button>
      </div>
    </form>
  );
};
