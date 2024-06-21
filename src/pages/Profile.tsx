import { useMutation, useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import React, { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { SlOptionsVertical } from "react-icons/sl";
import { toast } from "sonner";

import Loading from "../components/Loading";
import UsersPost from "../components/UsersPost";
import { useAuth } from "../context/AuthContext";
import { queryClient } from "../main";

interface JwtPayload {
  id: string;
}

export const Profile = () => {
  const { token } = useAuth();
  const [option, setOption] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const editorRef = useRef<AvatarEditor>(null);

  let userId: string;
  if (token) {
    const decoded = jwtDecode<JwtPayload>(token);
    userId = decoded.id;
  } else {
    console.log("Token is incorrect");
  }

  const fetchPost = async () => {
    const res = await fetch("http://localhost:8000/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchPost,
  });

  const { mutate } = useMutation({
    mutationFn: async (file: File) => {
      console.log(file);
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/profilePicture`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload image");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setOption(false);
      toast.success("Profile Picture has been updated");
      setImageSrc(null);
    },
  });

  const handleOption = () => {
    setOption(!option);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
    }
  };

  const handleCrop = async () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas().toDataURL("image/jpeg");
      const res = await fetch(canvas);
      const blob = await res.blob();
      const file = new File([blob], "profile-picture.jpg", { type: "image/jpeg" });
      mutate(file);
    }
  };

  const handleClose = () => {
    setImageSrc(null);
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading data</div>;
  if (!data) return <div>No profile data available</div>;
  return (
    <div>
      <h1 className="text-xl p-4 text-center">You are looking dashing {data.username}</h1>
      <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-5 bg-white shadow-xl rounded-lg text-gray-900 relative mb-7">
        <div className="rounded-t-lg h-32 overflow-hidden relative">
          <img
            className="object-cover object-top w-full"
            src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
            alt="Mountain"
          />
          <div className="absolute top-2 right-2 p-2 flex items-center">
            <SlOptionsVertical className="text-white text-l cursor-pointer" onClick={handleOption} />
          </div>
        </div>
        {option && (
          <div className="absolute border-2 -top-3 -right-36 mr-4 mt-4 bg-white shadow-md rounded-md p-1">
            <input
              className="hidden"
              type="file"
              id="image"
              accept="image/jpg, image/jpeg, image/png"
              onChange={handleFileChange}
            />
            <label htmlFor="image" className="text-black rounded-md cursor-pointer">
              Upload Picture
            </label>
          </div>
        )}
        <div className="mx-auto w-32 h-32 relative -mt-16  border-4 border-white rounded-full overflow-hidden">
          <img
            className="object-cover object-center h-32"
            src={`http://localhost:8000/${data.imageUrl.replace("public\\uploads\\", "uploads/")}`}
            alt=""
          />
        </div>
        <div className="text-center mt-2 pb-8 pt-4">
          <h2 className="font-semibold text-lg">{data.username}</h2>
          <p className="text-black pt-2">{data.email}</p>
        </div>
      </div>
      {imageSrc && (
        <div className=" fixed flex top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 justify-center items-center ">
          <div className="relative">
            <AvatarEditor
              ref={editorRef}
              image={imageSrc}
              width={250}
              height={250}
              borderRadius={150}
              scale={zoom}
              rotate={0}
            />
            <input
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="zoom-slider"
            />
            <div className="flex justify-between mt-4">
              <button onClick={handleCrop} className="text-black rounded-md cursor-pointer bg-white p-1">
                Crop and Upload
              </button>
              <button onClick={handleClose} className="text-black rounded-md cursor-pointer bg-white p-1">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <UsersPost />
    </div>
  );
};
