import "./loader.css";

const Loader = () => {
  return (
    <div className="z-10 flex h-[100%] min-h-[100px] w-[100%]  items-center justify-center bg-[black] bg-opacity-90">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
