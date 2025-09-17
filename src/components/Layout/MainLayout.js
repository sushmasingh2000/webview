
 import Sidebar from "../Layout/Sidebar"
 import Header from "../Layout/Header"

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen ">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="hidden md:block">
          <Header />
        </div>
        <div className="p-4 mt-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
