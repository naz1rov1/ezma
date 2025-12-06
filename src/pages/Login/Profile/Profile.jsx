import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authStore from "../../../components/store/authStore";
import { api } from "../../../API/api";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { access, refresh, logout } = authStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await api.get("/api/v1/auth/profile/", {
          headers: { Authorization: `Bearer ${access}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError("Profilni olishda xato yuz berdi");
      } finally {
        setLoading(false);
      }
    };

    if (access) fetchProfile();
    else {
      setError("Foydalanuvchi tizimga kirmagan");
      setLoading(false);
    }
  }, [access]);

  const handleLogout = async () => {
    try {
      await api.post(
        "/api/v1/auth/logout/",
        { refresh }, 
        { headers: { Authorization: `Bearer ${access}` } }
      );
    } catch (err) {
      console.error("Server logout xato:", err.response?.data || err.message);
    } finally {
      logout(); 
      navigate("/login");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Yuklanmoqda...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        <p>{error}</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 bg-white rounded-xl shadow-lg mt-30">
      <div className="flex items-center space-x-6">
        <div className="w-24 h-24 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500 text-4xl">
          {profile?.image ? (
            <img
              src={profile.image}
              alt="Profil rasmi"
              className="w-24 h-24 rounded-lg object-cover"
            />
          ) : (
            <span>👤</span>
          )}
        </div>

        <div className="flex-1 space-y-1 text-gray-700">
          <p>
            <span className="font-semibold">Ism:</span> {profile.user?.name}
          </p>
          <p>
            <span className="font-semibold">Telefon:</span>{" "}
            {profile.user?.phone}
          </p>
          <p>
            <span className="font-semibold">Manzil:</span> {profile.address}
          </p>
          <p>
            <span className="font-semibold">Instagram:</span>{" "}
            {profile.social_media?.instagram}
          </p>
          <p>
            <span className="font-semibold">Facebook:</span>{" "}
            {profile.social_media?.facebook}
          </p>
          <p>
            <span className="font-semibold">Telegram:</span>{" "}
            {profile.social_media?.telegram}
          </p>
          <p>
            <span className="font-semibold">Kitob ijaraga olishi mumkin:</span>{" "}
            {profile.can_rent_books ? "Ha" : "Yo'q"}
          </p>
        </div>

        <div className="relative">
          <button
            onClick={handleLogout}
            className="bg-blue-500 text-white rounded-md px-3 py-2 hover:bg-blue-600"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center space-x-6 border-b border-gray-300 pb-3 mb-4">
          <button className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">
            Kitoblarim
          </button>
          <button className="text-gray-500 cursor-not-allowed">
            Tarmoqlarim
          </button>
          <button className="text-gray-500 cursor-not-allowed">Xarita</button>
        </div>
        <p className="text-gray-700">Kitob topilmadi</p>
      </div>
    </div>
  );
};

export default Profile;
