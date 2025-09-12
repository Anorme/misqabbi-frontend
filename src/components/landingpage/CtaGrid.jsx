import CtaCard from './CtaCard';

const CtaGrid = ({ images }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {images.map((img, idx) => (
        <CtaCard key={idx} src={img.src} alt={img.alt || `Fashion ${idx + 1}`} />
      ))}
    </div>
  );
};

export default CtaGrid;
