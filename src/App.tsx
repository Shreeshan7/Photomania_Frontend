import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";
import Error404 from "./pages/Error404";
import Home from "./pages/Home";
import { Profile } from "./pages/Profile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },

        {
          path: "*",
          element: <Error404 />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
