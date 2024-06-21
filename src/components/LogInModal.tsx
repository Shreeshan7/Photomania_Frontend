import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";

import { useAuth } from "../context/AuthContext";
import Modal from "./Modal";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const LoginSchema = z.object({
    email: z.string().email("Email is required").min(1, "Invalid email"),
    password: z.string().min(1, "Password is required").min(6),
  });

  type FomrData = z.infer<typeof LoginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FomrData>({
    resolver: zodResolver(LoginSchema),
  });

  const { mutate } = useMutation({
    mutationFn: async (data: FomrData) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/login `, {
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
      toast.success("Successfully logged in!");
      setToken(data.token);
      localStorage.setItem("token", data.token);
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Login failed. Please check your credentials.");
      console.error("Authentication failed:", error);
      setToken(null);
      localStorage.removeItem("token");
      reset();
    },
  });

  const onSubmit = (data: FomrData) => {
    mutate(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-96 p-2.5"
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
            Login
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default LoginModal;
