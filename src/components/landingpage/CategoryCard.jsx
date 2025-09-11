function CategoryCard({ name, image }) {
  return (
    <div className="flex flex-col items-center justify-center mx-2">
      <div className="w-[53px] h-[53px] md:w-[164px] md:h-[164px] rounded-full overflow-hidden border border-none">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <span className="mt-3 md:mt-8 text-[18px] md:text-[24px] font-lato text-msq-purple-rich">
        {name}
      </span>
    </div>
  );
}

export default CategoryCard;
