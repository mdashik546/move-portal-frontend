import { NavSection } from "@/types/dashboard.types";
import { getDefaultDashboardRoute, UserRole } from "./authUtlis";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);
  return [
    {
      // title : "Dashboard",
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
      title: "Settings",
      items: [
        {
          title: "Change Password",
          href: "change-password",
          icon: "Settings",
        },
      ],
    },
  ];
};

export const adminNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Admins",
        href: "/admin/dashboard/admins-management",
        icon: "Shield",
      },
      {
        title: "Users",
        href: "/admin/dashboard/doctors-management",
        icon: "Stethoscope",
      },
    ],
  },
  {
    title: "Movie Management",
    items: [
      {
        title: "Appointments",
        href: "/admin/dashboard/appointments-management",
        icon: "Calendar",
      },
    ],
  },
];

export const userNavItems: NavSection[] = [
  {
    title: "Appointments",
    items: [
      {
        title: "My Appointments",
        href: "/dashboard/my-appointments",
        icon: "Calendar",
      },
      {
        title: "Book Appointment",
        href: "/dashboard/book-appointments",
        icon: "ClipboardList",
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
  }
};
