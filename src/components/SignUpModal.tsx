import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import Modal from "./Modal";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
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
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const { mutate, error } = useMutation({
    mutationFn: async (data) => {
      const response = await fetch("http://localhost:8000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
      onClose();
      reset();
      toast.success("Successfully registered!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Registration failed!");
      reset();
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sign Up">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          {error && <p className=" text-center text-red-700 p-2">{error.message}</p>}

          <label className="block mb-2 text-sm font-medium text-gray-900">Username</label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-96 p-2.5"
            type="text"
            {...register("username")}
            placeholder="Username"
          />
          {errors.username && <p className="text-red-700 p-2">{`${errors.username.message}`}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-96 block p-2.5"
            type="email"
            {...register("email")}
            placeholder="Email"
          />
          {errors.email && <p className="text-red-700 p-2">{`${errors.email.message}`}</p>}
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-96 p-2.5"
            type="password"
            {...register("password")}
            placeholder="Password"
          />
          {errors.password && <p className="text-red-700 p-2">{`${errors.password.message}`}</p>}
        </div>

        <div className="flex items-center justify-between">
          <button className="text-white bg-slate-800 hover:bg-slate-900 p-2 rounded-lg w-96 mt-5" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SignUpModal;
