import { Film, Code2, Globe2, Sparkles, Users2, Rocket } from "lucide-react";

const About = () => {
  const stats = [
    { label: "Premium Movies", value: "500+", icon: Film },
    { label: "Active Users", value: "10k+", icon: Users2 },
    { label: "Global Reach", value: "20+", icon: Globe2 },
  ];

  return (
    <div className="min-h-screen bg-black text-white py-40 px-4">
      <div className="max-w-6xl mx-auto">
        {/* --- Hero Header --- */}
        <div className="text-center mb-20">
          <h2 className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-4">
            Our Story
          </h2>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            REDEFINING THE <br />
            <span className="text-zinc-500">CINEMATIC EXPERIENCE</span>
          </h1>
          <p className="max-w-2xl mx-auto text-zinc-400 leading-relaxed text-lg">
            We are more than just a streaming platform. We are a bridge between
            masterpiece storytelling and the viewers who crave high-quality
            cinematic journeys.
          </p>
        </div>

        {/* --- Content Grid --- */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-amber-500 to-yellow-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Code2 className="text-amber-500" /> The Vision
              </h3>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                Built with the latest technologies like{" "}
                <strong>Next.js 14, TypeScript, and Prisma</strong>, our portal
                ensures a seamless, lightning-fast streaming experience. Our
                mission is to provide an interface that is as premium as the
                movies we host.
              </p>
              <ul className="space-y-3">
                {[
                  "Ultra HD Streaming",
                  "Secure Stripe Payments",
                  "Personalized Watchlists",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-zinc-300"
                  >
                    <Sparkles className="h-4 w-4 text-amber-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold leading-snug">
              Why Choose{" "}
              <span className="text-amber-500 text-shadow-glow">
                Our Portal?
              </span>
            </h2>
            <p className="text-zinc-400">
              In a world full of clutter, we focus on quality over quantity.
              Every movie in our premium vault is hand-picked to ensure you get
              the best drama, action, and storytelling available.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-amber-500 hover:text-black transition-all">
                Get Started
              </button>
              <button className="border border-zinc-700 px-8 py-3 rounded-full font-bold hover:bg-zinc-800 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* --- Stats Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-zinc-900/30 border border-zinc-800/50 p-8 rounded-3xl text-center hover:border-amber-500/30 transition-colors"
            >
              <stat.icon className="h-8 w-8 text-amber-500 mx-auto mb-4" />
              <div className="text-4xl font-black mb-2">{stat.value}</div>
              <div className="text-zinc-500 uppercase tracking-widest text-xs font-bold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* --- Footer Note --- */}
        <div className="mt-20 text-center border-t border-zinc-900 pt-10">
          <p className="text-zinc-600 flex items-center justify-center gap-2 text-sm italic">
            <Rocket className="h-4 w-4" /> Powering the future of independent
            cinema.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
