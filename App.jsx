import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ExperienceDetails from "./pages/ExperienceDetails";
import "./App.css";
import Planner from "./pages/Planner";
import Wallet from "./pages/Wallet";
import MyTrips from "./pages/MyTrips";
import TravelGuides from "./pages/TravelGuides";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function ComingSoon({ title }) {
  return (
    <div className="coming-soon">
      <h1>{title}</h1>
      <p>Your next adventure is being prepared.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
<Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/experience/:name" element={<ExperienceDetails />} />
        <Route path="/planner" element={<Planner />} />
       <Route path="/wallet" element={<Wallet />} />
       <Route path="/my-trips" element={<MyTrips />} />
       <Route path="/guides" element={<TravelGuides />} />
       <Route path="/contact" element={<Contact />} />
       <Route path="/signup" element={<Signup />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;