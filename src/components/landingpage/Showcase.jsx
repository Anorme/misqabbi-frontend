import { Link } from 'react-router';

import MsqButton from './MsqButton';
import CategoryList from './CategoryList';
import TrendingCollection from './TrendingCollection';

const Showcase = () => {
  return (
    <section className="w-full bg-white">
      <h2 className="font-lato text-3xl md:text-[32px] text-msq-purple-deep mb-2 md:mb-4">
        All Categories
      </h2>
      <CategoryList />

      <div className="">
        <TrendingCollection />
      </div>

      <div className="flex justify-center mt-[29pt] md:mt-[59px]">
        <Link to="/shop">
          <MsqButton
            label="VIEW THE COLLECTION"
            variant="gold"
            className="text-[16px] md:text-[20px]"
          />
        </Link>
      </div>
    </section>
  );
};

export default Showcase;
