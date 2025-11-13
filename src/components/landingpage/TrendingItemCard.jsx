import { Link } from 'react-router';

function TrendingItemCard({ name, image, price, url }) {
  return (
    <div className="border-none">
      <div className="aspect-[3/4] w-full overflow-hidden">
        <Link to={url}>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-none"
            loading="lazy"
            decoding="async"
            width={600}
            height={800}
          />
        </Link>
      </div>
      <div>
        <h3 className="mt-3 text-[14px] md:text-[16px] lg:text-[18px] text-msq-purple font-lato text-left text-nowrap ">
          {name}
        </h3>
        <p className="text-msq-purple-deep text-[14px] md:text-[18px] lg:text-[20px] font-lato text-left">
          GHC {price}
        </p>
      </div>
    </div>
  );
}

export default TrendingItemCard;
