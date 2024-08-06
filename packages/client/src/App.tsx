import { Component } from "solid-js";
// import { createSignal, createMemo, Component, JSX } from "solid-js";
import user from "./assets/user-solid.svg";
import styles from "./App.module.css";
import { A, RouteSectionProps } from "@solidjs/router";

const App: Component<RouteSectionProps> = (props) => {
  // const [getStatus, setStatus] = createSignal(navigator.onLine);
  // const getStatusString = createMemo(() =>
  //   getStatus() ? "online" : "offline",
  // );
  // window.addEventListener("offline", () => setStatus(false));
  // window.addEventListener("online", () => setStatus(true));
  return (
    <div class={styles.App}>
      {/* <div class={`${styles.status} ${styles[getStatusString()]}`}></div>;*/}
      <div class={styles.user}>
        <img src={user} alt="logo" />
        <A href="/register">
          Create
          <br />
          Account
        </A>
      </div>
      {props.children}
    </div>
  );
};

export default App;
