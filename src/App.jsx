import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import Libraries from "./pages/libraries/Libraries";
import LibrariesDetail from "./pages/libraries/LibrariesDetail/LibrariesDetail";
import Book from "./pages/Book/Book";
import BookDetail from "./pages/Book/bookDetail/BookDetail";

// Auth pages
import Login from "./pages/Login/Login";
import Profile from "./pages/Login/Profile/Profile";
import PrivateProfile from "./components/privateProfile/PrivateProfile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="libraries" element={<Libraries />} />
        <Route path="library/:id" element={<LibrariesDetail />} />

        <Route path="book" element={<Book />} />
        <Route element={<PrivateProfile />}>
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="book/:id" element={<BookDetail />} />
      </Route>
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default App;
