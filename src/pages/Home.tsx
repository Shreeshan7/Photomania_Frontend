import { useQuery } from "@tanstack/react-query";
import { RxAvatar } from "react-icons/rx";

const Home = () => {
  const fetchData = async () => {
    const res = await fetch(`http://localhost:8000/posts`);
    const data = await res.json();
    console.log(data);
    return data;
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchData,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <h1 className="text-xl p-4 text-center">Explore</h1>
      <div className="grid grid-cols-4 gap-2">
        {data.map((posts) => (
          <div key={posts.id}>
            <div className="flex justify-center">
              <img
                src={`http://localhost:8000/${posts.imageUrl.replace("public\\uploads\\", "uploads/")}`}
                alt="image"
                className="h-[300px] w-full  rounded-lg"
              />
            </div>

            <div className=" flex border-2 gap-10 rounded-lg mt-2 p-2 pb-4">
              <div className=" text-4xl pl-4 pt-2">
                <RxAvatar />
              </div>
              {posts.caption}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
