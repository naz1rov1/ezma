import React, { useEffect, useState } from "react";
import { Container, Text, Image, Loader } from "@mantine/core";
import { useParams } from "react-router-dom";

import kitob1 from "../../../assets/1d61aded6f8ad28f9e18fe349b327f33.jpg";
import { api } from "../../../API/api";
import kitob from "../../../assets/64dc9a11eeb76.webp"

const LibraryDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchDetail = async () => {
    try {
      const res = await api.get(`api/v1/libraries/library/${id}/`);
      setData(res.data.results);
    } catch (err) {
      console.error(err);
      setError("Ma'lumot yuklanmadi");
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  if (error)
    return (
      <Container className="text-center mt-20 text-red-500 text-xl">
        {error}
      </Container>
    );

  if (!data)
    return (
      <div className="flex justify-center mt-20">
        <Loader size="lg" color="blue" />
      </div>
    );

  const library = data.library || {};

  return (
    <div className="w-full bg-[#eef5ff] min-h-screen pb-20 pt-10">
      <Container>
        <h1 className="text-3xl font-semibold text-blue-600 text-center">
          Kutubxona ma'lumotlari
        </h1>
      </Container>

      <Container className="bg-white shadow-xl rounded-2xl mt-10 p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 w-full h-80 rounded-xl overflow-hidden shadow-md">
            <Image
              src={library.image || kitob1}
              alt={library.name}
              fit="cover"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:w-1/2 w-full space-y-4">
            <Text weight={700} size="xl" className="text-gray-800">
              {library?.name}
            </Text>

            {Object.entries({
              address: library?.address,
              phone: data?.phone,
              total_books: data?.total_books,
              is_active: data?.is_active ? "true" : "false",
            })
              .filter(([_, value]) => value !== null && value !== undefined)
              .map(([key, value]) => (
                <div
                  key={key}
                  className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-between"
                >
                  <Text className="font-semibold text-gray-700 capitalize">
                    {key.replace("_", " ")}
                  </Text>
                  <Text className="text-gray-600">{value}</Text>
                </div>
              ))}
          </div>
        </div>

        {Array.isArray(data.books) && data.books.length > 0 && (
          <div className="mt-12">
            <Text weight={700} size="lg" className="mb-4">
              Kitoblar ro‘yxati
            </Text>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {data.books.map((book) => (
                <div
                  key={book.id}
                  className="p-4 bg-[#f8fafc] rounded-xl shadow hover:shadow-md transition cursor-pointer"
                >
                  <div className="w-full h-48 mb-3 rounded-lg overflow-hidden">
                    <Image
                      src={kitob}
                      alt={book.title}
                      fit="cover"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {Object.entries(book)
                    .filter(([key]) => key !== "id" && key !== "image")
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between text-sm mb-1"
                      >
                        <span className="font-semibold capitalize">
                          {key.replace("_", " ")}:
                        </span>
                        <span>{value}</span>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default LibraryDetail;
