/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

import "./index.css";
import App from "./App";

import GamePin from "./routes/GamePin";
import Home from "./routes/Home";
import Register from "./routes/Register";
import Logout from "./routes/Logout";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

render(
  () => (
    <Router root={App}>
      <Route path="/" component={Home} />
      <Route path="/gamepin" component={GamePin} />
      <Route path="/register" component={Register} />
      <Route path="/logout" component={Logout} />
      // <Route path="/login" component={Home} />
    </Router>
  ),
  root!,
);
