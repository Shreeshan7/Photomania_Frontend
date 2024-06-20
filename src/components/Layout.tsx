import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

import { AuthProvider } from "../context/AuthContext";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <AuthProvider>
        <Toaster position="top-center" />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow px-5 pb-2">
            <Outlet />
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </>
  );
};

export default Layout;
