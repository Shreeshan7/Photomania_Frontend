import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="p-5">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
