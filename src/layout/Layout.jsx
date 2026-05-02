import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const { pathname } = useLocation();
  const isCourse = pathname.startsWith("/courses/");

  return (
    <>
      <Navbar />
      <main className="page">
        <Outlet />
      </main>
      {!isCourse && <Footer />}
    </>
  );
};

export default Layout;
