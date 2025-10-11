import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sem from "./pages/sem";
import Cg from "./pages/cg";
import Home from "./pages/home";
import ReactGA from "react-ga4";
import useAnalytics from "./hooks/useAnalytics";

// ReactGA.initialize("G-84SL8R8GP4");
// ReactGA.send("pageview");

function App() {
  // useAnalytics();

  useEffect(() => {
        ReactGA.initialize("G-84SL8R8GP4");
        ReactGA.send({ hitType: "pageview", page: "/lmao", title: "Landing Page", debug_mode: true });
    }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sgpa" element={<Sem />} />
        <Route path="/cgpa" element={<Cg />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
