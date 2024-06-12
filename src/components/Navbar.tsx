import { useState } from "react";
import { Link } from "react-router-dom";

import SignUpModal from "./SignUpModal";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex p-5 bg-black justify-between">
      <div className="flex gap-4">
        <Link to={"/"} className=" p-2 rounded-lg hover:bg-slate-700 px-3 text-white">
          Explore
        </Link>

        <Link to={"/profile"} className=" p-2 rounded-lg hover:bg-slate-700 px-3 text-white">
          Profile
        </Link>
      </div>
      <div className="flex gap-4">
        <button onClick={openModal} className="p-2 rounded-lg hover:bg-slate-700 px-3 text-white">
          Sign Up
        </button>
        <button className="p-2 rounded-lg bg-slate-950 hover:bg-slate-700 px-3 text-white">Log In</button>
      </div>
      <SignUpModal isOpen={isModalOpen} onClose={closeModal} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default Navbar;
