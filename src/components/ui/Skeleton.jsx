const Skeleton = ({ className = '', ...props }) => {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-gray-200 ${className}`}
      {...props}
    />
  );
};

export default Skeleton;
