import { useInfiniteQuery } from "@tanstack/react-query";
import { RxAvatar } from "react-icons/rx";

interface Post {
  id: number;
  imageUrl: string;
  caption: string;
}

const Home = () => {
  const fetchData = async ({ pageParam = 1 }) => {
    const res = await fetch(`http://localhost:8000/posts?page=${pageParam}&limit=8`);
    const data = await res.json();
    console.log(data);
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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading posts.</div>;

  return (
    <div>
      <h1 className="text-xl p-4 text-center">Explore</h1>
      <div className="grid grid-cols-4 gap-2">
        {data?.pages.map((page) =>
          page.posts.map((post: Post) => (
            <div key={post.id}>
              <div className="flex justify-center">
                <img
                  src={`http://localhost:8000/${post.imageUrl.replace("public\\uploads\\", "uploads/")}`}
                  alt="Post Image"
                  className="h-[300px] w-full rounded-lg"
                />
              </div>
              <div className="flex border-2 gap-10 rounded-lg mt-2 p-2 pb-4">
                <div className="text-4xl pl-4 pt-2">
                  <RxAvatar />
                </div>
                {post.caption}
              </div>
            </div>
          ))
        )}
      </div>
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="text-white bg-slate-800 hover:bg-slate-900 p-2 rounded-lg mt-5"
        >
          {isFetchingNextPage ? "Loading more..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default Home;
