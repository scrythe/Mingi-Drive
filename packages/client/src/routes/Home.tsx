import type { Component } from "solid-js";

// import ABtn from "../components/AnchorButton";
import styles from "./Home.module.css";
import { useNavigate } from "@solidjs/router";

const App: Component = () => {
  const navigate = useNavigate();
  const gotoHome = (event: Event) => {
    navigate("/gamepin")
  };
  // const sendPin = (event: Event) => {
  //   event.preventDefault();
  // };
  return (
    <main class={styles.home}>
      <h1 class={styles.header}>Mingidrift</h1>
      <nav class={styles.gameNav}>
        <button class={styles.createGame} onClick={gotoHome}>
          Create Game
        </button>
        <button onClick={gotoHome}>Join Game</button>
      </nav>
    </main>
  );
};

export default App;
