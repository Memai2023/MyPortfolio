import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function PageLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default PageLayout;
