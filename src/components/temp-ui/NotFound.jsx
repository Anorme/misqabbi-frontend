import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7f0fa] px-6 py-12 text-center">
      <h1 className="text-[6rem] font-bebas text-msq-purple-rich leading-none tracking-wide">
        404
      </h1>
      <span className="text-lg font-lato text-msq-purple-deep m-0 max-w-md">
        Hey queen, you might be a little lost.
      </span>
      <span className="text-lg font-lato text-msq-purple-deep mb-4 max-w-md">
        But your style journey doesn’t have to end here.
      </span>
      <p className="text-msq-gold font-[monotype-corsiva] italic mb-6">
        Feel confident, beautiful, and uniquely you with Misqabbi.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-msq-gold text-white font-lato uppercase tracking-wide hover:bg-[#cfb484] transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default NotFound;
