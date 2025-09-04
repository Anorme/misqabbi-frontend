import PreviewBanner from './PreviewBanner';
import PreviewSplit from './PreviewSplit';
import PreviewPromo from './PreviewPromo';

const Preview = () => {
  return (
    <section className="w-7xl mx-auto space-y-15">
      <PreviewBanner />
      <PreviewSplit />
      <PreviewPromo />
    </section>
  );
};

export default Preview;
