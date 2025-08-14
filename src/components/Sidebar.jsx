import React, { use, useEffect, useState } from "react";
import { useFilterContext } from "../contexts/useFilterContext";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext/AuthContext";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const KeyWord = ["Apple", "Watch", "Fashion", "shoes", "shirt"];

  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    keyword,
    setKeyword,
  } = useFilterContext();

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await fetch("https://dummyjson.com/products");
      const Responce = await data.json();
      const uniqueCategories = Array.from(
        new Set(Responce.products.map((cat) => cat.category))
      );

      setCategories(uniqueCategories);
    };

    fetchCategories();
  }, []);

  const { user, setUser } = useAuth();

  const handleLoginLogout = () => {
    if (user) {
      localStorage.removeItem("userDetails");
      setUser(null);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice("");
    setMaxPrice("");
    setKeyword("");
  };
  return (
    <div className="w-64 h-screen p-5">
      <Link to="userprofiles">
        <h1 className="text-black font-bold text-2xl mb-8 mt-4">
          User Profiles
        </h1>
      </Link>
      <button
        onClick={handleLoginLogout}
        className="px-4 py-1 rounded bg-blue-500 text-white"
      >
        {user ? "Logout" : "Login"}
      </button>
      <h1 className="text-black font-bold text-2xl mb-8 mt-4"> React Store</h1>
      <section>
        <input
          className="w-full rounded px-2 py-1 border"
          placeholder="search products"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex gap-1 mt-4 mb-3">
          <input
            className="w-full rounded px-2 py-1 border"
            placeholder="max"
            type="text"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <input
            className="w-full rounded px-2 py-1 border"
            placeholder="min"
            type="text"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <h2 className="text-xl font-semibold mb-2">Categories</h2>
          {categories &&
            categories.map((category, index) => (
              <label key={index} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  className="w-[16px] mr-1 h-[16px]"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  checked={selectedCategory === category}
                />
                {category.toUpperCase()}
              </label>
            ))}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Keywords</h2>
          {KeyWord &&
            KeyWord.map((keyW) => (
              <button
                key={keyW}
                className={`w-full px-3 py-2 text-left border block mb-2 hover:bg-gray-200 rounded ${
                  keyword === keyW ? "bg-gray-200" : ""
                }`}
                onClick={() => setKeyword(keyW)}
              >
                {keyW.toUpperCase()}
              </button>
            ))}
        </div>

        <button
          className="w-full bg-black text-white rounded text-xl font-bold py-2 mt-3"
          onClick={handleResetFilters}
        >
          Reset
        </button>
      </section>
    </div>
  );
};

export default Sidebar;
