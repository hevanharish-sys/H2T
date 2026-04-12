"use client";
import React, { useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "./card";
import { Sparkles as SparklesComp } from "./sparkles";
import { TimelineContent } from "./timeline-animation";
import { VerticalCutReveal } from "./vertical-cut-reveal";
import { cn } from "../../lib/utils";
import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


import ElectricBorder from "./ElectricBorder";

const agencyPlans = [
  {
    name: "Starter",
    description: "Essential nodes for individuals and emerging brands starting their digital journey.",
    prices: {
      INR: 14999,
      USD: 179
    },
    buttonText: "Initiate Protocol",
    buttonVariant: "outline",
    includes: [
      "Starter Pack:",
      "Logo Design",
      "Social Media Kit",
      "Basic Website Design (up to 5 pages)",
    ],
  },
  {
    name: "Elite",
    description: "Comprehensive digital ecosystem with bespoke branding and ongoing tactical support.",
    prices: {
      INR: "Custom",
      USD: "Custom"
    },
    buttonText: "Go Elite",
    buttonVariant: "outline",
    href: "/project-estimation",
    includes: [
      "Elite Grade:",
      "Complete Branding Package",
      "Custom Website Design (Unlimited pages)",
      "Comprehensive Social Media Kit",
      "Ongoing Support for 1 Month",
    ],
  },
  {
    name: "Growth",
    description: "Enhanced architecture for businesses ready to scale their digital presence with focus on conversion.",
    prices: {
      INR: 39999,
      USD: 479
    },
    buttonText: "Scale Now",
    buttonVariant: "default",
    popular: true,
    includes: [
      "Growth Pack:",
      "Advanced Logo Design",
      "Responsive Website Design (up to 10 pages)",
      "Social Media Kit + Banner Designs",
      "Basic SEO Setup",
    ],
  },
];

const ToggleSwitch = ({ onSwitch, options, selected }) => {
  return (
    <div className="flex justify-center">
      <div className="relative z-10 mx-auto flex w-fit rounded-full bg-neutral-900 border border-white/10 p-1">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSwitch(opt.value)}
            className={cn(
              "relative z-10 w-fit h-10 rounded-full sm:px-8 px-4 sm:py-2 py-1 font-bold text-[10px] uppercase tracking-[0.2em] transition-colors",
              selected === opt.value ? "text-black" : "text-white/40 hover:text-white/70",
            )}
          >
            {selected === opt.value && (
              <motion.span
                layoutId={`switch-${options[0].label}`}
                className="absolute inset-0 rounded-full bg-white shadow-xl"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-20">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default function AgencyPricingSection() {
  const [currency, setCurrency] = useState('INR');
  const [tier, setTier] = useState('0'); // 0: Standard, 1: Enterprise (Optional toggle, but currency is priority)
  const pricingRef = useRef(null);

  const revealVariants = {
    visible: (i) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
    hidden: {
      filter: "blur(8px)",
      y: 30,
      opacity: 0,
    },
  };

  return (
    <div
      className="min-h-screen mx-auto relative bg-[#0A0A0A] overflow-x-hidden py-32"
      ref={pricingRef}
      id="pricing"
    >
      <TimelineContent
        animationNum={4}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="absolute top-0 left-0 h-96 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] "
      >
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:70px_80px] "></div>
        <SparklesComp
          density={1200}
          direction="bottom"
          speed={0.5}
          color="#FFFFFF"
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
        />
      </TimelineContent>

      <article className="text-center mb-16 max-w-3xl mx-auto space-y-8 relative z-50 px-6">
        <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.15}
            staggerFrom="first"
            reverse={true}
            containerClassName="justify-center"
          >
            Engagement Tiers
          </VerticalCutReveal>
        </h2>

        <TimelineContent
          as="p"
          animationNum={0}
          timelineRef={pricingRef}
          className="text-neutral-500 text-lg font-medium tracking-tight"
        >
          Select your node of entry into the H2T ecosystem.
        </TimelineContent>

        <TimelineContent
          as="div"
          animationNum={1}
          timelineRef={pricingRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <ToggleSwitch 
            selected={currency} 
            onSwitch={setCurrency} 
            options={[
              { label: 'INR', value: 'INR' },
              { label: 'USD', value: 'USD' }
            ]} 
          />
        </TimelineContent>
      </article>

      <div
        className="absolute top-0 left-[10%] right-[10%] w-[80%] h-full z-0 pointer-events-none"
        style={{
          backgroundImage: `
        radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)
      `,
          mixBlendMode: "screen",
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 max-w-7xl gap-6 px-6 mx-auto relative z-10">
        {agencyPlans.map((plan, index) => {
          const isCustom = typeof plan.prices[currency] === 'string';
          const isElite = plan.name === 'Elite';
          
          const cardContent = (
            <Card
              className={cn(
                "relative h-full flex flex-col text-white border-white/5 transition-all duration-700 bg-[#0F0F0F] rounded-[3rem] overflow-hidden group hover:border-white/10",
                plan.popular && "border-white/20 shadow-[0_0_80px_rgba(255,255,255,0.05)] bg-[#141414]",
                isElite && "border-blue-500/20"
              )}
            >
              <CardHeader className="text-left p-10 pb-6 border-b border-white/5">
                <div className="flex justify-between items-start mb-8">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">{plan.name}</h3>
                  {plan.popular && (
                    <span className="px-5 py-2 rounded-full bg-white text-[9px] text-black font-black uppercase tracking-widest shadow-xl">Preferred Tier</span>
                  )}
                </div>
                <div className="flex items-baseline mb-6">
                  {isCustom ? (
                    <span className="text-5xl font-black font-serif-display tracking-tighter">Custom</span>
                  ) : (
                    <>
                      <span className="text-5xl font-black font-serif-display tracking-tighter shadow-white/5">
                        {currency === 'INR' ? '₹' : '$'}
                        <NumberFlow
                          value={plan.prices[currency]}
                          className="text-5xl font-black"
                        />
                      </span>
                      <span className="text-neutral-500 text-[10px] font-black ml-3 uppercase tracking-widest opacity-60">
                        / start
                      </span>
                    </>
                  )}
                </div>
                <p className="text-neutral-500 text-sm font-medium leading-relaxed min-h-[3rem]">{plan.description}</p>
              </CardHeader>

              <CardContent className="p-10 flex flex-col flex-grow">
                {plan.href ? (
                  <Link
                    to={plan.href}
                    className={cn(
                      "w-full mb-10 py-6 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center",
                      plan.popular
                        ? "bg-white text-black hover:scale-[1.02] shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                        : "bg-[#1A1A1A] text-white border border-white/10 hover:border-white/30 hover:bg-[#252525]",
                      isElite && "border-blue-500/30 hover:border-blue-500/50"
                    )}
                  >
                    {plan.buttonText}
                  </Link>
                ) : (
                  <button
                    className={cn(
                      "w-full mb-10 py-6 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all",
                      plan.popular
                        ? "bg-white text-black hover:scale-[1.02] shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                        : "bg-[#1A1A1A] text-white border border-white/10 hover:border-white/30 hover:bg-[#252525]",
                      isElite && "border-blue-500/30 hover:border-blue-500/50"
                    )}
                  >
                    {plan.buttonText}
                  </button>
                )}

                <div className="space-y-6 flex-grow">
                  <h4 className="text-[9px] font-black uppercase tracking-[0.3em] opacity-20">
                    {plan.includes[0]}
                  </h4>
                  <ul className="space-y-5">
                    {plan.includes.slice(1).map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-5 translate-x-0 transition-transform hover:translate-x-2"
                      >
                        <div className={cn(
                          "h-1 w-1 bg-white rounded-full opacity-40 shadow-[0_0_8px_white]",
                          isElite && "bg-blue-400 opacity-60 shadow-[0_0_8px_#3B82F6]"
                        )} />
                        <span className="text-sm font-bold text-neutral-400 group-hover:text-neutral-200 transition-colors">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          );
          
          return (
            <TimelineContent
              key={plan.name}
              as="div"
              animationNum={2 + index}
              timelineRef={pricingRef}
              customVariants={revealVariants}
            >
              {isElite ? (
                <ElectricBorder 
                  color="#3B82F6" 
                  borderRadius={48}
                  className="h-full"
                >
                  {cardContent}
                </ElectricBorder>
              ) : (
                cardContent
              )}
            </TimelineContent>
          );
        })}
      </div>

      <div className="mt-20 text-center relative z-10">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-600">
          All deployments include worldwide edge delivery & security audit
        </p>
      </div>
    </div>
  );
}

