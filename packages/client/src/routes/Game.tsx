import type { Component } from "solid-js";

import { useMyContext } from "../context";

const App: Component = () => {
  const { setShowLogin } = useMyContext()!;
  setShowLogin(false)
  return <main></main>;
};

export default App;
