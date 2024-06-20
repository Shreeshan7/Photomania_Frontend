import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import load from "../assets/load.gif";

interface Post {
  id: number;
  imageUrl: string;
  caption: string;
  createdAt: Date;
}

const Home = () => {
  const navigate = useNavigate();

  const fetchData = async ({ pageParam = 1 }) => {
    const res = await fetch(`http://localhost:8000/posts?page=${pageParam}&limit=8`);
    const data = await res.json();
    console.log("this is home ok", data);
    return data;
  };

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchData,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.posts.length > 0 ? nextPage : undefined;
    },
    initialPageParam: 1,
  });

  if (isLoading) return <img src={load} alt="Loading" />;

  if (isError) return <div>Error loading posts.</div>;

  return (
    <div>
      <h1 className=" text-3xl p-4 text-center">Explore</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
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
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="rounded-md bg-gradient-to-br from-green-600 p-2 mt-2 to-emerald-400 px-4 font-dm text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200"
        >
          {isFetchingNextPage ? "Loading more..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default Home;
