import { useState } from "react";
import { Link } from "react-router-dom";

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
    <div className="flex p-5 bg-black justify-between">
      <div className="flex gap-4">
        <Link to={"/"} className="p-2 rounded-lg hover:bg-slate-700 px-3 text-white">
          Explore
        </Link>
        {token && (
          <div>
            <Link to={"/profile"} className="p-2 rounded-lg hover:bg-slate-700 px-3 text-white">
              Profile
            </Link>
            <button
              onClick={openCreatePostModal}
              className="p-2 rounded-lg bg-slate-950 hover:bg-slate-700 px-3 text-white"
            >
              Add
            </button>
          </div>
        )}
      </div>
      <div className="flex gap-4">
        {token ? (
          <div>
            <button onClick={logout} className="p-2 rounded-lg bg-slate-950 hover:bg-slate-700 px-3 text-white">
              Logout
            </button>
          </div>
        ) : (
          <>
            <button onClick={openSignUpModal} className="p-2 rounded-lg hover:bg-slate-700 px-3 text-white">
              Sign Up
            </button>
            <button onClick={openLoginModal} className="p-2 rounded-lg bg-slate-950 hover:bg-slate-700 px-3 text-white">
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
