import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import SharedBrain from "./pages/shared-brain";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/share/:shareId" element={<SharedBrain />} />
      </Routes>
    </BrowserRouter>
  );
}
