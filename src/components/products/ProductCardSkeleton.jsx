import Skeleton from '../ui/Skeleton';

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white border-none rounded-none w-full mx-auto">
      <div className="relative">
        <Skeleton className="aspect-[3/4] w-full rounded-none" />
        <div className="absolute top-3 right-3">
          <Skeleton className="h-9 w-9 rounded-full bg-gray-100" />
        </div>
      </div>
      <div className="px-4 py-2">
        <Skeleton className="h-4 w-3/4 rounded-sm" />
        <div className="mt-3 flex items-center justify-between">
          <Skeleton className="h-5 w-20 rounded-sm" />
          <Skeleton className="h-6 w-6 rounded-full bg-gray-100 lg:h-7 lg:w-7" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
