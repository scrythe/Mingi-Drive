import {
  Component,
  createContext,
  createSignal,
  JSX,
  useContext,
} from "solid-js";

const [session, setSession] = createSignal(false);
const [showLogin, setShowLogin] = createSignal(true);

const MyContext = createContext<{
  session: typeof session;
  setSession: typeof setSession;
  showLogin: typeof showLogin;
  setShowLogin: typeof setShowLogin;
}>();

export const Provider: Component<{ children: JSX.Element }> = (props) => {
  return (
    <MyContext.Provider value={{ session, setSession, showLogin, setShowLogin }}>
      {props.children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
