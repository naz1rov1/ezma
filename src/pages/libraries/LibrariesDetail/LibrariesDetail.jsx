import React, { useEffect, useState } from "react";
import { Container, Text, Image, Loader } from "@mantine/core";
import { useParams } from "react-router-dom";
import kitob1 from "../../../assets/1d61aded6f8ad28f9e18fe349b327f33.jpg";
import { api } from "../../../API/api";

const LibrariesDetail = () => {
  const { id } = useParams();
  const [library, setLibrary] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLibraryDetail = async () => {
    try {
      const response = await api.get(`api/v1/libraries/library/${id}/`);
      setLibrary(response.data);
    } catch (err) {
      console.error("Library Detail Error:", err);
      setError("Kutubxona ma'lumotlarini olishda xatolik yuz berdi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLibraryDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <Loader size="lg" color="blue" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-20 text-red-500 text-xl">
        {error}
      </Container>
    );
  }

  return (
    <div className="w-full bg-[#eef5ff] min-h-screen pb-20 pt-20">
      <Container>
        <h1 className="text-3xl font-semibold text-blue-600 text-center mb-10">
          {library?.name}
        </h1>

        <div className="bg-white shadow-xl flex flex-col md:flex-row overflow-hidden">
       
          <div className="md:w-1/3 h-50 md:h-auto">
            <Image
              src={kitob1}
              alt={library?.name}
              fit="cover"
              className="w-full h-full object-cover"
            />
          </div>

        
          <div className="md:w-1/2 p-8 flex flex-col justify-center space-y-3 text-gray-700">
            <Text size="xl" weight={700} className="mb-4">
              Kutubxona ma'lumotlari
            </Text>

            <p>
              <strong className="text-blue-600">Nomi:</strong> {library?.name}
            </p>

            <p>
              <strong className="text-blue-600">Manzil:</strong>{" "}
              {library?.address}
            </p>

            <p>
              <strong className="text-blue-600">Kitoblar soni:</strong>{" "}
              {library?.total_books}
            </p>

          
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LibrariesDetail;
