import Dashboard from "../components/Layout/Dashboard";
import MainLayout from "../components/Layout/MainLayout";

export const routes = [
  {
    path: "/dashboard",
    element: (
      <MainLayout>
        <Dashboard />{" "}
      </MainLayout>
    ),
  },
]