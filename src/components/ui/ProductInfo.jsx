function ProductInfo({ product }) {
  return (
    <div className="flex flex-col gap-2 pb-6">
      <h1 className="font-extrabold text-2xl tracking-tight text-[#7D3C98]">{product?.name}</h1>
      <p className="text-2xl font-extrabold text-msq-purple-deep hidden lg:block">
        GHC {product?.price}
      </p>
      <h2 className="text-2xl">Details</h2>
      <p>{product?.description}</p>
    </div>
  );
}

export default ProductInfo;
