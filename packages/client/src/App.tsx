import { createSignal, createMemo, Component, JSX } from "solid-js";
import styles from "./App.module.css";

const App: Component<{ children: JSX.Element }> = (props) => {
  const [getStatus, setStatus] = createSignal(navigator.onLine);
  const getStatusString = createMemo(() =>
    getStatus() ? "online" : "offline",
  );
  window.addEventListener("offline", () => setStatus(false));
  window.addEventListener("online", () => setStatus(true));
  return (
    <>
      <div class={`${styles.status} ${styles[getStatusString()]}`}></div>
      {props.children}
    </>
  );
};

export default App;
