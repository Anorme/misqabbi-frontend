// Renders a horizontal progress bar that fills proportionally to the active step.
// totalSteps: total number of steps (>= 2)
// activeIndex: zero-based index of the current active step
// Accessibility: uses aria-valuenow/max
const ProgressBar = ({ totalSteps, activeIndex }) => {
  const safeTotal = Math.max(2, Number(totalSteps || 0));
  const safeIndex = Math.min(Math.max(0, Number(activeIndex || 0)), safeTotal - 1);
  const percent = (safeIndex / (safeTotal - 1)) * 100;

  return (
    <div
      className="relative"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={safeTotal - 1}
      aria-valuenow={safeIndex}
    >
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 rounded-full -translate-y-1/2" />
      <div
        className="absolute top-1/2 left-0 h-1 bg-msq-purple-rich rounded-full -translate-y-1/2 transition-all"
        style={{ width: `${percent}%` }}
      />
      {/* Spacer to preserve height */}
      <div className="h-2" />
    </div>
  );
};

export default ProgressBar;
