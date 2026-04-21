import { Clapperboard, MonitorPlay, Languages, Download } from "lucide-react";

const MovieInfoSection = () => {
  const highlights = [
    {
      title: "4K Ultra HD",
      description:
        "Experience cinema-grade resolution with HDR10 support on all your favorite premium titles.",
      icon: <MonitorPlay className="h-6 w-6 text-amber-500" />,
    },
    {
      title: "Curated Collections",
      description:
        "Hand-picked movies from indie gems to blockbuster hits, organized by mood and genre.",
      icon: <Clapperboard className="h-6 w-6 text-purple-500" />,
    },
    {
      title: "Global Subtitles",
      description:
        "Enjoy movies in their original glory with professional subtitles in over 20+ languages.",
      icon: <Languages className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Offline Viewing",
      description:
        "Take your movies on the go. Download content on your mobile device and watch anywhere.",
      icon: <Download className="h-6 w-6 text-emerald-500" />,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-4xl border border-white/5 bg-zinc-900/20 p-8 md:p-12">
          {/* Subtle Cinematic Light Effect */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-[80%] rounded-full bg-indigo-500/5 blur-[120px]" />

          <div className="relative z-10">
            <div className="mb-12">
              <h3 className="text-2xl font-black tracking-tight text-white md:text-4xl">
                The Ultimate{" "}
                <span className="text-amber-500">Viewing Experience</span>
              </h3>
              <p className="mt-2 text-zinc-500 text-sm font-medium uppercase tracking-[0.3em]">
                Engineered for Movie Lovers
              </p>
            </div>

            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
              {highlights.map((item, index) => (
                <div key={index} className="flex flex-col gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800/50 ring-1 ring-white/10 shadow-inner">
                    {item.icon}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-white tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-zinc-500 font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieInfoSection;
