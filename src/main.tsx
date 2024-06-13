import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import App from "./App";
import "./styles/reset.css";
import "./styles/main.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <FirstPage />,
      },
      {
        path: "/exchangerates",
        element: <SecondPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
