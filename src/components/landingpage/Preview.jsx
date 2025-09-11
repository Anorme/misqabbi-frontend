import PreviewBanner from './PreviewBanner';
import PreviewSplit from './PreviewSplit';
import PreviewPromo from './PreviewPromo';

const Preview = () => {
  return (
    <section className="max-w-7xl mx-auto space-y-15 flex flex-col justify-center items-center">
      <PreviewBanner />
      <PreviewSplit />
      <PreviewPromo />
    </section>
  );
};

export default Preview;
