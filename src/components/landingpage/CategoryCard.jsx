function CategoryCard({ name, image }) {
  return (
    <div className="flex flex-col items-center mx-2">
      <div className="w-[164px] h-[164px] rounded-full overflow-hidden border border-none">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <span className="mt-8 text-[24px] font-lato text-msq-purple-rich">{name}</span>
    </div>
  );
}

export default CategoryCard;
