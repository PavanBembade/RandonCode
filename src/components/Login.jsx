import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext/AuthContext";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!userName || !password) {
      alert("please fill the form");
      return;
    }
    const userData = { userName, password };
    login(userData); // ✅ update context immediately
    navigate("/"); // ✅ works first time
  };

  return (
    <div className="w-full h-full flex items-center justify-center ">
      <form
        onSubmit={handleLogin}
        className="p-4 max-w-md w-full shadow-md bg-white rounded border border-gray-200"
      >
        <div className="flex flex-col gap-3">
          <h2 className="m-2 text-center text-md font-medium">Login</h2>
          <div className="flex flex-col gap-1">
            <label className="text-md font-normal">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="w-full border rounded px-3 py-1"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-md font-normal">Password</label>
            <input
              type="text"
              placeholder="Enter Password"
              className="w-full border rounded px-3 py-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-end">
            <a className="font-normal text-sm">Forgot Password</a>
          </div>
          <div>
            <button className="cursor-pointer px-4 py-1 rounded bg-blue-400 text-white text-md font-normal ">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
