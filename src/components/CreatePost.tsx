import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { useAuth } from "../context/AuthContext";
import { queryClient } from "../main";
import Modal from "./Modal";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose }) => {
  const { token } = useAuth();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const CreatePostSchema = z.object({
    caption: z.string().min(1, "Caption is required").max(50, "Caption must be max of 50 letters"),
    image: z.instanceof(FileList).refine((files) => files?.length > 0, "Please select an image"),
  });

  type FomrData = z.infer<typeof CreatePostSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(CreatePostSchema),
  });

  const { mutate } = useMutation({
    mutationFn: async (data: FomrData) => {
      const formData = new FormData();
      formData.append("caption", data.caption);
      formData.append("image", data.image[0]);
      const response = await fetch("http://localhost:8000/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error);
      }
      return result;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usersPosts"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onClose();
      reset();
      setImagePreview(null);
      toast.success("Post created successfully!");
    },
    onError: (error) => {
      toast.error("Failed to create post. Please try again.");
      console.error("Post creation failed:", error);
      reset();
    },
  });

  const onSubmit = (data: FomrData) => {
    mutate(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setValue("image", e.target.files);
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Post">
      <div className="w-[100vh]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-100 rounded-lg shadow-md"
        >
          <div className="p-4 bg-white rounded-lg shadow">
            {imagePreview ? (
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Image Preview</label>
                <img className="rounded-lg object-contain" src={imagePreview} alt="Image Preview" />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <span>No image selected</span>
              </div>
            )}
          </div>
          <div className=" space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <label className="block mb-2   text-gray-900">Caption</label>
              <textarea
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                {...register("caption")}
                placeholder="Caption"
              />
              {errors.caption && <p className="text-red-700 p-2">{`${errors.caption.message}`}</p>}
            </div>
            <div className="p-4 bg-white rounded-lg">
              <label className="block mb-2  text-gray-900">Choose Image</label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                onChange={handleChange}
              />
              {errors.image && <p className="text-red-700 p-2">{`${errors.image.message}`}</p>}
            </div>
            <div className="flex items-center justify-between">
              <button className="text-white bg-slate-800 hover:bg-slate-900 p-2 rounded-lg w-full" type="submit">
                Create Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreatePostModal;
