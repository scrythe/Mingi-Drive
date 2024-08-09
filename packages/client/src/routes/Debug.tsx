import { type Component } from "solid-js";

import { useMyContext } from "../context";
import InputHandler from "../game/orientation";

const App: Component = () => {
  let pRef: HTMLParagraphElement;
  let buttonRef: HTMLButtonElement;
  const start = () => {
    // document.querySelector("html")!.requestFullscreen();
    // interface ExtendedScreenOrientation extends ScreenOrientation {
    //   lock(orientation: string): Promise<void>;
    // }
    // (screen.orientation as ExtendedScreenOrientation).lock("landscape");
    const orientation = new InputHandler();
    const updateData = () => {
      pRef.innerHTML = orientation.eulerAngles.toString();
      requestAnimationFrame(updateData);
    };
    requestAnimationFrame(updateData);
    buttonRef.style.display = "none";
  };
  const { setShowLogin } = useMyContext()!;
  setShowLogin(false);
  return (
    <main>
      <p ref={pRef}></p>
      <button ref={buttonRef!} onClick={start}>
        asdf
      </button>
    </main>
  );
};

export default App;
