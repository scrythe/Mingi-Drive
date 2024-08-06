import type { Component } from "solid-js";

import styles from "./Register.module.css";
import Form from "../components/Form";
import { client } from "../components/Hono";

const App: Component = () => {
  const register = async (event: Event) => {
    event.preventDefault();
    const res = await client.register.$post({ json: { username: "hmmm", password: "hm", email: "email" } })
    console.log(res)
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
