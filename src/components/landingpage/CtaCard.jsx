const CtaCard = ({ src, alt }) => {
  return (
    <div className="overflow-hidden rounded-none aspect-[3/4]">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 ease-out"
        loading="lazy"
        decoding="async"
        width={400}
        height={400}
      />
    </div>
  );
};

export default CtaCard;
