import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import webComponents from "./components/solid-web-components.es";

const Dashboard = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  webComponents.registerDashboard(navigate);
  return (
    <c-dashboard>
      <h1 slot="header">Dashboard</h1>
      <p slot="default">
        Current count: {count}
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          Change count!
        </button>
      </p>
    </c-dashboard>
  );
};

const EmailPassword = () => {
  const navigate = useNavigate();
  webComponents.registerEmailPassword(navigate);
  return (
    <c-email-password>
      <h3 slot="header">Please type in your email and password to continue</h3>
    </c-email-password>
  );
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
