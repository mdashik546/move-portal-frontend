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
        href: "/admin/dashboard/movies",
        icon: "Film",
      },
      {
        title: "Add New Movie",
        href: "/admin/dashboard/add-movie",
        icon: "PlusSquare",
      },
    ],
  },
  // {
  //   title: "System Management",
  //   items: [
  //     {
  //       title: "Manage Users",
  //       href: "/admin/dashboard/users-management",
  //       icon: "Users",
  //     },
  //     {
  //       title: "Sales & Payments",
  //       href: "/admin/dashboard/payments",
  //       icon: "DollarSign",
  //     },
  //   ],
  // },
];

export const userNavItems: NavSection[] = [
  {
    title: "Personal Space",
    items: [
      {
        title: "My Library",
        href: "/dashboard/my-library",
        icon: "ListVideo",
      },
    ],
  },
];

export const getDashboardNavigationByRole = (role: UserRole): NavSection[] => {
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

export const getDefaultNavItemsByRole = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);
  return [
    {
      items: [
        {
          title: "Dashboard",
          href: defaultDashboard,
        },
      ],
    },
  ];
};

const publicNavItems: NavSection[] = [
  {
    items: [
      { title: "Home", href: "/" },
      { title: "About", href: "/about" },
    ],
  },
];

const commonProtectedNavs = [
  {
    items: [{ title: "My Library", href: "my-library" }],
  },
];

export const getNavigationItemsByRole = (role: UserRole): NavSection[] => {
  const defaultItems = getDefaultNavItemsByRole(role);

  switch (role) {
    case UserRole.USER:
      return [...publicNavItems, ...commonProtectedNavs, ...defaultItems];

    case UserRole.ADMIN:
      return [...publicNavItems, ...defaultItems];

    default:
      return publicNavItems;
  }
};
