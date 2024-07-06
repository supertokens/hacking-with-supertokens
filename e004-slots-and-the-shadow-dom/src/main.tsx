import { registerDashboard } from "./components/Dashboard";
import { registerEmailPassword } from "./components/EmailPassword";

export default {
  registerEmailPassword,
  registerDashboard,
};

window.ST = {};

window.ST.registerEmailPassword = registerEmailPassword;
window.ST.registerDashboard = registerDashboard;
