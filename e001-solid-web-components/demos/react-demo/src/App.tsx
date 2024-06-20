import { useState } from "react";
import "./components/solid-web-components.es";

function App() {
  const [message, setMessage] = useState("Hello from React");

  return <c-hello message={message}></c-hello>;
}

export default App;
