import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { api } from "../../API/api";
import authStore from "../../components/store/authStore";

const Login = () => {
  const { login } = authStore();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/api/v1/auth/login/", { phone, password });

    
      login(res.data.user, res.data.access, res.data.refresh);
      navigate("/profile");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Login xato, ma’lumotlarni tekshiring!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="bg-[#04A8FF] flex items-center justify-center p-10"></div>

      <div className="flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="w-[80%] max-w-md bg-white p-6 rounded-xl"
        >
          <NavLink to="/" className="absolute top-10 left-225">
           chiqish
          </NavLink>
          <h1 className="text-4xl ml-15 font-bold mb-2">Tizimga kirish</h1>
          <p className="text-gray-500 mb-6">
            Platformadan to‘liq foydalanish uchun tizimga kiring
          </p>

          <label className="text-sm text-gray-600">Telefon raqam</label>
          <input
            type="text"
            placeholder="+998 __ ___ __ __"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full mt-1 mb-4 px-4 py-2 rounded-lg border"
            required
          />

          <label className="text-sm text-gray-600">Parol</label>
          <input
            type="password"
            placeholder="Iltimos parolni kiriting"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 mb-4 px-4 py-2 rounded-lg border"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#04A8FF] text-white py-2 rounded-lg mt-3"
          >
            {loading ? "Yuklanmoqda..." : "Tizimga kirish"}
          </button>

          <p className="text-center mt-4 text-sm">
            Hisobingiz yo‘qmi?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 cursor-pointer"
            >
              Ro‘yxatdan o‘ting
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
