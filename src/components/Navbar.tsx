import { useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import { HiOutlineLogout } from "react-icons/hi";
import { Link } from "react-router-dom";

import logo from "../assets/Group 1.png";
import { useAuth } from "../context/AuthContext";
import CreatePost from "./CreatePost";
import LoginModal from "./LogInModal";
import SignUpModal from "./SignUpModal";

const Navbar = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const { token, logout } = useAuth();

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };

  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openCreatePostModal = () => {
    setIsCreatePostModalOpen(true);
  };

  const closeCreatePostModal = () => {
    setIsCreatePostModalOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between p-5 shadow-lg mb-2 bg-slate-200">
      <div className="flex items-center mb-4 md:mb-0">
        <img src={logo} alt="Logo" className=" h-7 ml-3 w-auto" />
      </div>
      <div className="flex flex-col md:flex-row gap-4 px-4 mb-4 md:mb-0">
        <Link to={"/"} className="p-1 rounded-lg px-3 border-2 text-lg">
          Explore
        </Link>
        {token && (
          <div className="flex flex-col md:flex-row gap-4">
            <Link to={"/profile"} className="p-1 rounded-lg px-3 border-2 text-lg">
              Profile
            </Link>
            <button onClick={openCreatePostModal} className="p-1 rounded-lg px-3 border-2 text-lg">
              <div className="flex items-center">
                Add
                <GrAddCircle className="ml-2 text-xl" />
              </div>
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-4 px-4">
        {token ? (
          <button onClick={logout} className="p-1 rounded-lg px-3 border-2 text-lg">
            <div className="flex items-center">
              <HiOutlineLogout className=" mr-1 text-xl" />
              Logout
            </div>
          </button>
        ) : (
          <>
            <button onClick={openSignUpModal} className="p-1 rounded-lg px-3 border-2 text-md">
              Sign Up
            </button>
            <button
              onClick={openLoginModal}
              className="rounded-md bg-gradient-to-br from-green-600 to-emerald-400 px-4 py-2 font-dm text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200"
            >
              Log In
            </button>
          </>
        )}
      </div>

      <SignUpModal isOpen={isSignUpModalOpen} onClose={closeSignUpModal} />
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <CreatePost isOpen={isCreatePostModalOpen} onClose={closeCreatePostModal} />
    </div>
  );
};

export default Navbar;
