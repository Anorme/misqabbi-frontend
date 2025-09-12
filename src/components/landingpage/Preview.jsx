import PreviewBanner from './PreviewBanner';
import PreviewSplit from './PreviewSplit';
import PreviewPromo from './PreviewPromo';

const Preview = () => {
  return (
    <section className="space-y-15 flex flex-col justify-center items-center">
      <PreviewBanner />
      <PreviewSplit />
      <PreviewPromo />
    </section>
  );
};

export default Preview;
