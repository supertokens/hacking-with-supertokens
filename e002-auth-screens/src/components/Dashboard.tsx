import { customElement, noShadowDOM } from "solid-element";
import Shell from "./Shell";
import Session from "supertokens-web-js/recipe/session";
import { superTokensInit } from "../config/supertokens";
import { Show, createEffect, createSignal } from "solid-js";

function Dashboard() {
  superTokensInit();

  const [loading, setLoading] = createSignal(true);

  const getSessionInfo = async () => {
    const response = await fetch("http://localhost:3001/sessioninfo", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    alert(JSON.stringify(data));
  };

  async function signOut() {
    await Session.signOut();
    window.location.href = "/";
  }

  createEffect(async () => {
    if (await Session.doesSessionExist()) {
      setLoading(false);
    } else {
      window.location.href = "/";
    }
  });

  return (
    <Shell>
      <div>
        <h2 style={{ "text-align": "center" }}>Dashboard</h2>
        <div class="form-wrap" part="st-dashboard">
          <Show when={loading()}>Loading...</Show>
          <Show when={!loading()}>
            <button onClick={getSessionInfo}>Session Info</button>
            <button onClick={signOut}>Sign Out</button>
          </Show>
        </div>
      </div>
    </Shell>
  );
}

customElement("c-dashboard", {}, () => {
  noShadowDOM();

  return <Dashboard />;
});
