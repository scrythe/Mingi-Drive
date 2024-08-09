import { createEffect, Show, type Component } from "solid-js";

// import ABtn from "../components/AnchorButton";
import styles from "./Home.module.css";
import { useNavigate } from "@solidjs/router";
import { useMyContext } from "../context";

const App: Component = () => {
  const { session } = useMyContext()!;
  const navigate = useNavigate();
  const gotoHome = () => {
    navigate("/gamepin");
  };
  const gotoGame = () => {
    navigate("/game");
  };
  // const sendPin = (event: Event) => {
  //   event.preventDefault();
  // };
  return (
    <main class={styles.home}>
      <h1 class={styles.header}>Mingidrift</h1>
      <nav class={styles.gameNav}>
        <Show
          when={!session()}
          fallback={<button onClick={gotoGame}>Join Game</button>}
        >
          <button class={styles.createGame} onClick={gotoHome}>
            Create Game
          </button>
        </Show>
      </nav>
    </main>
  );
};

export default App;
