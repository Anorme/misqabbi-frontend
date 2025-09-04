const CtaCard = ({ src, alt }) => {
  return (
    <div className="overflow-hidden rounded-none">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
};

export default CtaCard;
