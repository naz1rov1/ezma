import React, { useState, useEffect } from "react";
import { Container, Text, Button, TextInput, Flex, Image } from "@mantine/core";

import kitob from "../../assets/64dc9a11eeb76.webp";
import { useNavigate } from "react-router-dom";
import { api } from "../../API/api";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 📌 API dan barcha kitoblarni olish
  const fetchBooks = async () => {
    try {
      const response = await api.get("api/v1/books/books/");
      setBooks(response.data);
    } catch (err) {
      console.error("API Error:", err);
      setError("Kitoblarni olishda xatolik yuz berdi.");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // 📌 Qidiruv
  const handleSearch = async () => {
    if (!search.trim()) {
      fetchBooks();
      return;
    }

    try {
      const response = await api.get("api/v1/books/search/book/", {
        params: { q: search },
      });
      setBooks(response.data);
    } catch (err) {
      console.error("Search API Error:", err);
      setError("Qidiruvda xatolik yuz berdi.");
    }
  };

  // 📌 ENTER bosilganda qidirish
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // 📌 Avtomatik qidirish (debounce)
  useEffect(() => {
    const delay = setTimeout(() => {
      handleSearch();
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  return (
    <div className="w-full bg-gradient from-[#eef5ff] to-[#dde7f5] relative overflow-hidden mt-50 pb-20">
      <Container size="md" className="relative z-10 text-center">
        <Text
          style={{ fontSize: "32px", color: "#3b82f6", fontWeight: "bold" }}
        >
          Kitoblar bir joyda - qidiruvni shu yerdan boshlang
        </Text>

        <Flex className="w-full max-w-3xl mx-auto mt-6" gap={0}>
          <TextInput
            placeholder="Kitob nomi, muallif nomi"
            className="flex-1 bg-white shadow-md"
            size="md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <Button
            size="md"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6"
            onClick={handleSearch}
          >
            Qidirish
          </Button>
        </Flex>
      </Container>

      <div className="flex items-end justify-center">
        <img
          className="w-350 h-150"
          src="https://ezma-client.vercel.app/assets/home-bg-aYS3sMx9.svg"
          alt=""
        />
      </div>

      {error && (
        <Container size="md" className="mt-10 text-center text-red-500">
          {error}
        </Container>
      )}

      <Container>
        <h1 className="text-2xl font-semibold">Eng ko'p o'qilgan kitoblar</h1>
      </Container>

      <Container className="mt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-6">
        {books.length > 0 ? (
          books.slice(0, 4).map((book) => (
            <div
              onClick={() => navigate(`/book/${book.id}`)}
              key={book.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl 
              transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <div className="h-56 w-full overflow-hidden">
                <Image
                  src={kitob}
                  alt={book.title}
                  fit="cover"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="px-5 py-4">
                <Text weight={700} size="xl" className="mb-2">
                  {book.title}
                </Text>

                <Text size="sm" color="dimmed" className="mb-1">
                  <strong>Muallif:</strong> {book.author}
                </Text>

                <Text size="sm" color="dimmed" className="mb-1">
                  <strong>Nashriyot:</strong> {book.publisher}
                </Text>

                <button
                  className="mt-4 px-4 py-2 border border-blue-500 
                text-blue-500 rounded-xl font-semibold hover:bg-blue-50 transition"
                >
                  {book.quantity_in_library} ta kitob mavjud
                </button>
              </div>
            </div>
          ))
        ) : (
          <Text className="text-center text-gray-500 col-span-full mt-10">
            Kitoblar topilmadi.
          </Text>
        )}
      </Container>
    </div>
  );
};

export default Home;
