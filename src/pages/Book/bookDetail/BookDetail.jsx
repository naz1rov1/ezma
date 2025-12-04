
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
    <Container size="sm" className="mt-30 mb-10 bg-white shadow-xl p-8 rounded-2xl ">
      <Image
        src={kitob}
        alt={book.title}
        height={300}
        fit="contain"
        className="mx-auto rounded-lg"
      />

      <Text size="xl" weight={700} className="mt-4 text-center">
        {book.title}
      </Text>

      <Text size="md" className="mt-2 text-gray-600">
        <strong>Muallif:</strong> {book.author}
      </Text>

      <Text size="md" className="mt-1 text-gray-600">
        <strong>Nashriyot:</strong> {book.publisher}
      </Text>

      <Text size="md" className="mt-1 text-gray-600">
        <strong>Mavjud nusxalar:</strong> {book.quantity_in_library}
      </Text>

    </Container>
  );
};

export default BookDetail;
