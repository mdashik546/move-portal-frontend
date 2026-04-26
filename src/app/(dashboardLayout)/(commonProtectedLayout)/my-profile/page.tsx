import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getUserInfo } from "@/services/auth.service";

const MyProfilePage = async () => {
  const user = await getUserInfo();

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-lg shadow-xl border border-border bg-background/60 backdrop-blur">
        {/* HEADER */}
        <CardHeader className="flex flex-col items-center gap-3 text-center">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={
                user?.image ||
                user?.admin?.profilePicture ||
                `https://ui-avatars.com/api/?name=${user.name}`
              }
              alt={user.name}
            />
            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
          </Avatar>

          <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>

          <CardDescription>{user.email}</CardDescription>

          {/* ROLE BADGE */}
          <div className="flex gap-2">
            <Badge variant="secondary">{user.role}</Badge>

            <Badge
              variant={user.status === "ACTIVE" ? "default" : "destructive"}
            >
              {user.status}
            </Badge>
          </div>
        </CardHeader>

        {/* CONTENT */}
        <CardContent className="space-y-4 text-sm">
          {/* SUBSCRIPTION */}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subscription</span>
            <span>{user.isSubscribed ? "Active ✅" : "Free User"}</span>
          </div>

          {/* EMAIL VERIFIED */}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email Status</span>
            <span>
              {user.emailVerified ? "Verified ✅" : "Not Verified ❌"}
            </span>
          </div>

          {/* CREATED DATE */}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Joined</span>
            <span>{new Date(user.createdAt).toLocaleDateString()}</span>
          </div>

          {/* USER ID (optional) */}
          <div className="flex justify-between">
            <span className="text-muted-foreground">User ID</span>
            <span className="truncate max-w-45">{user.id}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyProfilePage;
