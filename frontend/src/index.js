import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/tailwind.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={routes} />);
