"use client";

import LoadingState from "@/components/shared/Loading";
import { Card, CardContent } from "@/components/ui/card";
import { getIconComponent } from "@/lib/iconMapper";
import { getAllStats } from "@/services/stats.service";
import { useQuery } from "@tanstack/react-query";
interface Stat {
  label: string;
  value: number;
  icon: string;
}
const UserDashboardStats = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: getAllStats,
  });

  if (isLoading) return <LoadingState />;
  const dashboardData: Stat[] = data?.data?.data ?? [];
  console.log(dashboardData);
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-bold">
          User Dashboard
        </p>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight">
          Your Activity Overview
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.map((item, i) => {
          const Icon = getIconComponent(item.icon);

          return (
            <Card
              key={i}
              className="bg-zinc-950 border border-zinc-800 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400 font-medium">
                    {item.label}
                  </p>
                  <h2 className="text-3xl font-black mt-2">{item.value}</h2>
                </div>

                <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {Icon && <Icon className="h-6 w-6 text-amber-500" />}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
          <ul className="space-y-3 text-sm text-zinc-400">
            <li>✔ Purchased &quot;Inception&quot; movie</li>
            <li>✔ Added &quot;Interstellar&quot; to watchlist</li>
            <li>✔ Watched &quot;Avengers&quot; Endgame</li>
          </ul>
        </div>

        {/* Subscription */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-4">Subscription Status</h3>
          <p className="text-zinc-400 text-sm">
            Premium active until{" "}
            <span className="text-white font-bold">Dec 2026</span>
          </p>
          <div className="mt-4 h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full w-[70%] bg-amber-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardStats;
