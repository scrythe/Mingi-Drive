import { createEffect, onMount, type Component } from "solid-js";
import Game from "../components/game";

import { useMyContext } from "../context";

const App: Component = () => {
  let canvas: HTMLCanvasElement;
  // onMount(() => {
  //   const ctx = canvas.getContext("2d")!;
  //   const WIDTH = window.innerWidth;
  //   const HEIGHT = window.innerHeight;
  //   canvas.width = WIDTH;
  //   canvas.height = HEIGHT;
  //   const game = new Game(ctx, WIDTH, HEIGHT);
  //   requestAnimationFrame(() => {
  //     game.draw();
  //   });
  // });
  let button: HTMLButtonElement;
  const start = () => {
    document.querySelector("html")!.requestFullscreen();
    interface ExtendedScreenOrientation extends ScreenOrientation {
      lock(orientation: string): Promise<void>;
    }
    (screen.orientation as ExtendedScreenOrientation).lock("landscape");

    const ctx = canvas.getContext("2d")!;
    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    const game = new Game(ctx, WIDTH, HEIGHT);
    requestAnimationFrame(() => {
      game.draw();
    });
    button.style.display = "hidden";
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
