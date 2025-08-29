const IconAdornment = ({ icon, onClick, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 ${className}`}
      tabIndex={0}
      aria-label="Toggle password visibility"
    >
      {icon}
    </button>
  );
};

export default IconAdornment;
