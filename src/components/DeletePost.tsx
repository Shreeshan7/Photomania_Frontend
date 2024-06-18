import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useAuth } from "../context/AuthContext";
import Modal from "./Modal";

interface DeletePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
}

const DeletePost: React.FC<DeletePostModalProps> = ({ isOpen, onClose, postId }) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`http://localhost:8000/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      console.log(response);
      if (!response.ok) {
        throw new Error(result.error);
      }
      return result;
    },

    onSuccess: (data) => {
      console.log(data);
      toast.success("Successfully Deleted!");
      onClose();
      navigate("/");
    },
    onError: (error) => {
      console.error(error);
      toast.error(" failed!");
    },
  });

  const handleDelete = () => {
    mutate();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Post">
      <div className=" -mt-5">
        <p>Are you sure you want to delete this post?</p>
        <div className="flex justify-end mt-10">
          <button onClick={onClose} className="text-gray-600 px-4 py-2 mr-2 hover:text-blue-800">
            Cancel
          </button>
          <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeletePost;
