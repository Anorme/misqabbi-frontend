const SocialButton = ({ icon, text, onClick }) => (
  <button
    className="w-[60%] mx-auto py-3 rounded-md flex justify-center items-center gap-2 cursor-pointer text-gray-900"
    type="button"
    onClick={onClick}
  >
    {icon}
    {text}
  </button>
);

export default SocialButton;
