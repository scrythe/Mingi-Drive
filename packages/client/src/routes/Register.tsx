import type { Component } from "solid-js";

import styles from "./Register.module.css";
import Form, { lastInputClass } from "../components/Form";
import { client } from "../components/Hono";
import { useNavigate } from "@solidjs/router";
import { useMyContext } from "../context";

const App: Component = () => {
  let formRef: HTMLFormElement;
  let pRef: HTMLParagraphElement;
  const navigate = useNavigate();
  const { setSession } = useMyContext()!;
  const register = async (event: Event) => {
    event.preventDefault();
    const username = formRef.username.value;
    const password = formRef.password.value;
    const email = formRef.email.value;
    const res = await client.register.$post(
      {
        json: { username, password, email },
      },
      { init: { credentials: "include" } },
    );
    const message = await res.json();
    pRef.innerHTML = message;
    pRef.style.display = "block";
    if (message != "created user successfully") return;
    setSession(true);
    navigate("/");
  };
  return (
    <main class={styles.App}>
      <Form ref={formRef!} onSubmit={register}>
        <input type="text" name="username" value="" placeholder="Username" />
        <input
          type="password"
          name="password"
          value=""
          placeholder="Password"
        />
        <input
          class={lastInputClass}
          type="email"
          name="email"
          value=""
          placeholder="Email"
        />
        <button type="submit">Submit</button>
        <p ref={pRef!}>Username already exists</p>
      </Form>
    </main>
  );
};

export default App;
