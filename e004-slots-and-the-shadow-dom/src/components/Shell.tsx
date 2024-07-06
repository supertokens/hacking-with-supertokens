import { JSXElement } from "solid-js";
import "./Shell.css";

interface Props {
  header?: JSXElement;
  children?: JSXElement;
  footer?: JSXElement;
}

export function Shell(props: Props) {
  return (
    <div class="wrapper">
      <header>Hacking with SuperTokens</header>
      <main>{props.children}</main>
      <footer>Copyright or something, IDK.</footer>
    </div>
  );
}

export default Shell;
