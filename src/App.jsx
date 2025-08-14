import { Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar.jsx";
import MainContent from "./components/MainContent.jsx";
import Products from "./components/Products.jsx";
import UserPrifiles from "./components/UserPrifiles.jsx";
import About from "./components/About.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import Login from "./components/Login.jsx";
import PaginationExample from "./components/Pegination.jsx";

function App() {
  return (
    <div className="flex min-h-screen ">
      <Sidebar />
      <div className="rounded w-full">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<MainContent />} />
            <Route path="/products/:id" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/userprofiles" element={<UserPrifiles />} />
            <Route path="/pagination" element={<PaginationExample />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
