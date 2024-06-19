import { useQuery } from "@tanstack/react-query";

import { useAuth } from "../context/AuthContext";

export const Profile = () => {
  const { token } = useAuth();
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

  console.log("this is data:", data);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  return (
    <div>
      <p>{data.username}</p>
    </div>
  );
};
