import Header from "./Header";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Header - Fixed at top */}
      <Header />

      {/* Main Content - Flexible and responsive */}
      <main className="flex-1 w-full">
        <div className="w-full">{children}</div>
      </main>

      {/* Optional Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
