import LoadingImage from "../assets/load.gif";

const Loading = () => {
  return (
    <div className="grid place-items-center w-full h-full">
      <img src={LoadingImage} alt="Loading gif" />;
    </div>
  );
};

export default Loading;
