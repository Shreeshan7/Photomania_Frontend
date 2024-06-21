import { FaFacebook, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row p-6 bg-slate-200 justify-between items-center">
      <div className="flex items-center mb-2 md:mb-0 flex-1">
        <a href="https://facebook.com" className="text-blue-600 cursor-pointer">
          <FaFacebook size={24} />
        </a>
        <a href="https://twitter.com" className="text-blue-400 ml-4 cursor-pointer">
          <FaTwitter size={24} />
        </a>
      </div>

      <div className="text-center flex-2 flex justify-center">&copy; 2024 Diagonal Technology</div>

      <div className="ml-auto mt-2 md:mt-0 flex-1 flex justify-end">
        <Link to={"/"} className="p-1 rounded-lg px-3 border-2 text-lg">
          Explore
        </Link>
      </div>
    </div>
  );
};

export default Footer;
