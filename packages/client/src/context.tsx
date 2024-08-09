import { Context } from "hono";
import {
  Component,
  createContext,
  createSignal,
  JSX,
  useContext,
} from "solid-js";

const [session, setSession] = createSignal(false);

const MyContext = createContext<{
  session: typeof session;
  setSession: typeof setSession;
}>();

export const Provider: Component<{ children: JSX.Element }> = (props) => {
  return (
    <MyContext.Provider value={{ session, setSession }}>
      {props.children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
