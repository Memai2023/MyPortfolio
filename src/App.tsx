import { Routes, Route } from "react-router-dom";
import PageLayout from "./components/layout/PageLayout";
import Home from "./pages/Home/Home";
import Work from "./pages/Work/Work";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import CaseStudy from "./pages/CaseStudy/CaseStudy";

function App() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
      </Route>
    </Routes>
  );
}

export default App;
