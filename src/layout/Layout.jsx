import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  const { pathname } = useLocation();
  const hideNav = pathname.startsWith("/lesson/");
  const hideFooter = pathname.startsWith("/courses/") || pathname.startsWith("/lesson/");

  return (
    <>
      {!hideNav && <Navbar />}
      <main className={hideNav ? "" : "page"}>
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </>
  );
};

export default Layout;
