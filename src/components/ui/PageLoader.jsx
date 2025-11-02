import { LoadingSpinner } from './LoadingSpinner';

const PageLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px] py-20">
      <LoadingSpinner size={64} color="var(--color-msq-gold-light)" />
    </div>
  );
};

export default PageLoader;
