import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Error404 from "./pages/Error404";
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";
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
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "/posts/:id",
          element: <PostDetails />,
        },
        {
          path: "*",
          element: <Error404 />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
