import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AdUnits,
  AodOutlined,
  Call,
  DashboardCustomizeOutlined,
  DirectionsTransit,
  GroupAdd,
  ImageAspectRatio,
  Logout,
  ManageAccountsRounded,
  Money,
  PaymentSharp,
  PermScanWifi,
  Person,
  ProductionQuantityLimitsOutlined,
  PublishRounded,
  RollerShadesClosed,
  Store,
  TaxiAlert,
} from "@mui/icons-material";
import {
  CornerUpLeftIcon,
  Disc2Icon,
  Eye,
  Image,
  LucideAmpersands,
  MarsStroke,
  Minimize2Icon,
  User2Icon
} from "lucide-react";
import { FaFirstOrder } from "react-icons/fa";

// Role-specific access list
const superAdminAccess = [
  "Dashboard",
  "Store Management",
  "User Management",
  "Role",
  "Permissions",
  "LogOut",
];

// Full menu list
const fullMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <DashboardCustomizeOutlined />,
    path: "/dashboard",
  },
  {
    id: "stores",
    label: "Store Management",
    icon: <Store />,
    path: "/stores",
  },
  {
    id: "users",
    label: "User Management",
    icon: <User2Icon />,
    path: "/users",
  },
  {
    id: "roles",
    label: "Role",
    icon: <RollerShadesClosed />,
    path: "/roles",
  },
  {
    id: "permissions",
    label: "Permissions",
    icon: <PermScanWifi />,
    path: "/permissions",
  },
  
  
  {
    id: "banner",
    label: "Banner",
    icon: <Image />,
    path: "/banner",
  },
  {
    id: "Video",
    label: "Video",
    icon: <Image />,
    path: "/video",
  },
   {
    id: "Collection",
    label: "Collection ",
    icon: <ImageAspectRatio />,
    path: "/collection",
  },
  {
    id: "categories",
    label: "Categories",
    icon: <AodOutlined />,
    path: "/categories",
  },
  {
    id: "subcategories",
    label: "Sub Categories",
    icon: <Minimize2Icon />,
    path: "/sub_categories",
  },
  {
    id: "products",
    label: "Products",
    icon: <MarsStroke />,
    path: "/products",
  },
    {
    id: "distributor",
    label: "Distributor",
    icon: <DirectionsTransit />,
    path: "/distributor",
  },
   {
    id: "rank",
    label: "Master Rank",
    icon: <PermScanWifi />,
    path: "/rank",
  },
   {
    id: "rank_achivers",
    label: " Rank Achiver",
    icon: <PermScanWifi />,
    path: "/rankachiver",
  },
  {
    id: "utils",
    label: "Utils",
    icon: <Eye />,
    children: [
      {
        id: "unit",
        label: "Units",
        icon: <AdUnits />,
        path: "/unit",
      },
      {
        id: "material-group",
        label: "Material",
        icon: <GroupAdd />,
        children: [
          {
            id: "master-material",
            label: "Master Material",
            icon: <ProductionQuantityLimitsOutlined />,
            path: "/product-master-material",
          },
          {
            id: "purity-material",
            label: "Purity Material",
            icon: <PublishRounded />,
            path: "/purity",
          },
          {
            id: "sub-material",
            label: "Sub Material",
            icon: <ManageAccountsRounded />,
            path: "/product-material",
          },
           {
            id: "backup-material",
            label: "Backup  Material",
            icon: <ManageAccountsRounded />,
            path: "/backup_materials",
          },
          
        ],
      },
        {
        id: "Coupon",
        label: "Coupon",
        icon: <CornerUpLeftIcon />,
        path: "/coupon",
      },
      {
        id: "discount",
        label: "Discount",
        icon: <Disc2Icon />,
        path: "/discount",
      },
      {
        id: "tax",
        label: "Tax",
        icon: <TaxiAlert />,
        path: "/tax",
      },
      {
        id: "price_range",
        label: "Coupon Price Range",
        icon: <Money />,
        path: "/price_range",
      },
      
    ],
  },
  {
    id: "customer",
    label: "Customer",
    icon: <Person />,
    path: "/customer",
  },
  {
    id: "order",
    label: "Order",
    icon: <Person />,
    path: "/order",
  },
  {
    id: "E-gold Order",
    label: "E-gold Order",
    icon: <Person />,
    path: "/egold_order",
  },
    {
    id: "Leads",
    label: "External Leads",
    icon: <LucideAmpersands />,
    path: "/leads",
  },
    {
    id: "demo",
    label: "Request Call",
    icon: <Call />,
    path: "/demo-call",
  },
  {
    id: "custom",
    label: "Custom Order",
    icon: <FaFirstOrder />,
    path: "/custom",
  },
  {
    id: "payment",
    label: "Payment",
    icon: <PaymentSharp />,
    path: "/payment",
  },
  {
    id: "logout",
    label: "LogOut",
    icon: <Logout />,
    path: "/",
  },
];

const Sidebar = ({ sidebarOpen = true }) => {
  const [openSubMenu, setOpenSubMenu] = useState({});
  const userRole = localStorage.getItem("role");
  const alwaysVisible = ["Dashboard", "LogOut"];
  // Filter menu based on user role
  const menuItems = fullMenuItems.filter((item) => {
    const isAlwaysVisible = alwaysVisible.includes(item.label);
    const isSuperAdminItem = superAdminAccess.includes(item.label);

    if (isAlwaysVisible) {
      return true;
    }

    if (userRole === "superuser") {
      return isSuperAdminItem;
    }

    return !isSuperAdminItem; // Hide superadmin-only items for others
  });
  const toggleSubMenu = (id) => {
    setOpenSubMenu((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderMenuItems = (items, level = 0) => (
    <ul className={level > 0 ? "ml-6" : ""}>
      {items.map(({ id, label, icon, path, children }) => {
        const isOpen = openSubMenu[id] || false;

        return (
          <li key={id}>
            {children ? (
              <div>
                <button
                  onClick={() => toggleSubMenu(id)}
                  className={`w-full text-left px-6 py-2 flex items-center space-x-3 hover:bg-gray-100 ${level === 0
                    ? "font-medium text-gray-700"
                    : "text-sm text-gray-600"
                    }`}
                >
                  <span className="text-lg">{icon}</span>
                  <span className="flex-1">{label}</span>
                  <span className="text-xs">{isOpen ? "▲" : "▼"}</span>
                </button>
                {isOpen && renderMenuItems(children, level + 1)}
              </div>
            ) : (
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `block px-6 py-2 flex items-center space-x-3 hover:bg-gray-100 transition-colors ${isActive
                    ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                    : level === 0
                      ? "text-gray-700 font-medium"
                      : "text-sm text-gray-600"
                  }`
                }
              >
                <span>{icon}</span>
                <span>{label}</span>
              </NavLink>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside
      className={`h-full bg-white shadow-lg transition-all duration-300 z-40 ${sidebarOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full"
        }`}
    >
      <nav className="mt-4">
        <div className="px-4 py-2">
          <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Navigation
          </h2>
        </div>
        {renderMenuItems(menuItems)}
      </nav>
    </aside>
  );
};

export default Sidebar;
