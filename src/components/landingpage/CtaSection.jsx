import CtaGrid from './CtaGrid';

const CtaSection = () => {
  const images = [
    {
      src: 'https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_400,c_limit/v1761957971/misqabbi/landing-page/CSI_0021_cafnkk.jpg',
      alt: 'African print boubou',
    },
    {
      src: 'https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_400,c_limit/v1761957940/misqabbi/landing-page/CSI_9931_yswr5p.jpg',
      alt: 'African print skirt',
    },
    {
      src: 'https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_400,c_limit/v1761957970/misqabbi/landing-page/CSI_0017_xfkeyp.jpg',
      alt: 'African print boubou',
    },
    {
      src: 'https://res.cloudinary.com/dyciw970t/image/upload/f_auto,q_auto,w_400,c_limit/v1761957944/misqabbi/landing-page/CSI_9950_axm5vx.jpg',
      alt: 'African print skirt',
    },
  ];

  return (
    <section className="pb-10 w-full text-center">
      <h2 className="text-2xl md:text-3xl font-bebas tracking-wide text-msq-purple-rich mb-6">
        <a
          href="https://www.instagram.com/misqabbigh"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          FOLLOW US ON INSTAGRAM <span className="text-msq-purple-light">@MISQABBIGH</span>
        </a>
      </h2>

      <CtaGrid images={images} />
    </section>
  );
};

export default CtaSection;
