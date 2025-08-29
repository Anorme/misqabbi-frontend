const ErrorMessage = ({ error, className = '' }) => {
  if (!error) return null;

  return (
    <p className={`text-red-500 text-sm mt-1 ${className}`} role="alert" aria-live="polite">
      {error}
    </p>
  );
};

export default ErrorMessage;
