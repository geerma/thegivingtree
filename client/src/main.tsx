import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChristmasgiftsPage from "./Pages/ChristmasgiftsPage/ChristmasgiftPage";
import ChristmaseventsPage from "./Pages/ChristmaseventsPage/ChristmaseventsPage";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ChristmasgiftsPage />,
  },
  {
    path: "/cevents",
    element: <ChristmaseventsPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
