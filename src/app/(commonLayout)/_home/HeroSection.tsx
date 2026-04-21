// "use client";

// import { Play, Info } from "lucide-react";

// export function HeroSection() {
//   return (
//     <section className="relative h-screen w-full overflow-hidden pt-16">
//       {/* Background Image with Gradient Overlay */}
//       <div className="absolute inset-0">
//         <div
//           className="absolute inset-0 bg-cover bg-center"
//           style={{
//             backgroundImage:
//               "linear-gradient(135deg, #e50914 0%, #831010 50%, #000000 100%)",
//           }}
//         />
//         <div className="absolute inset-0 bg-linear-to-r from-black via-black/40 to-transparent" />
//       </div>
//       {/* Content */}
//       <div className="relative z-10 flex h-full flex-col justify-center px-4 sm:px-6 lg:px-0 app-container">
//         <div>
//           {/* Badge */}
//           <div className="mb-4 inline-block rounded bg-primary/20 px-3 py-1 text-sm font-bold uppercase tracking-wider text-primary">
//             Now Streaming
//           </div>

//           {/* Title */}
//           <h1 className="mb-4 text-5xl font-black text-white md:text-7xl lg:text-8xl">
//             Dark Horizon
//           </h1>

//           {/* Description */}
//           <p className="mb-8 max-w-xl text-lg text-gray-200 md:text-xl">
//             Experience an intense action-packed journey filled with high-stakes
//             missions, powerful enemies, and cinematic storytelling that keeps
//             you on the edge of your seat.
//           </p>

//           {/* Buttons */}
//           <div className="flex flex-col gap-4 sm:flex-row">
//             <button className="flex items-center justify-center gap-2 rounded-md bg-white px-8 py-3 font-bold text-black transition-all hover:bg-gray-200 active:scale-95">
//               Play
//             </button>

//             <button className="flex items-center justify-center gap-2 rounded-md bg-gray-600/50 px-8 py-3 font-bold text-white transition-all hover:bg-gray-600/70 active:scale-95">
//               More Info
//             </button>
//           </div>
//         </div>
//       </div>
//       {/* Scroll Indicator */}
//       <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white">
//         <svg
//           className="h-6 w-6"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M19 14l-7 7m0 0l-7-7m7 7V3"
//           />
//         </svg>
//       </div>
//     </section>
//   );
// }

"use client";

import { useState, useRef } from "react";
import { Play, Plus, Star, Award, Zap } from "lucide-react";

 function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  // Mouse tracking logic for the unique gradient overlay
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const metadata = [
    { label: "Rated", value: "9.8", icon: <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> },
    { label: "Year", value: "2024", icon: null },
    { label: "Genre", value: "Sci-Fi", icon: null },
    { label: "Format", value: "8K HDR", icon: <Zap className="h-3 w-3 text-emerald-400" /> },
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative h-[90vh] w-full overflow-hidden bg-black text-white group"
      onMouseMove={handleMouseMove}
    >
      {/* 1. LAYER ONE: Primary Cinematic Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[15s] ease-linear scale-100 group-hover:scale-110"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        {/* Deep, dynamic shadow overlays for maximum immersion */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.9)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black to-transparent" />
      </div>

      {/* 2. LAYER TWO: Interactive Spotlight Gradient (Unique Effect) */}
      <div 
        className="absolute inset-0 z-10 opacity-60 mix-blend-soft-light transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(229,9,20,0.3), transparent 80%)`
        }}
      />

      {/* 3. LAYER THREE: Decorative Dynamic Elements (Unique Particles) */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <div className="absolute -left-20 top-1/4 h-32 w-32 rounded-full bg-primary/20 blur-[100px] animate-pulse" />
        <div className="absolute -right-40 bottom-1/4 h-64 w-64 rounded-full bg-primary/10 blur-[150px] animate-pulse delay-700" />
      </div>

      {/* 4. CONTENT LAYER: Asymmetric and Refined Typography */}
      <div className="relative z-20 flex h-full max-w-350 mx-auto items-center px-6 lg:px-16">
        <div className="w-full lg:w-[60%] space-y-10">
          
          {/* Asymmetric "Badge" Row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-1.5 rounded-full bg-white/5 px-4 py-1.5 ring-1 ring-white/10 text-xs font-bold text-zinc-300">
               <Award className="h-4 w-4 text-amber-500" />
               Critical Acclaim
            </div>
            {metadata.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-medium text-zinc-500 uppercase tracking-[0.2em]">
                {i > 0 && <span className="opacity-30">•</span>}
                {item.icon}
                <span className="text-zinc-400 font-bold">{item.value}</span>
                <span className="lowercase">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Aggressive, Stylized Title Block */}
          <div className="relative space-y-1">
             <span className="absolute -left-12 top-0 text-[10px] font-black uppercase tracking-[0.5em] [writing-mode:vertical-lr] text-primary animate-pulse hidden lg:block">Now Streaming</span>
             <p className="text-sm font-bold uppercase tracking-[0.3em] text-zinc-500">Genesis Originals Presents</p>
             <h1 className="text-6xl font-black italic tracking-tight text-white md:text-8xl xl:text-9xl uppercase leading-[0.85] [font-kerning:none]">
              Dark Horizon
            </h1>
          </div>

          {/* Immersive Action Row with Unique Micro-Interactions */}
          <div className="flex flex-wrap items-center gap-6 pt-6">
            <button className="relative group flex items-center justify-center gap-4 overflow-hidden sm:rounded-xl rounded-lg bg-white sm:px-12 px-5 sm:py-5 py-3 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-primary active:scale-95 shadow-xl shadow-white/5">
              {/* Background gradient transition on hover */}
              <div className="absolute inset-0 bg-linear-to-r from-red-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Scale animation on the play icon */}
              <Play className="relative z-10 h-5 w-5 fill-current transition-transform duration-300 group-hover:scale-125" />
              <span className="relative z-10 group-hover:text-white transition-colors">Start Film</span>
            </button>

            <button className="flex items-center justify-center gap-4 sm:rounded-xl rounded-lg border border-white/5 bg-zinc-950/50 sm:px-10 px-5 sm:py-5 py-3 text-sm font-black uppercase tracking-widest text-white backdrop-blur-lg transition-all hover:bg-white/5 active:scale-95 hover:border-white/10">
              <Plus className="h-5 w-5" />
              My List
            </button>
          </div>
        </div>
      </div>

      {/* Unique Bottom Border Detail (Progress Bar Look) */}
      <div className="absolute bottom-0 left-0 h-1.5 w-full bg-zinc-900 overflow-hidden">
        <div className="h-full w-2/3 bg-linear-to-r from-primary to-red-800 animate-pulse" />
      </div>
    </section>
  );
}
export default HeroSection