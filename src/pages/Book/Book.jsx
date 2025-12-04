import React, { useEffect, useState } from "react";
import { Container, Text, Image } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import kitob from "../../assets/64dc9a11eeb76.webp";
import { api } from "../../API/api";

const Book = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get("api/v1/books/books/");
        setBooks(response.data);
      } catch (err) {
        console.error("API Error:", err);
        setError("Kitoblarni olishda xatolik yuz berdi.");
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books || [];

  return (
    <div className=" bg-[#eef5ff] p-30">
      <Container className="">
        <h1 className="text-2xl ">Kitoblar</h1>
      </Container>
      <Container className="mt-6  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.slice(0, 16).map((book) => (
            <div
              onClick={() => navigate(`/book/${book.id}`)}
              key={book.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
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

                <button className="mt-4 px-4 py-2 border border-blue-500 text-blue-500 rounded-xl font-semibold hover:bg-blue-50 transition">
                  {book.quantity_in_library} ta kitob mavjud
                </button>
              </div>
            </div>
          ))
        ) : !error ? (
          <Text className="text-center text-gray-500 col-span-full mt-10">
            Kitoblar topilmadi.
          </Text>
        ) : null}
      </Container>
    </div>
  );
};

export default Book;
