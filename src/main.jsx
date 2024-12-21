import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import ExploreResults from "./components/ExploreResults.jsx";
import NoteEditor from "./components/NoteEditor.jsx";
import NoteView from "./components/NoteView.jsx";
import Shelf from "./components/Shelf.jsx";
import ShelfModal from "./components/ShelfModal.jsx";
import WishList from "./components/WishList.jsx";
import WishListModal from "./components/WishListModal.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/" },
      { path: "/explore", element: <ExploreResults /> },
      {
        path: "/shelf",
        element: <Shelf />,
        children: [
          {
            path: ":id",
            element: <ShelfModal />,
          },
          {
            path: ":id/notes/add",
            element: <NoteEditor />,
          },
          {
            path: ":id/notes/edit/:noteId",
            element: <NoteEditor />,
          },
          {
            path: ":id/notes/:noteId",
            element: <NoteView />,
          },
        ],
      },
      { path: "/home" },
      {
        path: "/wishlist",
        element: <WishList />,
        children: [{ path: ":id", element: <WishListModal /> }],
      },
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

export default router;
