import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Search } from 'lucide-react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import { getImageUrl, getPrimaryImageUrl } from '../../utils/productImages';
import FavoritesLinkButton from '../favorites/FavoritesLinkButton';

const AUTO_SCROLL_INTERVAL_MS = 3500;
const AUTO_SCROLL_RESUME_DELAY_MS = 10000;
const ZOOM_EPSILON = 0.05;

function GalleryImages({
  product,
  selectedIndex = 0,
  onImageSelect,
  favoriteProduct,
  onFavoriteAuthRequired,
}) {
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const autoScrollResumeTimeoutRef = useRef(null);
  const isPointerOverGalleryRef = useRef(false);
  const galleryImages = useMemo(() => {
    if (product?.images?.length) {
      return product.images;
    }

    const fallbackImage = product?.image || getPrimaryImageUrl(product);
    return fallbackImage ? [fallbackImage] : [];
  }, [product]);

  const hasMultipleImages = galleryImages.length > 1;
  const lightboxSlides = useMemo(
    () =>
      galleryImages.map((img, idx) => ({
        src: getImageUrl(img),
        alt: `${product?.name || 'Product'} image ${idx + 1}`,
      })),
    [galleryImages, product?.name]
  );
  const [mainEmblaRef, mainEmblaApi] = useEmblaCarousel({
    align: 'start',
    loop: hasMultipleImages,
    watchDrag: hasMultipleImages && !isImageZoomed,
  });
  const [thumbsEmblaRef, thumbsEmblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
    loop: false,
  });

  const clearAutoScrollResume = useCallback(() => {
    if (autoScrollResumeTimeoutRef.current) {
      window.clearTimeout(autoScrollResumeTimeoutRef.current);
      autoScrollResumeTimeoutRef.current = null;
    }
  }, []);

  const pauseAutoScroll = useCallback(() => {
    clearAutoScrollResume();
    setIsAutoScrollPaused(true);
  }, [clearAutoScrollResume]);

  const resumeAutoScroll = useCallback(() => {
    clearAutoScrollResume();
    setIsAutoScrollPaused(false);
  }, [clearAutoScrollResume]);

  const scheduleAutoScrollResume = useCallback(
    (resumeWhilePointerOver = false) => {
      clearAutoScrollResume();
      autoScrollResumeTimeoutRef.current = window.setTimeout(() => {
        if (resumeWhilePointerOver || !isPointerOverGalleryRef.current) {
          setIsAutoScrollPaused(false);
        }

        autoScrollResumeTimeoutRef.current = null;
      }, AUTO_SCROLL_RESUME_DELAY_MS);
    },
    [clearAutoScrollResume]
  );

  const handleGalleryMouseEnter = useCallback(() => {
    isPointerOverGalleryRef.current = true;
    pauseAutoScroll();
  }, [pauseAutoScroll]);

  const handleGalleryMouseLeave = useCallback(() => {
    isPointerOverGalleryRef.current = false;
    resumeAutoScroll();
  }, [resumeAutoScroll]);

  const handleLightboxOpen = useCallback(() => {
    pauseAutoScroll();
    setIsLightboxOpen(true);
  }, [pauseAutoScroll]);

  const handleLightboxClose = useCallback(() => {
    setIsLightboxOpen(false);
    scheduleAutoScrollResume(true);
  }, [scheduleAutoScrollResume]);

  const handleThumbnailClick = useCallback(
    idx => {
      pauseAutoScroll();
      onImageSelect?.(idx);
      mainEmblaApi?.scrollTo(idx);
      scheduleAutoScrollResume(true);
    },
    [mainEmblaApi, onImageSelect, pauseAutoScroll, scheduleAutoScrollResume]
  );

  const handleSelect = useCallback(() => {
    if (!mainEmblaApi || galleryImages.length === 0) return;

    const nextIndex = mainEmblaApi.selectedScrollSnap();
    onImageSelect?.(nextIndex);
    thumbsEmblaApi?.scrollTo(nextIndex);
  }, [galleryImages.length, mainEmblaApi, onImageSelect, thumbsEmblaApi]);

  useEffect(() => {
    if (!mainEmblaApi) return;

    handleSelect();
    mainEmblaApi.on('select', handleSelect);
    mainEmblaApi.on('reInit', handleSelect);

    return () => {
      mainEmblaApi.off('select', handleSelect);
      mainEmblaApi.off('reInit', handleSelect);
    };
  }, [mainEmblaApi, handleSelect]);

  useEffect(() => {
    if (!mainEmblaApi || selectedIndex < 0 || selectedIndex >= galleryImages.length) {
      return;
    }

    if (mainEmblaApi.selectedScrollSnap() !== selectedIndex) {
      mainEmblaApi.scrollTo(selectedIndex);
    }

    thumbsEmblaApi?.scrollTo(selectedIndex);
  }, [galleryImages.length, mainEmblaApi, selectedIndex, thumbsEmblaApi]);

  useEffect(() => {
    if (
      !mainEmblaApi ||
      !hasMultipleImages ||
      isImageZoomed ||
      isAutoScrollPaused ||
      isLightboxOpen
    ) {
      return;
    }

    const intervalId = window.setInterval(() => {
      mainEmblaApi.scrollNext();
    }, AUTO_SCROLL_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [hasMultipleImages, isAutoScrollPaused, isImageZoomed, isLightboxOpen, mainEmblaApi]);

  useEffect(() => clearAutoScrollResume, [clearAutoScrollResume]);

  if (galleryImages.length === 0) {
    return null;
  }

  return (
    <div className="w-full lg:px-0">
      <div
        className="relative aspect-[4/5] max-h-[calc(100svh-7rem)] min-h-0 w-full overflow-hidden sm:max-h-[calc(100svh-8rem)] lg:max-h-[calc(100vh-10rem)]"
        onMouseEnter={handleGalleryMouseEnter}
        onMouseLeave={handleGalleryMouseLeave}
        onPointerDown={pauseAutoScroll}
        onPointerUp={scheduleAutoScrollResume}
        onPointerCancel={scheduleAutoScrollResume}
      >
        <div ref={mainEmblaRef} className="relative z-0 h-full overflow-hidden">
          <ul className="flex h-full touch-pan-y">
            {galleryImages.map((img, idx) => (
              <li key={idx} className="h-full min-h-0 min-w-0 flex-[0_0_100%]">
                <TransformWrapper
                  key={`${idx}-${selectedIndex === idx ? 'selected' : 'idle'}`}
                  initialScale={1}
                  minScale={1}
                  maxScale={3}
                  doubleClick={{ disabled: false, mode: 'toggle' }}
                  panning={{ disabled: !isImageZoomed }}
                  wheel={{ disabled: true }}
                  pinch={{ step: 5 }}
                  centerOnInit={true}
                  onPinchingStart={() => {
                    pauseAutoScroll();
                    setIsImageZoomed(true);
                  }}
                  onPinchingStop={({ state }) => setIsImageZoomed(state.scale > 1 + ZOOM_EPSILON)}
                  onZoomStart={() => {
                    pauseAutoScroll();
                    setIsImageZoomed(true);
                  }}
                  onZoomStop={({ state }) => setIsImageZoomed(state.scale > 1 + ZOOM_EPSILON)}
                >
                  <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full">
                    <img
                      src={getImageUrl(img)}
                      alt={`${product?.name || 'Product'} image ${idx + 1}`}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="h-full w-full cursor-zoom-in object-cover rounded-none"
                    />
                  </TransformComponent>
                </TransformWrapper>
              </li>
            ))}
          </ul>
        </div>

        {favoriteProduct ? (
          <div className="absolute top-3 right-3 z-20">
            <FavoritesLinkButton
              product={favoriteProduct}
              onAuthRequired={onFavoriteAuthRequired}
            />
          </div>
        ) : null}

        <button
          type="button"
          onClick={handleLightboxOpen}
          className="absolute bottom-3 left-3 z-20 flex cursor-pointer items-center text-msq-gold-light transition-colors duration-200 hover:text-msq-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-msq-gold-light"
          aria-label="View product image fullscreen"
        >
          <Search className="hover:stroke-msq-gold" size={30} aria-hidden="true" />
        </button>
      </div>

      <div className="pt-2 sm:pt-3 lg:pt-4">
        <div ref={thumbsEmblaRef} className="overflow-hidden px-3 pb-1.5 sm:px-4 sm:pb-2 lg:px-0">
          <ul className="flex touch-pan-y gap-1 sm:gap-1.5 md:gap-2 lg:gap-3">
            {galleryImages.map((img, idx) => (
              <li
                key={idx}
                className="min-w-0 flex-[0_0_25%] sm:flex-[0_0_19%] md:flex-[0_0_16%] lg:flex-[0_0_16.5%]"
              >
                <button
                  type="button"
                  onClick={() => handleThumbnailClick(idx)}
                  className={`block aspect-[2/3] w-full cursor-pointer overflow-hidden border-2 transition-all duration-200 ${
                    selectedIndex === idx
                      ? 'border-msq-purple-rich'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`Show ${product?.name || 'product'} image ${idx + 1}`}
                  aria-current={selectedIndex === idx ? 'true' : undefined}
                >
                  <img
                    src={getImageUrl(img)}
                    alt={`${product?.name || 'Product'} thumbnail ${idx + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full rounded-none object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Lightbox
        open={isLightboxOpen}
        close={handleLightboxClose}
        index={selectedIndex}
        slides={lightboxSlides}
        plugins={[Fullscreen, Zoom]}
      />
    </div>
  );
}

export default GalleryImages;
