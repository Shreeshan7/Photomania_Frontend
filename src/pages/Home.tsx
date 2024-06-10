import { useQuery } from "@tanstack/react-query";

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
      <h1 className="text-xl font-bold p-4 text-center">This is explore page / home page</h1>
      <div className="grid grid-cols-4 gap-1">
        {data.map((posts) => (
          <div key={posts.id}>
            <div className="flex justify-center">
              <img
                src={`http://localhost:8000/${posts.imageUrl.replace("public\\uploads\\", "uploads/")}`}
                alt="image"
              />
            </div>
            <p>{posts.imageUrl}</p>

            <p className="text-center ">{posts.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
