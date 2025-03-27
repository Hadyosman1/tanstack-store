import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeOutId = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [value, delay]);

  return debouncedValue;
}
