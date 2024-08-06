import type { Component } from "solid-js";

import styles from "./Register.module.css";
import Form from "../components/Form";

const App: Component = () => {
  const register = (event: Event) => {
    event.preventDefault();
  };
  return (
    <main class={styles.App}>
      <Form onSubmit={register}>
        <input
          type="text"
          name="username"
          value=""
          placeholder="Username"
        />
        <input
          value=""
          placeholder="Password"
        />
        <input
          type="email"
          name="email"
          value=""
          placeholder="Email"
        />
        <button type="submit">Submit</button>
      </Form>
    </main>
  );
};

export default App;
