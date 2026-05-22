"use client";
import React, { useEffect, useRef, useState } from "react";

interface AnimatedFooterLinesProps {
  barCount?: number;
}

export const AnimatedFooterLines: React.FC<AnimatedFooterLinesProps> = ({
  barCount = 23,
}) => {
  const waveRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let t = 0;

    const animateWave = () => {
      const waveElements = waveRefs.current;
      let offset = 0;

      waveElements.forEach((element, index) => {
        if (element) {
          offset += Math.max(0, 20 * Math.sin((t + index) * 0.3));
          element.style.transform = `translateY(${index + offset}px)`;
        }
      });

      t += 0.1;
      animationFrameRef.current = requestAnimationFrame(animateWave);
    };

    if (isVisible) {
      animateWave();
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      id="waveContainer"
      aria-hidden="true"
      className="w-full z-10 pointer-events-none mt-8"
      style={{ overflow: "hidden", height: 200 }}
    >
      <div style={{ marginTop: 0 }}>
        {Array.from({ length: barCount }).map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              waveRefs.current[index] = el;
            }}
            className="wave-segment"
            style={{
              height: `${(index + 1) * 2}px`,
              backgroundColor: "rgb(255, 255, 255)", 
              transition: "transform 0.1s ease",
              willChange: "transform",
              marginTop: "-2px",
            }}
          />
        ))}
      </div>
    </div>
  );
};

