import { useEffect, useState } from "react";
import { useFilterContext } from "../contexts/useFilterContext";
import { Link } from "react-router-dom";

const MainContent = () => {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
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
    const fetchProducts = async () => {
      setLoader(true);
      try {
        const Responce = await fetch("https://dummyjson.com/products");
        if (Responce) {
          setLoader(false);
          const data = await Responce.json();
          setProducts(data.products);
        }
      } catch (error) {
        console.error("pan", error);
        setError(error);
      } finally {
        setLoader(false);
      }
    };

    fetchProducts();
  }, []);

  const handlefilters = () => {
    let filterdProducts = products;
    if (searchQuery) {
      filterdProducts = filterdProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (minPrice) {
      filterdProducts = filterdProducts.filter(
        (product) => product.price >= minPrice
      );
    }

    if (maxPrice) {
      filterdProducts = filterdProducts.filter(
        (product) => product.price <= maxPrice
      );
    }

    if (selectedCategory) {
      filterdProducts = filterdProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    return filterdProducts;
  };

  const filteredProducts = handlefilters();

  if (loader)
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-s">
      {filteredProducts.map((product) => {
        return (
          <Link
            to={`products/${product.id}`}
            key={product.id}
            className="border p-4 rounded"
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-40 mb-2 object-cover"
            />
            <h2 className="text-xl font-bold">{product.title}</h2>
            <p className="text-gray-600">{product.description.slice(0, 30)}</p>
            <p className="text-green-500 font-semibold">${product.price}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default MainContent;
