/**
 * Sticky scrollytelling / scroll-scrubbed background section.
 *
 * Pattern: a tall outer section provides scroll runway while a 100svh sticky
 * frame pins the foreground content and scroll-scrubs an overscanned image.
 */
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const MotionDiv = motion.div;

const clampNumber = (value, fallback, min, max) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return fallback;
  }

  return Math.min(Math.max(numericValue, min), max);
};

const StickyPanBackgroundSection = ({
  backgroundImage,
  children,
  panScrollRunwayVh = 90,
  panRangePercent = 26,
  scrimOpacity = 0.5,
  className = '',
}) => {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const safeRunwayVh = clampNumber(panScrollRunwayVh, 90, 0, 200);
  const safePanPercent = clampNumber(panRangePercent, 26, 0, 50);
  const safeScrimOpacity = clampNumber(scrimOpacity, 0.5, 0, 1);
  const activePanPercent = shouldReduceMotion ? 0 : safePanPercent;
  const minHeight = shouldReduceMotion ? '100svh' : `calc(100svh + ${safeRunwayVh}svh)`;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [`${safePanPercent}svh`, `-${safePanPercent}svh`]
  );

  return (
    <section
      ref={sectionRef}
      className={`w-full ${className}`}
      style={{ minHeight }}
      aria-label="Featured content"
    >
      {/* Outer height creates the scroll runway; this inner frame pins the viewport. */}
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Overscan exactly matches the pan distance so the covered image never letterboxes. */}
        <MotionDiv
          className="absolute left-0 w-full"
          style={{
            top: `-${activePanPercent}svh`,
            height: `calc(100% + ${activePanPercent * 2}svh)`,
            y: shouldReduceMotion ? '0svh' : imageY,
          }}
        >
          <img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
            draggable="false"
          />
        </MotionDiv>

        {safeScrimOpacity > 0 ? (
          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: safeScrimOpacity }}
            aria-hidden="true"
          />
        ) : null}

        <div className="absolute inset-0 flex items-center justify-center px-4 py-12 text-center sm:px-6 lg:px-8 pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_input]:pointer-events-auto [&_select]:pointer-events-auto [&_textarea]:pointer-events-auto">
          {children}
        </div>
      </div>
    </section>
  );
};

export default StickyPanBackgroundSection;
