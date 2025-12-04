import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import Libraries from "./pages/libraries/Libraries";
import BookDetail from "./pages/Book/bookDetail/BookDetail"; // 📌 qo‘shildi
import Book from "./pages/Book/Book";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="libraries" element={<Libraries />} />
        <Route path="Book" element={<Book />} />

        <Route path="book/:id" element={<BookDetail />} />
      </Route>
    </Routes>
  );
};

export default App;
