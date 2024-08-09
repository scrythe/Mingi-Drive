import { createEffect, onMount, type Component } from "solid-js";
import Game from "../game/game";
import { useMyContext } from "../context";
import { startGame } from "../game/game2";

const App: Component = () => {
  let canvas: HTMLCanvasElement;
  let button: HTMLButtonElement;
  const start = () => {
    button.style.display = "none";
    const ctx = canvas.getContext("2d")!;
    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    startGame(ctx, WIDTH, HEIGHT);
  };
  const { setShowLogin } = useMyContext()!;
  setShowLogin(false);
  return (
    <main>
      <canvas ref={canvas!}></canvas>
      <button ref={button!} onClick={start}>
        hmm
      </button>
    </main>
  );
};

export default App;
