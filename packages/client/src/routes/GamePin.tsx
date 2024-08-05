import type { Component } from "solid-js";

import styles from "./GamePin.module.css";

const App: Component = () => {
  const sendPin = (event: Event) => {
    event.preventDefault();
  };
  return (
    <div class={styles.App}>
      <h1>Mingidrift</h1>
      <form class={styles.gameForm} onSubmit={sendPin}>
        <input
          class={styles.gamePin}
          type="text"
          name="gamePin"
          value=""
          placeholder="Game Pin"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
