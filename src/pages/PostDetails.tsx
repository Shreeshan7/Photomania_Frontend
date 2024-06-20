import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { useParams } from "react-router-dom";

import DeletePost from "../components/DeletePost";
import UpdatePost from "../components/UpdatePost";
import { useAuth } from "../context/AuthContext";

interface JwtPayload {
  id: string;
}

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [option, setOption] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModal] = useState(false);
  const { token } = useAuth();

  let userId;
  if (token) {
    const decoded = jwtDecode<JwtPayload>(token);
    userId = decoded.id;
  } else {
    console.log("Token is incorrect");
  }

  const fetchPost = async () => {
    const res = await fetch(`http://localhost:8000/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  };

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: fetchPost,
  });

  const handleOption = () => {
    setOption(!option);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openUpdateModal = () => {
    setIsUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModal(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading post.</div>;

  const isPostOwner = post.user.id === userId;

  return (
    <div className="flex justify-center">
      <div className="flex flex-col space-y-4 p-2 border-2 bg-white shadow-lg rounded w-1/2 m-4 relative">
        {isPostOwner && (
          <div className="flex justify-end cursor-pointer">
            <FaEdit onClick={handleOption} />
            {option && (
              <div className="flex flex-col absolute top-3 -right-24">
                <div className="rounded-md broder-2 bg-slate-200 shadow-lg">
                  <button className="px-4 py-1" onClick={openUpdateModal}>
                    Update
                  </button>
                </div>
                <div className="rounded-md text-white border-2 bg-red-500 shadow-lg mt-1">
                  <button onClick={openDeleteModal} className="px-4 py-1">
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        <div>
          <img
            src={`http://localhost:8000/${post.imageUrl.replace("public\\uploads\\", "uploads/")}`}
            alt="Post Image"
            className="w-full h-auto object-cover rounded"
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <RxAvatar className="w-8 h-8" />
          </div>
          <div className="flex justify-between w-full">
            <span className="text-gray-900 font-sans text-lg">{post.user.username}</span>
            <span className="text-gray-900 text-sm">{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-900">{post.caption}</span>
        </div>
      </div>
      <DeletePost isOpen={isDeleteModalOpen} onClose={closeDeleteModal} postId={id} />
      <UpdatePost isOpen={isUpdateModalOpen} onClose={closeUpdateModal} postId={id} post={post} />
    </div>
  );
};

export default PostDetails;
