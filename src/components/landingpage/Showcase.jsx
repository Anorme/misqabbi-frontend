import { Link } from 'react-router';

import MsqButton from './MsqButton';
import CategoryList from './CategoryList';
import TrendingCollection from './TrendingCollection';
import { ViewportReveal } from '../ui/motion/MotionWrappers';
import { slideFromLeft, slideFromRight } from '../ui/motion/motionPresets';

const Showcase = () => {
  return (
    <section className="w-full bg-white">
      <ViewportReveal
        as="h2"
        variants={slideFromLeft}
        className="font-lato text-3xl md:text-[32px] text-msq-purple-deep mb-2 md:mb-4"
      >
        All Categories
      </ViewportReveal>
      <ViewportReveal variants={slideFromRight} className="overflow-hidden">
        <CategoryList />
      </ViewportReveal>

      <div className="">
        <TrendingCollection />
      </div>

      <div className="flex justify-center mt-[29pt] md:mt-[59px]">
        <Link to="/shop">
          <MsqButton
            label="VIEW THE COLLECTION"
            variant="purple-rich"
            className="text-[12px] md:text-[16px] lg:text-[18px]"
          />
        </Link>
      </div>
    </section>
  );
};

export default Showcase;
