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
const AdminDashboardStats = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: getAllStats,
  });

  if (isLoading) return <LoadingState />;
  const dashboardData: Stat[] = data?.data?.data ?? [];
  return (
    <div>
      {" "}
      <div className="min-h-screen bg-black text-white p-6 md:p-10">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-zinc-500 mt-2 text-sm">
            Overview of platform performance
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardData?.map((item, i) => {
            const Icon = getIconComponent(item.icon);

            return (
              <Card
                key={i}
                className="bg-zinc-950 border border-zinc-800 hover:border-amber-500/40 transition-all"
              >
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-zinc-400 text-sm font-medium">
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
      </div>
    </div>
  );
};

export default AdminDashboardStats;
