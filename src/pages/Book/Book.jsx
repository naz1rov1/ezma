import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Text,
  Image,
  Modal,
  Button,
  TextInput,
  Notification,
  Menu,
  ActionIcon,
} from "@mantine/core";
import { IconCheck, IconDots } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import kitob from "../../assets/64dc9a11eeb76.webp";
import { api } from "../../API/api";
import authStore from "../../components/store/authStore";

const Book = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const titleRef = useRef();
  const authorRef = useRef();
  const publisherRef = useRef();
  const quantityRef = useRef();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get("api/v1/books/books/");
        setBooks(response.data);
      } catch (err) {
        console.error("API Error:", err.response?.data || err.message);
        setError("Kitoblarni olishda xatolik yuz berdi.");
      }
    };
    fetchBooks();
  }, []);

  const addBook = async () => {
    const token = authStore.getState().access;
    if (!token) {
      alert("Iltimos, tizimga kiring!");
      return;
    }

    const quantity = parseInt(quantityRef.current.value);
    if (
      !titleRef.current.value ||
      !authorRef.current.value ||
      !publisherRef.current.value ||
      isNaN(quantity)
    ) {
      alert("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    const newBook = {
      name: titleRef.current.value,
      author: authorRef.current.value,
      publisher: publisherRef.current.value,
      quantity: quantity,
    };

    try {
      const response = await api.post("api/v1/books/books/", newBook, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBooks([...books, response.data]);
      setOpenModal(false);

      titleRef.current.value = "";
      authorRef.current.value = "";
      publisherRef.current.value = "";
      quantityRef.current.value = "";

      setSuccessMessage(
        `Kitob "${response.data.name}" muvaffaqiyatli qo‘shildi!`
      );
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Qo‘shishda xatolik:", err.response?.data || err);
      alert("Kitob qo‘shishda xatolik yuz berdi!");
    }
  };

  const deleteBook = async (id) => {
    const token = authStore.getState().access;
    if (!token) {
      alert("Iltimos, tizimga kiring!");
      return;
    }

    try {
      await api.delete(`api/v1/books/book/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBooks((prev) => prev.filter((book) => book.id !== id));

      setSuccessMessage("Kitob muvaffaqiyatli o‘chirildi!");
      setTimeout(() => setSuccessMessage(""), 2500);
    } catch (err) {
      console.error("Delete xatosi:", err.response?.data || err);
      alert("Kitobni o‘chirishda xatolik yuz berdi!");
    }
  };

  const handleDeleteBook = (id) => {
    if (window.confirm("Rostan ham kitobni o‘chirilsinmi?")) {
      deleteBook(id);
    }
  };

  const openEditModal = (book) => {
    setSelectedBook(book);
    setEditModal(true);

    titleRef.current.value = book.name;
    authorRef.current.value = book.author;
    publisherRef.current.value = book.publisher;
    quantityRef.current.value = book.quantity_in_library || book.quantity;
  };

  const updateBook = async () => {
    const token = authStore.getState().access;
    if (!token) {
      alert("Iltimos tizimga kiring!");
      return;
    }

    const updatedBook = {
      name: titleRef.current.value,
      author: authorRef.current.value,
      publisher: publisherRef.current.value,
      quantity: parseInt(quantityRef.current.value),
    };

    try {
      const res = await api.put(
        `api/v1/books/book/${selectedBook.id}/`,
        updatedBook,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBooks((prev) =>
        prev.map((b) => (b.id === selectedBook.id ? res.data : b))
      );
      setEditModal(false);

      setSuccessMessage("Kitob muvaffaqiyatli yangilandi!");
      setTimeout(() => setSuccessMessage(""), 2500);
    } catch (err) {
      console.error("Update xatosi:", err.response?.data || err);
      alert("Kitobni yangilashda xatolik yuz berdi!");
    }
  };

  return (
    <div className="bg-[#eef5ff] p-30 relative">
      {successMessage && (
        <Notification
          icon={<IconCheck size={20} />}
          color="teal"
          title="Muvaffaqiyatli!"
          className="fixed top-10 left-330 -translate-x-1/2 z-50 w-96 shadow-xl rounded-xl"
          onClose={() => setSuccessMessage("")}
        >
          {successMessage}
        </Notification>
      )}

      <Container>
        <h1 className="text-2xl">Kitoblar</h1>
        <div className="flex justify-end mb-6 fixed bottom-10 right-8">
          <Button onClick={() => setOpenModal(true)}>+ kitob qo‘shish</Button>
        </div>
      </Container>

      <Container className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {books.length > 0 ? (
          books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer relative"
            >
              <div
                onClick={() => navigate(`/book/${book.id}`)}
                className="h-56 w-full overflow-hidden"
              >
                <Image
                  src={kitob}
                  alt={book.name}
                  fit="cover"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="px-5 py-4 relative">
                <div className="flex justify-between">
                  <Text weight={700} size="xl" className="mb-2">
                    {book.name}
                  </Text>
                 
                  <Menu shadow="md" width={150}>
                    <Menu.Target>
                      <ActionIcon className="ml-2">
                        <IconDots size={20} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        onClick={() => openEditModal(book)}
                        color="yellow"
                      >
                        Tahrirlash
                      </Menu.Item>
                      <Menu.Item
                        onClick={() => handleDeleteBook(book.id)}
                        color="red"
                      >
                        O‘chirish
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </div>
                <Text size="sm" color="dimmed" className="mb-1">
                  <strong>Muallif:</strong> {book.author}
                </Text>
                <Text size="sm" color="dimmed" className="mb-1">
                  <strong>Nashriyot:</strong> {book.publisher}
                </Text>

                <div className="mt-4 flex items-center gap-2">
                  <button className="px-3 py-2 border border-blue-500 text-blue-500 rounded-xl font-semibold hover:bg-blue-50 transition">
                    {book.quantity_in_library || book.quantity} ta mavjud
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : !error ? (
          <Text className="text-center text-gray-500 col-span-full mt-10">
            Kitoblar topilmadi.
          </Text>
        ) : null}
      </Container>

      
      <Modal
        opened={openModal}
        onClose={() => setOpenModal(false)}
        title="Yangi kitob qo‘shish"
      >
        <TextInput
          ref={titleRef}
          label="Kitob nomi"
          placeholder="Kitob nomi"
          mb="sm"
        />
        <TextInput
          ref={authorRef}
          label="Muallif"
          placeholder="Muallif"
          mb="sm"
        />
        <TextInput
          ref={publisherRef}
          label="Nashriyot"
          placeholder="Nashriyot"
          mb="sm"
        />
        <TextInput
          ref={quantityRef}
          label="Kitob soni"
          type="number"
          placeholder="Kitob soni"
          mb="sm"
        />
        <Button fullWidth onClick={addBook}>
          Qo‘shish
        </Button>
      </Modal>

      {/* Edit Modal */}
      <Modal
        opened={editModal}
        onClose={() => setEditModal(false)}
        title="Kitobni tahrirlash"
      >
        <TextInput ref={titleRef} label="Kitob nomi" mb="sm" />
        <TextInput ref={authorRef} label="Muallif" mb="sm" />
        <TextInput ref={publisherRef} label="Nashriyot" mb="sm" />
        <TextInput ref={quantityRef} label="Kitob soni" type="number" mb="sm" />
        <Button fullWidth onClick={updateBook}>
          Yangilash
        </Button>
      </Modal>
    </div>
  );
};

export default Book;
