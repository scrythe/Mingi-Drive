import type { Component } from "solid-js";

import ABtn from "../components/AnchorButton";
import styles from "./Home.module.css";

const App: Component = () => {
  // const sendPin = (event: Event) => {
  //   event.preventDefault();
  // };
  return (
    <div class={styles.App}>
      <h1 class={styles.header}>Mingidrift</h1>
      <nav class={styles.gameNav}>
        <ABtn class={styles.createGame}>Create Game</ABtn>
        <ABtn>Join Game</ABtn>
      </nav>
    </div>
  );
};

export default App;
