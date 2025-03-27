import { ReactNode, useEffect, useRef } from "react";

interface InfiniteScrollingTriggerBoundaryProps {
  children: ReactNode;
  onBottomReached: () => void;
  threshold?: number;
  rootMargin?: string;
  root?: Element | null;
}

export default function InfiniteScrollingTriggerBoundary({
  children,
  onBottomReached,
  threshold,
  rootMargin,
  root,
}: InfiniteScrollingTriggerBoundaryProps) {
  const infiniteScrollingTriggerElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onBottomReached();
          }
        });
      },
      { threshold, rootMargin, root },
    );

    observer.observe(infiniteScrollingTriggerElRef.current!);

    return () => {
      observer.disconnect();
    };
  }, [onBottomReached, threshold, rootMargin, root]);

  return (
    <>
      {children}
      <div ref={infiniteScrollingTriggerElRef} />
    </>
  );
}
