import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import { Profile } from "./pages/Profile";
import Error404 from "./pages/Error404";
import Home from "./pages/Home";

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
