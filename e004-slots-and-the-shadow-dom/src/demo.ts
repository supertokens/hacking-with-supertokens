import { registerDashboard } from "./components/Dashboard";
import { registerEmailPassword } from "./components/EmailPassword";

registerEmailPassword((path) => {
  window.location.href = path;
});

registerDashboard((path) => {
  window.location.href = path;
});
