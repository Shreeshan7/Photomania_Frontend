import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="px-5 pb-2">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
