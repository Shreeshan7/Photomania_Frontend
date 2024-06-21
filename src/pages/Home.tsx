import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import Loading from "../components/Loading";

interface Post {
  id: number;
  imageUrl: string;
  caption: string;
  createdAt: Date;
  user: {
    username: string;
    imageUrl: string;
  };
}

const Home = () => {
  const navigate = useNavigate();

  const fetchData = async ({ pageParam = 1 }) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/posts?page=${pageParam}&limit=8`);
    const data = await res.json();
    console.log("this is home ok", data);
    return data;
  };

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchData,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.lastPage) {
        return lastPage.page + 1;
      }
    },
    initialPageParam: 1,
  });

  if (isLoading) return <Loading />;

  if (isError) return <div>Error loading posts.</div>;

  return (
    <div>
      <h1 className=" text-3xl p-3 text-center">Explore</h1>
      <p className="text-center mb-4">Capture, Share, Cherish: Your Moments, Our Platform</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-2">
        {data?.pages.map((page) =>
          page.posts.map((post: Post) => (
            <div key={post.id}>
              <div className="flex justify-center">
                <img
                  src={`http://localhost:8000/${post.imageUrl.replace("public\\uploads\\", "uploads/")}`}
                  alt="Post Image"
                  className="h-[280px] w-full rounded-sm cursor-pointer"
                  onClick={() => navigate(`/posts/${post.id}`)}
                />
              </div>
              <div className="border-2 rounded-sm p-2  shadow-md">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <img
                      src={`http://localhost:8000/${post.user.imageUrl.replace("public\\uploads\\", "uploads/")}`}
                      alt="profilePic"
                      className="rounded-full h-10 w-10"
                    />
                  </div>
                  <div className="flex justify-between w-full">
                    <span className="text-gray-900 text-l font-medium">{post.user.username}</span>
                    <span className="text-gray-900  text-sm">{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex flex-col pt-4 pl-2 w-full">
                  <span className="text-gray-900 overflow-hidden overflow-ellipsis whitespace-nowrap w-full block">
                    {post.caption}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {hasNextPage && (
        <div className="flex justify-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="rounded-md bg-gradient-to-br mt-2 bg-slate-800 hover:bg-slate-900 px-4 py-2 font-dm text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200"
          >
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
