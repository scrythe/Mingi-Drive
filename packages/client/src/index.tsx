/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

import "./index.css";
import App from "./App";

import GamePin from "./routes/GamePin";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

render(
  () => (
    <App>
      <Router>
        <Route path="/" component={GamePin} />
        <Route path="/gamepin" component={GamePin} />
      </Router>
    </App>
  ),
  root!,
);
