import type { Component } from "solid-js";

import { useNavigate } from "@solidjs/router";
import { client } from "../components/Hono";
import { useMyContext } from "../context";

const App: Component = () => {
  client.logout.$post({}, { init: { credentials: "include" } });
  const { setSession } = useMyContext()!;
  setSession(false);
  const navigate = useNavigate();
  navigate("/");
  return <></>;
};

export default App;
