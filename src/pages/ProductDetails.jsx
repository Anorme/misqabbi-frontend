import { MdArrowBackIos } from 'react-icons/md';

function ProductDetails() {
  return (
    <div className="font-lato p-4 bg-white">
      <header className="flex relative items-center justify-center">
        <div className="absolute left-2 cursor-pointer">
          <MdArrowBackIos />
        </div>
        <p className="lg:hidden">Product Details</p>
      </header>

      <main className="overflow-y-auto overflow-x-hidden scrollbar-hide text-start flex flex-col gap-2"></main>
    </div>
  );
}

export default ProductDetails;
