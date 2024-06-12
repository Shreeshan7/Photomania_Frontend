import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { ImCross } from "react-icons/im";
import * as z from "zod";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  const SignUpSchema = z.object({
    username: z.string().min(1, "Username is required").min(5, "Username must be at least 5 characters long").max(15),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters long").max(15),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(SignUpSchema) });

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const res = await fetch("http://localhost:8000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },

    onSuccess: () => {
      onClose();
      reset();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed flex top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75  justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-11/12 max-w-lg relative">
        <h2 className="text-xl mb-4 text-center">Sign Up</h2>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-200  absolute right-5 top-5">
          <ImCross />
        </button>
        <div className="p-2 mt-10 flex justify-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 ">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-96 p-2.5"
                type="text"
                {...register("username")}
                placeholder="Username"
              />
              {errors.username && <p>{errors.username.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-96 block p-2.5"
                type="email"
                {...register("email")}
                placeholder="Email"
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-96 p-2.5"
                type="password"
                {...register("password")}
                placeholder="Password"
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div className="flex items-center justify-between">
              <button className="text-white bg-slate-800 hover:bg-slate-900 p-2 rounded-lg w-96 mt-5" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
