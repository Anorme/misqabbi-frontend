const SubmitButton = ({ label, disabled }) => (
  <button
    type="submit"
    className={`w-full sm:w-[60%] mx-auto bg-msq-purple-rich text-white py-3 font-semibold ${
      !disabled ? 'cursor-pointer hover:bg-msq-purple-light' : 'opacity-50 cursor-not-allowed'
    }`}
    style={{ borderRadius: '18px' }}
    disabled={disabled}
  >
    {label}
  </button>
);

export default SubmitButton;
