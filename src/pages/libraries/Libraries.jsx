import React, { useEffect, useState } from "react";
import { Container, Text, Image } from "@mantine/core";
import { api } from "../../API/api";
import { useNavigate } from "react-router-dom";
import { IconSearch, IconLayoutGrid, IconList } from "@tabler/icons-react";
import kitob1 from "../../assets/1d61aded6f8ad28f9e18fe349b327f33.jpg";

const Libraries = () => {
  const [libraries, setLibraries] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");

  const navigate = useNavigate();

  const fetchLibraries = async () => {
    try {
      const response = await api.get("api/v1/libraries/libraries/");
      setLibraries(response.data);
    } catch (err) {
      console.error("Libraries API Error:", err);
      setError("Kutubxonalarni olishda xatolik yuz berdi.");
    }
  };

  useEffect(() => {
    fetchLibraries();
  }, []);


  const filtered = libraries.filter((lib) =>
    lib.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full bg-[#eef5ff] min-h-screen pb-20 pt-10">
      <Container>
        <h1 className="text-3xl font-semibold text-blue-600 text-center">
          Kutubxonalar ro‘yxati
        </h1>
      </Container>

      <Container className="bg-white shadow-lg rounded-2xl mt-10 p-5 flex items-center gap-4">
     
        <div className="flex items-center gap-2 flex-1 bg-gray-100 px-4 py-3 rounded-xl">
          <IconSearch size={22} className="text-gray-500" />
          <input
            type="text"
            placeholder="Qidirish (nomi bo‘yicha)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-gray-700"
          />
        </div>

    
        <button
          onClick={() => setView("grid")}
          className={`px-4 py-3 rounded-xl ${
            view === "grid"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          <IconLayoutGrid size={20} />
        </button>


        <button
          onClick={() => setView("list")}
          className={`px-4 py-3 rounded-xl ${
            view === "list"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          <IconList size={20} />
        </button>
      </Container>

      {error && (
        <Container className="mt-10 text-center text-red-500">
          {error}
        </Container>
      )}


      <Container
        className={`mt-10 grid ${
          view === "grid"
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
            : "grid-cols-1"
        } gap-6`}
      >
        {filtered.length > 0 ? (
          filtered.map((lib) => (
            <div
              key={lib.id}
              onClick={() => navigate(`/library/${lib.id}`)}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer 
              ${view === "list" ? "flex gap-4 p-0" : ""}`}
            >
          
              <div
                className={`overflow-hidden ${
                  view === "grid"
                    ? "h-56 w-full"
                    : "h-40 w-52 rounded-l-2xl shrink-0"
                }`}
              >
                <Image
                  src={kitob1}
                  alt={lib.name}
                  fit="cover"
                  className="w-full h-full object-cover"
                />
              </div>

           
              <div className={`px-5 py-4 ${view === "list" ? "flex-1" : ""}`}>
                <Text weight={700} size="xl" className="mb-2">
                  {lib.name}
                </Text>

                <Text size="sm" color="dimmed" className="mb-1">
                  <strong>Manzil:</strong> {lib.address}
                </Text>

                <Text size="sm" color="dimmed" className="mb-1">
                  <strong>Kitob:</strong> {lib.total_books}
                </Text>
              </div>
            </div>
          ))
        ) : (
          <Text className="text-center text-gray-500 col-span-full mt-10">
            Kutubxonalar topilmadi.
          </Text>
        )}
      </Container>
    </div>
  );
};

export default Libraries;
