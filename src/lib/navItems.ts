import { NavSection } from "@/types/dashboard.types";
import { getDefaultDashboardRoute, UserRole } from "./authUtlis";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);
  return [
    {
      items: [
        {
          title: "Home",
          href: "/",
          icon: "Home",
        },
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
        },
        {
          title: "My Profile",
          href: `/my-profile`,
          icon: "User",
        },
      ],
    },
    {
      title: "Account Settings",
      items: [
        {
          title: "Change Password",
          href: "/change-password",
          icon: "Lock",
        },
      ],
    },
  ];
};

export const adminNavItems: NavSection[] = [
  {
    title: "Movie Management",
    items: [
      {
        title: "All Movies",
        href: "/admin/dashboard/movies-management",
        icon: "Film",
      },
      {
        title: "Add New Movie",
        href: "/admin/dashboard/add-movie",
        icon: "PlusSquare",
      },
    ],
  },
  {
    title: "System Management",
    items: [
      {
        title: "Manage Users",
        href: "/admin/dashboard/users-management",
        icon: "Users",
      },
      {
        title: "Sales & Payments",
        href: "/admin/dashboard/payments",
        icon: "DollarSign",
      },
    ],
  },
];

export const userNavItems: NavSection[] = [
  {
    title: "Personal Space",
    items: [
      {
        title: "My Watchlist",
        href: "/dashboard/my-watchlist",
        icon: "ListVideo",
      },
      {
        title: "Purchased Movies",
        href: "/dashboard/my-purchases",
        icon: "PlayCircle",
      },
      {
        title: "Subscription Plan",
        href: "/dashboard/subscription",
        icon: "CreditCard",
      },
    ],
  },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case UserRole.ADMIN:
      return [...commonNavItems, ...adminNavItems];

    case UserRole.USER:
      return [...commonNavItems, ...userNavItems];

    default:
      return commonNavItems;
  }
};
