import TrendingItemCard from './TrendingItemCard';
import { StaggerGroup, StaggerItem } from '../ui/motion/MotionWrappers';
import { fadeUp, slideFromLeft } from '../ui/motion/motionPresets';

const items = [
  {
    name: 'Ileme Dress',
    image:
      'https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_600,c_limit/v1761965676/misqabbi/landing-page/CSI_0041_n1o6cm.jpg',
    price: 250,
    url: '/product/ileme',
  },
  {
    name: 'MJ Boubou',
    image:
      'https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_600,c_limit/v1761965808/misqabbi/landing-page/CSI_0093_ila3wb.jpg',
    price: 310,
    url: '/product/mj',
  },
  {
    name: 'Mayah Skirt',
    image:
      'https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_600,c_limit/v1761965680/misqabbi/landing-page/CSI_9944_dsvzfv.jpg',
    price: 210,
    url: '/product/mayah',
  },
  {
    name: 'Belle Pants',
    image:
      'https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_600,c_limit/v1761957952/misqabbi/landing-page/CSI_9971_yqxnkp.jpg',
    price: 320,
    url: '/product/belle',
  },
];

function TrendingCollection() {
  return (
    <section className="w-full place-content-center">
      <StaggerGroup
        className="flex flex-col w-full text-left border-l-msq-purple-rich border-l-3 pl-2 my-4 overflow-hidden"
        staggerChildren={0.1}
      >
        <StaggerItem
          as="h2"
          variants={slideFromLeft}
          className="text-msq-purple-deep font-lato  text-[24px] md:text-[32px] md:mb-2 "
        >
          Trending this Season
        </StaggerItem>
        <StaggerItem
          as="p"
          variants={slideFromLeft}
          className="text-msq-purple-light font-lato text-[12px] md:text-[20px]"
        >
          Shine bright with this week's must-have trend selections.
        </StaggerItem>
      </StaggerGroup>
      <StaggerGroup
        className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6"
        staggerChildren={0.1}
      >
        {items.map(item => (
          <StaggerItem key={item.name} variants={fadeUp}>
            <TrendingItemCard {...item} url={item.url} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}

export default TrendingCollection;
