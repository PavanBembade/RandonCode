import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();

  const Id = useParams();
  return (
    <div className="">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => navigate(-1)}
      >
        Back {Id.id}
      </button>
    </div>
  );
};

export default Products;
