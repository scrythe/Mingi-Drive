import { Component, createSignal, Show } from "solid-js";
// import { createSignal, createMemo, Component, JSX } from "solid-js";
import user from "./assets/user-solid.svg";
import styles from "./App.module.css";
import { A, RouteSectionProps } from "@solidjs/router";
import { client } from "./components/Hono";
import { Provider, useMyContext } from "./context";

const App: Component<RouteSectionProps> = (props) => {
  const { session, setSession } = useMyContext()!;

  // const [getStatus, setStatus] = createSignal(navigator.onLine);
  // const getStatusString = createMemo(() =>
  //   getStatus() ? "online" : "offline",
  // );
  // window.addEventListener("offline", () => setStatus(false));
  // window.addEventListener("online", () => setStatus(true));

  const getSession = async () => {
    const res = await client.session.$get(
      {},
      { init: { credentials: "include" } },
    );
    setSession(await res.json());
  };
  getSession();

  return (
    <Provider>
      <div class={styles.App}>
        {/* <div class={`${styles.status} ${styles[getStatusString()]}`}></div>;*/}
        <div class={styles.user}>
          <img src={user} alt="logo" />
          <Show when={!session()} fallback={<A href="/logout">Logout</A>}>
            <A href="/login">Login</A>
          </Show>
        </div>
        {props.children}
      </div>
    </Provider>
  );
};

export default App;
