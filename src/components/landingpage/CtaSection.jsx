import CtaGrid from './CtaGrid';

const CtaSection = () => {
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1695298802594-f1459207ddb2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'White ruffled top',
    },
    {
      src: 'https://images.unsplash.com/photo-1619785292489-043ea2cc700c?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Red Amour tee',
    },
    {
      src: 'https://images.unsplash.com/photo-1602185948056-7a517148a391?q=80&w=757&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Pink and blue dress',
    },
    {
      src: 'https://images.unsplash.com/photo-1619785292559-a15caa28bde6?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Metallic cutout outfit',
    },
  ];

  return (
    <section className="px-4 pb-10 max-w-7xl mx-auto text-center">
      <h2 className="text-2xl md:text-3xl font-bebas tracking-wide text-msq-purple-rich mb-6">
        FOLLOW US ON INSTAGRAM <span className="text-msq-purple-light">@MISIQABBIGH</span>
      </h2>

      <CtaGrid images={images} />
    </section>
  );
};

export default CtaSection;
