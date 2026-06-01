import { motion, useReducedMotion } from 'framer-motion';
import { forwardRef } from 'react';
import {
  bottomSheet,
  createStaggerContainer,
  dropdownAbove,
  dropdownBelow,
  fadeOnly,
  fadeUp,
  modalPop,
  motionEasing,
  motionTimings,
  presenceFade,
  slideInLeft,
} from './motionPresets';

const viewportOnce = { once: true, amount: 0.2 };

const getMotionComponent = as => motion[as] || motion.div;

export const Reveal = ({
  as = 'div',
  className = '',
  children,
  variants = fadeUp,
  transition,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();
  const Component = getMotionComponent(as);

  return (
    <Component
      className={className}
      variants={shouldReduceMotion ? fadeOnly : variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={transition}
      {...props}
    >
      {children}
    </Component>
  );
};

export const ViewportReveal = ({
  as = 'div',
  className = '',
  children,
  variants = fadeUp,
  viewport = viewportOnce,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();
  const Component = getMotionComponent(as);

  return (
    <Component
      className={className}
      variants={shouldReduceMotion ? fadeOnly : variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      {...props}
    >
      {children}
    </Component>
  );
};

export const LoadStagger = ({
  as = 'div',
  className = '',
  children,
  delayChildren = 0.12,
  staggerChildren = 0.14,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();
  const Component = getMotionComponent(as);

  return (
    <Component
      className={className}
      variants={
        shouldReduceMotion ? undefined : createStaggerContainer({ delayChildren, staggerChildren })
      }
      initial="hidden"
      animate="visible"
      {...props}
    >
      {children}
    </Component>
  );
};

export const StaggerGroup = ({
  as = 'div',
  className = '',
  children,
  delayChildren = 0.08,
  staggerChildren = 0.12,
  viewport = { once: true, amount: 0.15 },
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();
  const Component = getMotionComponent(as);

  return (
    <Component
      className={className}
      variants={
        shouldReduceMotion ? undefined : createStaggerContainer({ delayChildren, staggerChildren })
      }
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      {...props}
    >
      {children}
    </Component>
  );
};

export const StaggerItem = ({
  as = 'div',
  className = '',
  children,
  variants = fadeUp,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();
  const Component = getMotionComponent(as);

  return (
    <Component className={className} variants={shouldReduceMotion ? fadeOnly : variants} {...props}>
      {children}
    </Component>
  );
};

export const SlidePanel = forwardRef(({ className = '', children, isOpen, ...props }, ref) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <motion.div ref={ref} className={className} {...props}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={slideInLeft}
      initial="hidden"
      animate={isOpen ? 'visible' : 'hidden'}
      exit="exit"
      transition={{ duration: motionTimings.base, ease: motionEasing }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

SlidePanel.displayName = 'SlidePanel';

export const MotionDropdown = forwardRef(
  ({ className = '', children, placement = 'bottom', ...props }, ref) => {
    const shouldReduceMotion = useReducedMotion();
    const variants = placement === 'top' ? dropdownAbove : dropdownBelow;

    return (
      <motion.div
        ref={ref}
        className={className}
        variants={shouldReduceMotion ? presenceFade : variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

MotionDropdown.displayName = 'MotionDropdown';

export const MotionBottomSheet = forwardRef(({ className = '', children, ...props }, ref) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={shouldReduceMotion ? presenceFade : bottomSheet}
      initial="hidden"
      animate="visible"
      exit="exit"
      {...props}
    >
      {children}
    </motion.div>
  );
});

MotionBottomSheet.displayName = 'MotionBottomSheet';

export const MotionOverlay = forwardRef(({ className = '', children, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={presenceFade}
      initial="hidden"
      animate="visible"
      exit="exit"
      {...props}
    >
      {children}
    </motion.div>
  );
});

MotionOverlay.displayName = 'MotionOverlay';

export const MotionModal = forwardRef(({ className = '', children, ...props }, ref) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={shouldReduceMotion ? presenceFade : modalPop}
      initial="hidden"
      animate="visible"
      exit="exit"
      {...props}
    >
      {children}
    </motion.div>
  );
});

MotionModal.displayName = 'MotionModal';
