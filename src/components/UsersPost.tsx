import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import load from "../assets/load.gif";
import { useAuth } from "../context/AuthContext";

interface JwtPayload {
  id: string;
}

type UserPost = {
  id: number;
  caption: string;
  imageUrl: string;
};

const UsersPost = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  let userId: string;
  if (token) {
    const decoded = jwtDecode<JwtPayload>(token);
    userId = decoded.id;
    console.log("okok:", userId);
  } else {
    console.log("Token is incorrect");
  }

  const fetchPost = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["usersPosts"],
    queryFn: fetchPost,
  });

  if (isLoading) return <img className="ml-96 w-96" src={load} alt="Loading" />;

  if (isError) return <div>Error Loading data brrrrrrr</div>;

  return (
    <div>
      <h1 className="text-3xl p-4 text-center">Your Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {data.map((post: UserPost) => (
          <div key={post.id}>
            <div className="flex justify-center">
              <img
                src={`http://localhost:8000/${post.imageUrl.replace("public\\uploads\\", "uploads/")}`}
                alt="Post Image"
                className="h-[300px] w-full rounded-md cursor-pointer"
                onClick={() => navigate(`/posts/${post.id}`)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPost;
