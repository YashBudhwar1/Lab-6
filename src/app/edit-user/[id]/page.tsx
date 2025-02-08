import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const EditUser = () => {
  const router = useRouter();
  const { id } = router.query; // Access the user ID from the URL
  const [user, setUser] = useState({ name: '', email: '', role: '' });
  const [loading, setLoading] = useState(true);

  // Fetch the user data when the page is loaded
  useEffect(() => {
    if (!id) return;
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${id}`);
      const data = await response.json();
      setUser(data);
      setLoading(false);
    };

    fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      alert("User updated successfully!");
      router.push("/users"); // Redirect to user list after update
    } else {
      alert("Failed to update user.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
      />
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
      />
      <label>Role:</label>
      <input
        type="text"
        name="role"
        value={user.role}
        onChange={handleChange}
      />
      <button type="submit">Update User</button>
    </form>
  );
};

export default EditUser;
