import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";

type User = {
  id: number;
  name: string;
  age: number;
};

const Settings = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const load = async () => {
    const result = await invoke<User[]>("get_users_cmd");
    setUsers(result);
  };

  const add = async () => {
    if (!name || !age) return;
    await invoke("create_user_cmd", { name, age: parseInt(age) });
    setName("");
    setAge("");
    load();
  };

  const remove = async (id: number) => {
    await invoke("delete_user_cmd", { id });
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 text-white shadow-xl rounded-2xl border border-gray-800">
      <h1 className="text-3xl font-bold text-center text-indigo-400 mb-6">
        User Manager
      </h1>

      <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-3 sm:space-y-0 mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="flex-1 px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          type="number"
          className="w-24 px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={add}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Add
        </button>
      </div>

      <ul className="divide-y divide-gray-700">
        {users.map((u) => (
          <li
            key={u.id}
            className="flex justify-between items-center py-2 px-2 hover:bg-gray-800 rounded"
          >
            <span className="text-gray-200 font-medium">{u.name}</span>
            <span className="text-gray-400 text-sm">({u.age} years)</span>
            <button
              onClick={() => remove(u.id)}
              className="ml-4 text-red-400 hover:text-red-600"
              title="Remove"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Settings;
