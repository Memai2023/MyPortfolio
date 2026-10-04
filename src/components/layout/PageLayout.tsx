import { useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useScrollReveal } from "../../features/motion/useScrollReveal";
import { useScrollScene } from "../../features/motion/useScrollScene";

function PageLayout() {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useScrollReveal(mainRef, pathname);
  useScrollScene(mainRef, pathname);

  return (
    <>
      <Header />
      <main ref={mainRef}>
        {/* Keyed by route so each page plays the short enter transition */}
        <div className="page-transition" key={pathname}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default PageLayout;
