import CloseButton from '../ui/CloseButton';

const WebViewWarningModal = ({ isOpen, onClose, onUseEmailLogin }) => {
  const handleClose = () => {
    onClose();
  };

  const handleUseEmailLogin = () => {
    onClose();
    if (onUseEmailLogin) {
      // Small delay to ensure modal closes before focusing
      setTimeout(() => {
        onUseEmailLogin();
      }, 100);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
        {/* Close Button */}
        <CloseButton
          onClose={handleClose}
          size={20}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-600 transition-colors duration-200 cursor-pointer"
          ariaLabel="Close modal"
        />

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="font-bebas text-[24px] font-bold uppercase text-msq-purple-rich mb-2">
            Google Login Notice
          </h2>
          <p className="text-gray-600 text-sm font-lato">
            Google login may not work in this app's browser. Please open in Safari/Chrome or use
            email login.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleUseEmailLogin}
            className="w-full bg-msq-purple-rich text-white py-3.5 px-6 rounded-xl font-lato font-semibold hover:bg-msq-purple transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"
          >
            Use Email Login
          </button>

          <button
            onClick={handleClose}
            className="w-full bg-white text-msq-purple-rich py-3.5 px-6 rounded-xl font-lato font-semibold border-2 border-msq-purple-rich hover:bg-msq-purple-rich hover:text-white transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebViewWarningModal;
