import React from "react";
import { apiConnectorGet, usequeryBoolean } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import { useQuery } from "react-query";

// Mapping for label, color, and icon for known metrics
const metricMap = {
  product_category_count: { label: "Product Categories", color: "purple" },
  product_count: { label: "Total Products", color: "blue" },
  user_count: { label: "Users", color: "green" },
  customer_count: { label: "Customers", color: "orange" },

  // Order statuses
  order_status_Pending: { label: "Orders - Pending", color: "yellow" },
  order_status_Shipped: { label: "Orders - Shipped", color: "blue" },
  order_status_In_Transit: { label: "Orders - In Transit", color: "purple" },
  order_status_Delivered: { label: "Orders - Delivered", color: "green" },
  order_status_Cancelled: { label: "Orders - Cancelled", color: "red" },

  // Custom orders
  custom_order_status_Pending: { label: "Custom Orders - Pending", color: "yellow" },
  custom_order_status_Processing: { label: "Custom Orders - Processing", color: "blue" },
  custom_order_status_Rejected: { label: "Custom Orders - Rejected", color: "red" },
  custom_order_status_Success: { label: "Custom Orders - Success", color: "green" },

  // Demo call statuses
  demo_call_status_Pending: { label: "Demo Calls - Pending", color: "yellow" },
  demo_call_status_Processing: { label: "Demo Calls - Processing", color: "blue" },
  demo_call_status_Rejected: { label: "Demo Calls - Rejected", color: "red" },
  demo_call_status_Success: { label: "Demo Calls - Success", color: "green" },
};

const Dashboard = () => {
  const { data } = useQuery(
    ["get_dashboard_Count"],
    () => apiConnectorGet(endpoint.get_dashboard_Count),
    usequeryBoolean
  );

  const dashboardData = data?.data?.result || [];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.map((item, index) => {
          const key = item.metric.replaceAll(" ", "_"); // handle spaces
          const mapItem = metricMap[key];

          if (!mapItem) return null; // skip unknown metrics

          return (
            <StatCard
              key={index}
              label={mapItem.label}
              value={item.total_count}
              color={mapItem.color}
            />
          );
        })}
      </div>
    </div>
  );
};

const StatCard = ({ color, label, value }) => (
  <div className={`bg-${color}-50 p-6 rounded-lg border border-${color}-200`}>
    <div className="flex items-center justify-between">
      <div>
        <p className={`text-${color}-600 text-sm font-medium`}>{label}</p>
        <p className={`text-3xl font-bold text-${color}-700`}>{value}</p>
      </div>
    </div>
  </div>
);

export default Dashboard;
