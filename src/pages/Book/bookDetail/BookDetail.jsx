import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Text, Image, Loader } from "@mantine/core";
import { api } from "../../../API/api";
import kitob from "../../../assets/64dc9a11eeb76.webp";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await api.get(`api/v1/books/book/${id}/`);
        setBook(res.data);
      } catch (err) {
        console.error(err);
        setError("Kitob ma'lumotlarini yuklashda xatolik.");
      }
    };
    fetchBook();
  }, [id]);

  if (error)
    return (
      <Container size="md" className="mt-10 text-center text-red-500">
        {error}
      </Container>
    );

  if (!book)
    return (
      <div className="flex justify-center mt-20">
        <Loader color="blue" size="lg" />
      </div>
    );

  return (
    <Container
      size="lg"
      className="bg-white shadow-xl p-10 rounded-2xl mt-20 mb-20"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
    
        <div className="flex justify-center">
          <Image
            src={kitob}
            alt={book.title}
            height={350}
            fit="contain"
            className="rounded-xl shadow-md"
          />
        </div>

        <div>
          <Text size="xl" weight={700} className="mb-4 text-gray-900">
            {book.title}
          </Text>

          <div className="space-y-2 text-gray-700">
            <Text size="md">
              <strong>Muallif:</strong> {book.author}
            </Text>

            <Text size="md">
              <strong>Nashriyot:</strong> {book.publisher}
            </Text>

            <Text size="md">
              <strong>Mavjud nusxalar:</strong> {book.quantity_in_library}
            </Text>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BookDetail;
