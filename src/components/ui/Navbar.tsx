import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-4 bg-blue-500 text-white flex justify-between">
      <h1 className="text-xl font-bold">Hospital Management System</h1>
      <Link href="/users">
        <button className="bg-white text-blue-500 px-4 py-2 rounded-md">Manage Users</button>
      </Link>
    </nav>
  );
}
