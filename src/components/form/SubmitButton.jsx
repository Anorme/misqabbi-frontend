const SubmitButton = ({ label, disabled }) => (
  <button
    type="submit"
    className={`w-[60%] mx-auto bg-purple-700 text-white py-3 font-semibold ${
      !disabled ? 'cursor-pointer hover:bg-purple-500' : 'opacity-50 cursor-not-allowed'
    }`}
    style={{ borderRadius: '18px' }}
    disabled={disabled}
  >
    {label}
  </button>
);

export default SubmitButton;
