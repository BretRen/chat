import { HashRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import OtpLogin from "./pages/OtpLogin";
export default function App() {
  return (
    <div className="bg-gray-100">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/otp" element={<OtpLogin />} />
        </Routes>
      </HashRouter>
    </div>
  );
}
