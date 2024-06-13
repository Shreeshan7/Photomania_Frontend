import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import LoginModal from "./LogInModal";
import SignUpModal from "./SignUpModal";

const Navbar = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
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

  return (
    <div className="flex p-5 bg-black justify-between">
      <div className="flex gap-4">
        <Link to={"/"} className="p-2 rounded-lg hover:bg-slate-700 px-3 text-white">
          Explore
        </Link>
        {token && (
          <Link to={"/profile"} className="p-2 rounded-lg hover:bg-slate-700 px-3 text-white">
            Profile
          </Link>
        )}
      </div>
      <div className="flex gap-4">
        {token ? (
          <button onClick={logout} className="p-2 rounded-lg bg-slate-950 hover:bg-slate-700 px-3 text-white">
            Logout
          </button>
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
    </div>
  );
};

export default Navbar;
