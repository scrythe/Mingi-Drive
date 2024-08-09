import type { Component, JSX } from "solid-js";

import styles from "./Form.module.css";

const Form: Component<{
  ref: HTMLFormElement;
  children: JSX.Element;
  onSubmit?: JSX.EventHandler<HTMLFormElement, Event>;
}> = (props) => {
  return (
    <>
      <h1 class={styles.header}>Mingidrift</h1>
      <form ref={props.ref} class={styles.form} onSubmit={props.onSubmit}>
        {props.children}
      </form>
    </>
  );
};

export default Form;
