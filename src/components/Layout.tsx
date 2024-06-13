import { Outlet } from "react-router-dom";

import { AuthProvider } from "../context/AuthContext";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <div className="px-5 pb-2">
          <Outlet />
        </div>
        <Footer />
      </AuthProvider>
    </>
  );
};

export default Layout;
