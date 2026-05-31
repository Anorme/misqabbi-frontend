import { LoadStagger, StaggerItem } from '../ui/motion/MotionWrappers';

const BespokeIntro = () => {
  return (
    <section className="w-full px-2 sm:px-3 lg:px-6 py-4 sm:py-6 lg:py-8 bg-gradient-to-b from-gray-50/30 to-white">
      <div className="max-w-6xl mx-auto">
        <LoadStagger className="text-center mb-4 sm:mb-6 lg:mb-8">
          <StaggerItem
            as="h1"
            className="font-bebas text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-msq-purple-rich uppercase tracking-wider mb-2 sm:mb-3 leading-tight"
          >
            Bespoke
          </StaggerItem>
          <StaggerItem
            as="p"
            className="text-sm sm:text-base md:text-lg text-msq-purple-deep font-lato max-w-xl mx-auto leading-snug"
          >
            Hey gorgeous, want something made just for you? Let's bring your style to life.
          </StaggerItem>
        </LoadStagger>
      </div>
    </section>
  );
};

export default BespokeIntro;
