import type { Component, JSX } from "solid-js";

import styles from "./AnchorButton.module.css";
import { A } from "@solidjs/router";

const ABtn: Component<{ children: JSX.Element; class?: string }> = (props) => {
  const { children, class: className = "" } = props;
  return (
    <A class={`${styles.ABtn} ${className}`} href="/gamepin">
      {children}
    </A>
  );
};

export default ABtn;
