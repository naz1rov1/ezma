import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import Libraries from "./pages/libraries/Libraries";
import LibrariesDetail from "./pages/libraries/LibrariesDetail/LibrariesDetail"; 
import Book from "./pages/Book/Book";
import BookDetail from "./pages/Book/bookDetail/BookDetail";
import Malumot from "./pages/malumotlar/Malumot";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="libraries" element={<Libraries />} />
        

        <Route path="library/:id" element={<LibrariesDetail />} />
        <Route path="book" element={<Book />} />
        <Route path="book/:id" element={<BookDetail />} />
      </Route>
    </Routes>
  );
};

export default App;
