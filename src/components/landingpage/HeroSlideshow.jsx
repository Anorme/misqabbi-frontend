import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

const SLIDE_DURATION_MS = 3500;
const CROSSFADE_DURATION_SECONDS = 0.8;
const MotionImage = motion.img;

const slideshowImages = [
  {
    src: 'https://res.cloudinary.com/dtmz5ecud/image/upload/v1780279636/jasmine-erin-pearl_bub9lc.png',
    alt: 'Model seated on a sofa in a black Misqabbi dress',
  },
  {
    src: 'https://res.cloudinary.com/dtmz5ecud/image/upload/v1780279638/jasmine-ileme-landscape_aeajhy.png',
    alt: 'Two models walking in Misqabbi outfits',
  },
  {
    src: 'https://res.cloudinary.com/dtmz5ecud/image/upload/v1780279631/aj-nessa-belle_qjfiey.png',
    alt: 'Two models seated in patterned Misqabbi pants',
  },
];

const HeroSlideshow = ({ firstImageSrc }) => {
  const shouldReduceMotion = useReducedMotion();
  const slideshowRef = useRef(null);
  const isFirstRender = useRef(true);
  const isInView = useInView(slideshowRef, { amount: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = useMemo(
    () => [
      {
        src: firstImageSrc,
        alt: 'Misqabbi hero image',
      },
      ...slideshowImages,
    ],
    [firstImageSrc]
  );

  useEffect(() => {
    if (shouldReduceMotion) return undefined;

    slides.slice(1).forEach(({ src }) => {
      const image = new Image();
      image.src = src;
    });

    return undefined;
  }, [shouldReduceMotion, slides]);

  useEffect(() => {
    if (shouldReduceMotion || !isInView) return undefined;

    const slideTimer = window.setInterval(() => {
      setActiveIndex(currentIndex => (currentIndex + 1) % slides.length);
    }, SLIDE_DURATION_MS);

    return () => window.clearInterval(slideTimer);
  }, [isInView, shouldReduceMotion, slides.length]);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  const activeSlide = slides[activeIndex];

  if (shouldReduceMotion) {
    return (
      <img
        ref={slideshowRef}
        src={slides[0].src}
        alt={slides[0].alt}
        className="absolute inset-0 h-full w-full object-cover object-center"
        fetchPriority="high"
        loading="eager"
      />
    );
  }

  return (
    <div ref={slideshowRef} className="absolute inset-0">
      <AnimatePresence>
        <MotionImage
          key={activeSlide.src}
          src={activeSlide.src}
          alt={activeSlide.alt}
          className="absolute inset-0 h-full w-full object-cover object-center"
          initial={{ opacity: isFirstRender.current ? 1 : 0, scale: 1 }}
          animate={{ opacity: 1, scale: isInView ? 1.08 : 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: CROSSFADE_DURATION_SECONDS, ease: 'easeInOut' },
            scale: { duration: SLIDE_DURATION_MS / 1000, ease: 'easeOut' },
          }}
          fetchPriority={activeIndex === 0 ? 'high' : undefined}
          loading={activeIndex === 0 ? 'eager' : undefined}
        />
      </AnimatePresence>
    </div>
  );
};

export default HeroSlideshow;
