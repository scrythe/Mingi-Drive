import { Component, createSignal, Show } from "solid-js";
// import { createSignal, createMemo, Component, JSX } from "solid-js";
import user from "./assets/user-solid.svg";
import styles from "./App.module.css";
import { A, RouteSectionProps } from "@solidjs/router";
import { client } from "./components/Hono";

const App: Component<RouteSectionProps> = (props) => {
  // const [getStatus, setStatus] = createSignal(navigator.onLine);
  // const getStatusString = createMemo(() =>
  //   getStatus() ? "online" : "offline",
  // );
  // window.addEventListener("offline", () => setStatus(false));
  // window.addEventListener("online", () => setStatus(true));

  const [session, setSession] = createSignal(false);
  const getSession = async () => {
    const res = await client.session.$get(
      {},
      { init: { credentials: "include" } },
    );
    setSession(await res.json());
  };
  getSession();

  return (
    <div class={styles.App}>
      {/* <div class={`${styles.status} ${styles[getStatusString()]}`}></div>;*/}
      <div class={styles.user}>
        <img src={user} alt="logo" />
        <Show when={!session()} fallback={<A href="/logout">Logout</A>}>
          <A href="/register">
            Create
            <br />
            Account
          </A>
        </Show>
      </div>
      {props.children}
    </div>
  );
};

export default App;
