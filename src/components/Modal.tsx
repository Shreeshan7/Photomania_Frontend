import React from "react";
import { ImCross } from "react-icons/im";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed flex top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-11/12 max-w-lg relative">
        {title && <h2 className="text-xl mb-4 text-center">{title}</h2>}
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-200 absolute right-5 top-5">
          <ImCross />
        </button>
        <div className="p-2 mt-10 flex justify-center">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
