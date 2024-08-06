import type { Component } from "solid-js";

import Form from "../components/Form";
import styles from "./GamePin.module.css";

const App: Component = () => {
  const sendPin = (event: Event) => {
    event.preventDefault();
  };
  return (
    <main class={styles.App}>
      <Form onSubmit={sendPin}>
        <input
          type="text"
          name="gamePin"
          value=""
          placeholder="Game Pin"
        />
        <button type="submit">Submit</button>
      </Form>
    </main>
  );
};

export default App;
