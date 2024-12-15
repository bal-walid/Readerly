import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import ExploreResults from "./components/ExploreResults.jsx";
import Shelf from "./components/Shelf.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/" },
      { path: "/explore", element: <ExploreResults /> },
      { path: "/shelf", element: <Shelf /> },
      { path: "/home" },
      { path: "/wishlist" },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>
);
