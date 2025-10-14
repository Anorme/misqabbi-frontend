# Orders components

This folder contains modular, focused components for the Orders feature.

- StatusBadge: maps order status to color tokens.
- OrderItems: renders expanded order lines; formats currency in GHC.
- OrderRow: compact header with expand/collapse and CTA.
- OrderList: maps orders to OrderRow items.
- PaginationLocal: prev/next controls without global context.
- ProgressBar: horizontal progress indicator with purple fill up to the active step.
- SeparatorLoader: subtle section loader/separator with minimal animation.

Notes

- Currency uses GHC via Intl.NumberFormat; on unsupported locales, falls back to plain number.
- OrderDetails uses useMediaQuery to render a vertical timeline on mobile and a horizontal progress bar on desktop.
- Progress calculation: percent = activeIndex / (totalSteps - 1). This yields 0% at first step and 100% at last step.
