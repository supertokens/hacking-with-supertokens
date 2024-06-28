import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import webComponents from "./components/solid-web-components.es";

const Dashboard = () => {
  const navigate = useNavigate();
  webComponents.registerDashboard(navigate);
  return <c-dashboard />;
};

const EmailPassword = () => {
  const navigate = useNavigate();
  webComponents.registerEmailPassword(navigate);
  return <c-email-password />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <EmailPassword />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

const App = () => {
  console.log("app");

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
