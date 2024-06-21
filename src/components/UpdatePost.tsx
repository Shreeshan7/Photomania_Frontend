import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";

import { useAuth } from "../context/AuthContext";
import { queryClient } from "../main";
import Modal from "./Modal";

interface UpdatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
  post: {
    caption: string;
    imageUrl: string;
  };
}

const UpdatePost: React.FC<UpdatePostModalProps> = ({ isOpen, onClose, postId, post }) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const UpdatePostSchema = z.object({
    caption: z.string().min(1, "Caption is required").max(50, "Caption must be max of 50 letters"),
  });

  type FormData = z.infer<typeof UpdatePostSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(UpdatePostSchema),
    defaultValues: {
      caption: post.caption,
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ caption: data.caption }),
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      return response.json();
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["usersPosts"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onClose();
      reset();
      toast.success("Post updated successfully!");
      navigate(`/posts/${postId}`);
    },
    onError: (error) => {
      toast.error("Failed to update caption. Please try again.");
      console.error("Post update failed:", error);
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Post">
      <div className="max-w-[90vw] md:max-w-[70vw] lg:max-w-[50vw] mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-100 rounded-lg shadow-md"
        >
          <div className="p-4 bg-white rounded-lg shadow">
            <img
              className="rounded-lg object-contain w-full h-full"
              src={`http://localhost:8000/${post.imageUrl.replace("public\\uploads\\", "uploads/")}`}
              alt="Post"
            />
          </div>
          <div className=" space-y-8">
            <div className="p-4 bg-white rounded-lg">
              <label className="block mb-2 text-gray-900 h-10">Caption</label>
              <textarea
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 h-24"
                {...register("caption")}
                placeholder="Caption"
              />
              {errors.caption && <p className="text-red-700 p-2">{`${errors.caption.message}`}</p>}
            </div>
            <div className="flex items-center justify-between">
              <button className="text-white bg-slate-800 hover:bg-slate-900 p-2 rounded-lg w-full" type="submit">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UpdatePost;
