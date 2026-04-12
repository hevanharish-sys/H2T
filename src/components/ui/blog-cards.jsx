import { cn } from "../../lib/utils";
import { useState } from "react";

const BlogCards = () => {
  return (
    <section className="py-24 bg-black border-t border-white/[0.03]">
      {/* Кonтейнер с колонкой */}
      <div className="flex flex-col items-center w-full container mx-auto px-4">
        {/* Заголовок сверху */}
        <div className="text-center mb-16">
          <p className="text-[#3B82F6] font-bold text-xs tracking-[0.4em] uppercase mb-4 opacity-70">Insights</p>
          <h2 className="text-4xl md:text-6xl font-black text-white font-clash uppercase tracking-tight">
            Latest <span className="text-[#3B82F6]">Blog</span>
          </h2>
          <p className="text-gray-400 mt-6 max-w-lg mx-auto text-lg">
            Stay ahead of the curve with fresh content on code, design, startups, and everything in between.
          </p>
        </div>

        {/* Карточки */}
        <div className="mt-10 flex flex-wrap justify-center gap-12">
          <div className="max-w-xs w-full group hover:-translate-y-2 transition duration-500">
            <div className="overflow-hidden rounded-3xl border border-white/10 aspect-[4/3]">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?w=1200&h=800&auto=format&fit=crop&q=60"
                alt="UI/UX design"
              />
            </div>
            <h3 className="text-xl text-white font-black font-clash mt-6 leading-tight group-hover:text-[#3B82F6] transition-colors">
              Color Psychology in UI: How to Choose the Right Palette
            </h3>
            <p className="text-xs text-[#3B82F6] font-bold uppercase tracking-widest mt-3">UI/UX design</p>
          </div>

          <div className="max-w-xs w-full group hover:-translate-y-2 transition duration-500">
            <div className="overflow-hidden rounded-3xl border border-white/10 aspect-[4/3]">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://images.unsplash.com/photo-1714974528646-ea024a3db7a7?w=1200&h=800&auto=format&fit=crop&q=60"
                alt="Branding"
              />
            </div>
            <h3 className="text-xl text-white font-black font-clash mt-6 leading-tight group-hover:text-[#3B82F6] transition-colors">
              Understanding Typography: Crafting a Visual Voice for Your Brand
            </h3>
            <p className="text-xs text-[#3B82F6] font-bold uppercase tracking-widest mt-3">Branding</p>
          </div>

          <div className="max-w-xs w-full group hover:-translate-y-2 transition duration-500">
            <div className="overflow-hidden rounded-3xl border border-white/10 aspect-[4/3]">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://images.unsplash.com/photo-1713947501966-34897f21162e?w=1200&h=800&auto=format&fit=crop&q=60"
                alt="Product Design"
              />
            </div>
            <h3 className="text-xl text-white font-black font-clash mt-6 leading-tight group-hover:text-[#3B82F6] transition-colors">
              Design Thinking in Practice: How to Solve Real User Problems
            </h3>
            <p className="text-xs text-[#3B82F6] font-bold uppercase tracking-widest mt-3">Product Design</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogCards;
