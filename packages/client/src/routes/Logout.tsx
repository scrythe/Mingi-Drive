import type { Component } from "solid-js";

// import ABtn from "../components/AnchorButton";
import styles from "./Home.module.css";
import { useNavigate } from "@solidjs/router";
import { client } from "../components/Hono";

const App: Component = () => {
  client.logout.$post({}, { init: { credentials: "include" } });
  const navigate = useNavigate();
  navigate("/");
  return <></>;
};

export default App;
