import { ReactNode, useEffect, useRef } from "react";

export default function InfiniteScrollingTriggerBoundary({
  children,
  onBottomReachedFn,
}: {
  children: ReactNode;
  onBottomReachedFn: () => void;
}) {
  const infiniteScrollingTriggerElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onBottomReachedFn();
          }
        });
      },
      { threshold: 0.5, rootMargin: "300px" },
    );

    observer.observe(infiniteScrollingTriggerElRef.current!);

    return () => {
      observer.disconnect();
    };
  }, [onBottomReachedFn]);

  return (
    <div>
      {children}
      <div ref={infiniteScrollingTriggerElRef} />
    </div>
  );
}
