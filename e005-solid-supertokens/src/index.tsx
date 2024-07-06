/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

import "./index.css";
import Auth from "./Auth";
import Dashboard from "./Dashboard";

const root = document.getElementById("root");

render(
  () => (
    <Router>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/" component={Auth} />
    </Router>
  ),
  root!
);
