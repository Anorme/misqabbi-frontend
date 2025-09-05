import MsqButton from './MsqButton';
import CategoryList from './CategoryList';
import TrendingCollection from './TrendingCollection';

const Showcase = () => {
  return (
    <section className="px-4 max-w-7xl mx-auto bg-white">
      <h2 className="font-lato text-[32px] text-msq-purple-deep mb-4">All Categories</h2>
      <CategoryList />

      <div className="">
        <TrendingCollection />
      </div>

      <div className="flex justify-center mt-8">
        <MsqButton label="VIEW THE COLLECTION" variant="gold" className="text-[20px]" />
      </div>
    </section>
  );
};

export default Showcase;
