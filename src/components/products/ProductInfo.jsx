function ProductInfo({ product }) {
  return (
    <div className="flex flex-col gap-2 pb-4 sm:pb-6">
      <h1 className="font-extrabold text-lg sm:text-xl md:text-2xl tracking-tight text-msq-purple">
        {product?.name}
      </h1>
      <p className="text-xl sm:text-2xl font-extrabold text-msq-purple-deep hidden lg:block">
        GHC {product?.price}
      </p>
      <h2 className="text-lg sm:text-xl lg:text-2xl">Details</h2>
      <p className="text-base sm:text-lg leading-loose">{product?.description}</p>
    </div>
  );
}

export default ProductInfo;
