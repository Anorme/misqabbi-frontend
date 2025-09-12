import TrendingItemCard from './TrendingItemCard';

const items = [
  {
    name: 'HIGH WAIST PANT',
    image:
      'https://images.unsplash.com/photo-1681638413089-0d2232195ad1?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 300,
  },
  {
    name: 'CLASSIC BLACK BLAZER',
    image:
      'https://images.unsplash.com/photo-1748290880592-6ca12f3628e0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 300,
  },
  {
    name: 'FLORAL MINI DRESS',
    image:
      'https://images.unsplash.com/photo-1689553119681-61493fd2515f?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 300,
  },
  {
    name: 'LAYLA MIDI DRESS',
    image:
      'https://images.unsplash.com/photo-1649200769400-09c1f6292bbd?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 300,
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
