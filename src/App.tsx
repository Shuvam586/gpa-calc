import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import GuestHome from "./pages/guest/guestHome";
import GuestSem from "./pages/guest/guestSem";
import GuestCg from "./pages/guest/guestCg";

function App() {
  // useAnalytics();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/guest" element={<GuestHome />} />
        <Route path="/guest/sgpa" element={<GuestSem />} />
        <Route path="/guest/cgpa" element={<GuestCg />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
