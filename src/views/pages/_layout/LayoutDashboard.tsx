import Header from "pages/_components/Header/Header";
import Navigation from "pages/_components/Navigation/Navigation";
import { Outlet } from "react-router-dom";

function LayoutDashboard() {
  return (
    <div className="relative min-h-screen bg-[#0C1015]  ">
      <div id="context-wrap" className={`flex flex-col h-full`}>
        <div className="hidden exobp:flex">
          <Navigation />
        </div>

        <div className={`flex exobp:pl-[80px] flex-col h-full relative`}>
          <Header />
          <main className="h-full w-full">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default LayoutDashboard;
