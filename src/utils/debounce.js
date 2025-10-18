import { useEffect, useRef } from 'react';

/**
 * Custom hook for debouncing values
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in milliseconds
 * @param {function} callback - Optional callback to execute when debounced value changes
 * @returns {any} The debounced value
 */
export const useDebounce = (value, delay, callback) => {
  const timeoutRef = useRef(null);
  const debouncedValueRef = useRef(value);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      debouncedValueRef.current = value;
      if (callback) {
        callback(value);
      }
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay, callback]);

  return debouncedValueRef.current;
};

/**
 * Higher-order function that debounces a function call
 * @param {function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {function} Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

export default useDebounce;
