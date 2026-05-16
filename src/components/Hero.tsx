import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import wilfredVideo from '@/assets/wilfred.mp4';

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden text-[#FBF6EE] bg-[#120F0C] isolate">
      {/* Background video layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          className="absolute inset-x-0 -top-[8%] w-full h-[116%] object-cover opacity-[0.82]"
          style={{ filter: 'saturate(0.92) contrast(1.02) brightness(1.04)' }}
          src={wilfredVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        {/* Color blend overlay */}
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background: `
              radial-gradient(circle at 70% 32%, rgba(232, 128, 36, 0.16), transparent 36%),
              linear-gradient(90deg, rgba(18, 15, 12, 0.58), rgba(18, 15, 12, 0.22) 48%, rgba(18, 15, 12, 0.5)),
              linear-gradient(180deg, rgba(18, 15, 12, 0.16), transparent 42%, rgba(18, 15, 12, 0.78))
            `,
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 z-[3] opacity-[0.16]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(251,246,238,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(251,246,238,0.055) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(circle at 55% 50%, black, transparent 72%)',
            WebkitMaskImage: 'radial-gradient(circle at 55% 50%, black, transparent 72%)',
          }}
        />
      </div>

      {/* Content wrap */}
      <div className="relative z-10 min-h-screen max-w-[1440px] mx-auto px-6 lg:px-10 pt-32 lg:pt-36 pb-24 lg:pb-28 flex flex-col justify-between gap-24">
        {/* Topline */}
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          <div className="flex flex-col gap-[0.45rem]">
            <span className="inline-flex items-center gap-2 text-[0.76rem] font-extrabold tracking-[0.14em] uppercase text-[#FBF6EE]/55">
              <MessageCircle className="h-3.5 w-3.5" />
              Your AI Assistant on Telegram
            </span>
          </div>
        </div>

        {/* Bottom split */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.55fr)] gap-10 lg:gap-16 items-end">
          {/* Headline */}
          <h1
            className="m-0 max-w-[980px] font-medium text-[#FBF6EE]"
            style={{
              fontSize: 'clamp(3.2rem, 8vw, 8.4rem)',
              lineHeight: 1.03,
              letterSpacing: '-0.085em',
            }}
          >
            Meet Wilfred.{' '}
            <span className="bg-gradient-to-r from-accent via-orange-400 to-orange-500 bg-clip-text text-transparent">
              Your Personal AI.
            </span>
          </h1>

          {/* Side column */}
          <div className="max-w-[440px] lg:justify-self-end">
            <p className="text-2xl md:text-[1.6rem] text-[#FBF6EE] font-light leading-snug mb-4">
              One message away from getting things done.
            </p>
            <p className="text-[1.06rem] leading-[1.7] text-[#FBF6EE]/80 mb-7">
              Tasks, emails, calendar, expenses — all managed through Telegram.
              Just tell Wilfred what you need.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white font-semibold tracking-wide h-12 px-6 rounded-md shadow-2xl shadow-accent/30"
                asChild
              >
                <Link to="/call-to-action">
                  Get Wilfred Now
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border border-[#FBF6EE]/25 bg-[#120F0C]/40 backdrop-blur-md text-[#FBF6EE] hover:bg-[#FBF6EE]/10 hover:text-[#FBF6EE] hover:border-[#FBF6EE]/40 font-semibold tracking-wide h-12 px-6 rounded-md"
                asChild
              >
                <Link to="/case-studies">
                  See How It Works
                </Link>
              </Button>
            </div>

            {/* Feature chips */}
            <div className="flex flex-wrap gap-2.5 mt-7">
              {[
                { emoji: "✅", label: "Task Management" },
                { emoji: "📅", label: "Calendar Events" },
                { emoji: "📧", label: "Email & Gmail" },
                { emoji: "👥", label: "Contacts" },
                { emoji: "💵", label: "Expense Tracking" },
              ].map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-[#FBF6EE]/15 bg-[#120F0C]/50 backdrop-blur-md text-[0.7rem] font-extrabold tracking-[0.08em] uppercase text-[#FBF6EE]/70"
                >
                  <span className="text-sm">{item.emoji}</span>
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
