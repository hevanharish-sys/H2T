import React, { useState } from "react";
import { cn } from "../../lib/utils";

const MarqueeCarousel = () => {
  const [stopScroll, setStopScroll] = useState(false);

  const cardData = [
    {
      title: "Unlock Your Creative Flow",
      image:
        "https://images.unsplash.com/photo-1543487945-139a97f387d5?w=1200&auto=format&fit=crop&q=60",
    },
    {
      title: "Design Your Digital Future",
      image:
        "https://images.unsplash.com/photo-1529254479751-faeedc59e78f?w=1200&auto=format&fit=crop&q=60",
    },
    {
      title: "Build with Passion, Ship with Pride",
      image:
        "https://images.unsplash.com/photo-1618327907215-4e514efabd41?w=1200&auto=format&fit=crop&q=60",
    },
    {
      title: "Think Big, Code Smart",
      image:
        "https://images.unsplash.com/photo-1583407723467-9b2d22504831?w=1200&auto=format&fit=crop&q=60",
    },
    {
      title: "Immersive Experiences",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&auto=format&fit=crop&q=60",
    },
  ];

  return (
    <section className="py-20 bg-black overflow-hidden select-none">
      <style>{`
        .marquee-inner {
          animation: marqueeScroll linear infinite;
        }

        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }

          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setStopScroll(true)}
        onMouseLeave={() => setStopScroll(false)}
      >
        {/* Gradients to fade edges */}
        <div className="absolute left-0 top-0 h-full w-24 md:w-48 z-10 pointer-events-none bg-gradient-to-r from-black via-black/40 to-transparent" />

        <div
          className="marquee-inner flex w-fit"
          style={{
            animationPlayState: stopScroll ? "paused" : "running",
            animationDuration: cardData.length * 5000 + "ms",
          }}
        >
          <div className="flex">
            {[...cardData, ...cardData].map((card, index) => (
              <div
                key={index}
                className="w-64 md:w-80 mx-4 h-[25rem] md:h-[30rem] relative group cursor-pointer overflow-hidden rounded-[2.5rem] border border-white/10"
              >
                <img
                  src={card.image}
                  alt="card"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-4 text-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                  </div>
                  <p className="text-white text-xl md:text-2xl font-black font-clash uppercase leading-tight">
                    {card.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute right-0 top-0 h-full w-24 md:w-48 z-10 pointer-events-none bg-gradient-to-l from-black via-black/40 to-transparent" />
      </div>
    </section>
  );
};

export default MarqueeCarousel;
