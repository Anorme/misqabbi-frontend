const FullScreenLoader = ({ message }) => {
  return (
    <div className="h-screen flex items-center justify-center bg-msq-purple font-lato">
      <p className="text-white text-lg">{message}</p>
    </div>
  );
};

export default FullScreenLoader;
