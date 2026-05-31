import CtaCard from './CtaCard';
import { StaggerGroup, StaggerItem } from '../ui/motion/MotionWrappers';
import { fadeUp } from '../ui/motion/motionPresets';

const CtaGrid = ({ images }) => {
  return (
    <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" staggerChildren={0.1}>
      {images.map((img, idx) => (
        <StaggerItem key={img.src} variants={fadeUp}>
          <CtaCard src={img.src} alt={img.alt || `Fashion ${idx + 1}`} />
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
};

export default CtaGrid;
