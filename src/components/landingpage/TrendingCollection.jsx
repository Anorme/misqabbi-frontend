import TrendingItemCard from './TrendingItemCard';

const items = [
  {
    name: 'Ileme Dress',
    image:
      'https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_600,c_limit/v1761965676/misqabbi/landing-page/CSI_0041_n1o6cm.jpg',
    price: 210,
  },
  {
    name: 'MJ Boubou',
    image:
      'https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_600,c_limit/v1761965808/misqabbi/landing-page/CSI_0093_ila3wb.jpg',
    price: 270,
  },
  {
    name: 'Mayah Skirt',
    image:
      'https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_600,c_limit/v1761965680/misqabbi/landing-page/CSI_9944_dsvzfv.jpg',
    price: 200,
  },
  {
    name: 'Belle Pants',
    image:
      'https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_600,c_limit/v1761957952/misqabbi/landing-page/CSI_9971_yqxnkp.jpg',
    price: 290,
  },
];

function TrendingCollection() {
  return (
    <section className="w-full place-content-center">
      <div className="flex flex-col w-[500px] text-left border-l-msq-purple-rich border-l-3 pl-2 my-4">
        <h2 className="text-msq-purple-deep font-lato  text-[24px] md:text-[32px] md:mb-2 ">
          Trending this Season
        </h2>
        <p className="text-msq-purple-light font-lato text-[12px] md:text-[20px]">
          Shine bright with this week's must-have trend selections.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
        {items.map(item => (
          <TrendingItemCard key={item.name} {...item} />
        ))}
      </div>
    </section>
  );
}

export default TrendingCollection;
