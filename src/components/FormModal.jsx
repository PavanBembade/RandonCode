import { useState } from "react";

function FormModal(props) {
  const { onClose, name } = props;

  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [mobileValue, setMobileValue] = useState("");
  const [userDate, setUserData] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!nameValue || !emailValue || !mobileValue) {
      alert("Please fill all fields");
      return;
    }
    const newUser = { name: nameValue, email: emailValue, mobile: mobileValue };
    const stored = localStorage.getItem("userDate");
    const arr = stored ? JSON.parse(stored) : [];
    const updatedArr = [...arr, newUser];
    localStorage.setItem("userDate", JSON.stringify(updatedArr));
    setUserData(updatedArr);
    onClose();
  }

  return (
    <div>
      <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
          <h2 className="text-xl font-semibold mb-4">{name}</h2>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="flex flex-col items-start">
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Enter your name"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Enter your email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start">
              <label className="block text-sm font-medium mb-2">Mobile</label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Enter your mobile number"
                value={mobileValue}
                onChange={(e) => setMobileValue(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Submit
              </button>
              <button
                type="button"
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormModal;
