import Skeleton from '../ui/Skeleton';
import ProductSection from './ProductSection';

const mobileThumbnails = Array.from({ length: 4 });
const tabletThumbnails = Array.from({ length: 5 });
const desktopThumbnails = Array.from({ length: 6 });

const ThumbnailRow = ({ thumbnails, itemClassName }) => {
  return (
    <div className="pt-2 sm:pt-3 lg:pt-4">
      <div className="overflow-hidden px-3 pb-1.5 sm:px-4 sm:pb-2 lg:px-0">
        <ul className="flex touch-pan-y gap-1 sm:gap-1.5 md:gap-2 lg:gap-3">
          {thumbnails.map((_, index) => (
            <li key={index} className={`min-w-0 ${itemClassName}`}>
              <Skeleton className="aspect-[2/3] w-full rounded-none" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const GallerySkeleton = ({ imageClassName, thumbnails, thumbnailClassName }) => {
  return (
    <div className="w-full lg:px-0">
      <div className={`relative min-h-0 w-full overflow-hidden ${imageClassName}`}>
        <Skeleton className="h-full w-full rounded-none" />
        <div className="absolute top-3 right-3 z-10">
          <Skeleton className="h-10 w-10 rounded-full bg-gray-100" />
        </div>
      </div>

      <ThumbnailRow thumbnails={thumbnails} itemClassName={thumbnailClassName} />
    </div>
  );
};

const ProductInfoSkeleton = ({ compact = false }) => {
  return (
    <div className="divide-y-2 divide-gray-300 lg:pt-4">
      <div className="flex flex-col gap-2 pb-4 sm:pb-6">
        <Skeleton className="h-6 w-4/5 rounded-sm sm:h-7 md:h-8 lg:w-3/4" />
        <Skeleton className="h-6 w-28 rounded-sm sm:h-7" />
      </div>

      <ProductSection>
        <div className="flex flex-col gap-0">
          <Skeleton className="h-6 w-24 rounded-sm" />
          <div className="mt-2 flex w-fit items-center gap-3 border border-solid border-msq-gold-light p-2 sm:gap-4">
            <Skeleton className="h-7 w-8 rounded sm:w-10" />
            <Skeleton className="h-6 w-5 rounded-sm" />
            <Skeleton className="h-7 w-8 rounded sm:w-10" />
          </div>
        </div>
      </ProductSection>

      <ProductSection>
        <div className="flex flex-col gap-0">
          <div className="flex w-full items-center justify-between gap-4 py-1">
            <div className="flex items-baseline gap-2">
              <Skeleton className="h-6 w-12 rounded-sm" />
              <Skeleton className="h-4 w-24 rounded-sm" />
            </div>
            <Skeleton className="h-5 w-5 rounded-sm" />
          </div>
        </div>
      </ProductSection>

      <ProductSection>
        <Skeleton className="h-[54px] w-full rounded-none sm:h-[64px] lg:h-[68px]" />
      </ProductSection>

      <ProductSection>
        <Skeleton className="h-[54px] w-full rounded-none sm:h-[64px] lg:h-[68px]" />
      </ProductSection>

      <ProductSection>
        <div className="flex flex-col gap-2 pb-4 sm:pb-6">
          <Skeleton className="h-7 w-24 rounded-sm" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full rounded-sm" />
            <Skeleton className="h-4 w-11/12 rounded-sm" />
            {!compact && <Skeleton className="h-4 w-4/5 rounded-sm" />}
          </div>
        </div>
      </ProductSection>
    </div>
  );
};

const MobileProductDetailsSkeleton = () => {
  return (
    <div className="md:hidden">
      <div className="-mx-3 flex flex-col gap-3">
        <GallerySkeleton
          imageClassName="h-[min(125vw,calc(100svh-7rem))]"
          thumbnails={mobileThumbnails}
          thumbnailClassName="flex-[0_0_25%]"
        />
      </div>

      <div className="mt-6">
        <ProductInfoSkeleton compact />
      </div>
    </div>
  );
};

const TabletProductDetailsSkeleton = () => {
  return (
    <div className="hidden md:block lg:hidden">
      <div className="-mx-4 flex flex-col gap-4">
        <GallerySkeleton
          imageClassName="h-[min(125vw,calc(100svh-8rem))]"
          thumbnails={tabletThumbnails}
          thumbnailClassName="flex-[0_0_19%]"
        />
      </div>

      <div className="mt-8">
        <ProductInfoSkeleton />
      </div>
    </div>
  );
};

const DesktopProductDetailsSkeleton = () => {
  return (
    <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
      <div className="flex flex-col gap-5">
        <GallerySkeleton
          imageClassName="h-[min(62.5vw,calc(100vh-10rem))] max-h-[calc(100vh-10rem)]"
          thumbnails={desktopThumbnails}
          thumbnailClassName="flex-[0_0_16.5%]"
        />
      </div>

      <ProductInfoSkeleton />
    </div>
  );
};

const ProductDetailsSkeleton = () => {
  return (
    <div className="font-lato px-3 sm:px-4 py-0 lg:py-8 bg-white">
      <main
        className="text-start flex flex-col gap-2"
        role="status"
        aria-label="Loading product details"
        aria-live="polite"
      >
        <div className="max-w-screen-xl mx-auto w-full py-0">
          <MobileProductDetailsSkeleton />
          <TabletProductDetailsSkeleton />
          <DesktopProductDetailsSkeleton />
        </div>
      </main>
    </div>
  );
};

export default ProductDetailsSkeleton;
