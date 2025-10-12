import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sem from "./pages/sem";
import Cg from "./pages/cg";
import Home from "./pages/home";

function App() {
  // useAnalytics();

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
