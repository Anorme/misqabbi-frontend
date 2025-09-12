# CategoryList Component

## Overview

The `CategoryList` component renders a responsive carousel of category cards. It ensures that only fully visible cards are rendered at a time, eliminating horizontal scroll and allowing navigation strictly via arrow buttons.

## Key Features

- Dynamically calculates how many cards can fit in the container (`visibleCount`)
- Renders only fully visible cards based on `currentIndex` and `visibleCount`
- Prevents partial card rendering and horizontal overflow
- Enables navigation using left/right arrows
- Disables arrows when at the start or end of the carousel
- Recalculates layout on window resize

## Ref Usage

The component uses two `useRef` hooks to measure card and container widths:

### `containerRef`

- Attached to the outer carousel container
- Used to measure the available horizontal space

### `cardRef`

- Attached to two elements:
  1. A hidden card rendered absolutely and invisibly
  2. The first visible card in the carousel
- This dual attachment ensures:
  - `cardRef.current` is available on initial render (via hidden card)
  - Accurate width measurement once visible cards are rendered

React will update `cardRef.current` to the last rendered element with the ref, ensuring correct measurement.

## Responsive Behavior

- A `resize` event listener is registered via `useEffect` to recalculate `visibleCount` when the window size changes
- A secondary `useEffect` ensures `currentIndex` is adjusted if the new `visibleCount` would cause overflow

## Navigation Logic

- Left arrow is disabled when `currentIndex === 0`
- Right arrow is disabled when `currentIndex + visibleCount >= categories.length`
- Arrows update `currentIndex` in increments of `visibleCount` to maintain consistent rendering

## Dependencies

- React (`useState`, `useEffect`, `useRef`)
- `CategoryCard` component (used to render each category)
