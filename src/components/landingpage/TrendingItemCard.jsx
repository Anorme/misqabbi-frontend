function TrendingItemCard({ name, image, price }) {
  return (
    <div className="border-none">
      <img
        src={image}
        alt={name}
        className="w-full h-[205px] md:h-[337px] object-cover rounded-none"
      />
      <div>
        <h3 className="mt-3 text-[16px] text-msq-purple font-lato text-left text-nowrap ">
          {name}
        </h3>
        <p className="text-msq-purple-deep text-[20px] font-lato text-left">GHC {price}</p>
      </div>
    </div>
  );
}

export default TrendingItemCard;
