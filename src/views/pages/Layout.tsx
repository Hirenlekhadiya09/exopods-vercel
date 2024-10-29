import CustomRoutes from "config/CustomRoutes";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function Layout() {
  return (
    <>
      <ScrollToTop />
      <CustomRoutes />
    </>
  );
}

export default Layout;
