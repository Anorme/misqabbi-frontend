const CategoryList = ({ categories = [], className = '' }) => {
  return (
    <ul
      className={`flex flex-wrap justify-center text-xl pt-3 w-full lg:w-[700px] h-auto lg:h-[50px] mt-[20px] lg:mt-[50px] lg:ml-[100px] gap-2 ${className}`}
    >
      {categories.map(category => (
        <li
          key={category}
          className="text-white bg-[#c01da8] w-[150px] h-[50px] hover:bg-white 
          hover:text-[#c01da8] p-3 rounded-sm text-center cursor-pointer"
        >
          {category}
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
