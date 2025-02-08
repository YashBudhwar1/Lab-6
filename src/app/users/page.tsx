"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Patient");
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  const addUser = async () => {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, role }),
    });
    if (res.ok) {
      fetchUsers();
      setName("");
      setEmail("");
      setRole("Patient");
    }
  };

  const deleteUser = async (id: string) => {
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  const editUser = (user: User) => {
    setEditingUserId(user._id);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
  };

  const updateUser = async () => {
    if (editingUserId) {
      const res = await fetch(`/api/users/${editingUserId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role }),
      });
      if (res.ok) {
        fetchUsers();
        setName("");
        setEmail("");
        setRole("Patient");
        setEditingUserId(null); // Reset the editing mode
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">User Management</h1>

      <div className="mb-6">
        <input
          className="border p-2 mr-2"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 mr-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <select
          className="border p-2 mr-2"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option>Patient</option>
          <option>Doctor</option>
          <option>Nurse</option>
          <option>Admin</option>
        </select>
        {editingUserId ? (
          <Button onClick={updateUser}>Update User</Button>
        ) : (
          <Button onClick={addUser}>Add User</Button>
        )}
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border">
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">
                <Button onClick={() => editUser(user)}>Edit</Button>
                <Button onClick={() => deleteUser(user._id)} variant="destructive">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
