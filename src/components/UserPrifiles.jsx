import { useEffect, useState, useMemo } from "react";

export default function UserPrifiles() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncingsTerm, setDebouncingsTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncingsTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Filtered users with useMemo to avoid recalculating on every keystroke
  const filteredUsers = useMemo(() => {
    const lowerSearch = debouncingsTerm.toLowerCase();
    return users.filter((user) =>
      user.name.toLowerCase().includes(lowerSearch)
    );
  }, [users, debouncingsTerm]);

  return (
    <div className="max-w-[600px] mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>

      {/* Search Input */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name..."
        className="w-full p-2 mb-4 border rounded"
        aria-label="Search users by name"
      />

      {/* Loading State */}
      {loading && <p className="text-blue-500">Loading users...</p>}

      {/* Error State */}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* User List */}
      {!loading && !error && filteredUsers.length === 0 && (
        <p className="text-gray-500">No users found.</p>
      )}

      <ul className="space-y-3">
        {filteredUsers.map((user) => (
          <li
            key={user.id}
            className="p-3 border rounded hover:bg-gray-50 transition"
          >
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
