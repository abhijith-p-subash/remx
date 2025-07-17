import Card from "../components/ui/Card";
import { MdContentCopy } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { invoke } from "@tauri-apps/api/core";

type User = {
  id: number;
  name: string;
  age: number;
};

const techList = [
  "Docker",
  "npm",
  "Python",
  "JavaScript",
  "Rust",
  "TypeScript",
  "Node.js",
  "React",
  "Next.js",
  "Vite",
  "Bun",
  "Go",
  "C",
  "C++",
  "Java",
  "Kotlin",
  "Swift",
  "Tailwind CSS",
  "PostgreSQL",
  "MongoDB",
  "SQLite",
  "Redis",
  "Git",
  "GitHub Actions",
  "Linux",
  "Bash",
  "GraphQL",
  "REST API",
  "WebAssembly",
  "Tauri",
  "Electron",
  "Zig",
  "Astro",
  "Svelte",
  "Vue.js",
  "Deno",
];

const devCommands = [
  "npm install",
  "yarn dev",
  "cargo build",
  "pip install requests",
  "go run main.go",
  "git clone https://github.com/user/repo.git",
  "git status",
  "git checkout -b feature-branch",
  "git pull origin main",
  "git log --oneline --graph --decorate --all",
  "git reset --hard origin/main",
  "docker build -t myapp .",
  "docker run -p 3000:3000 myapp",
  "docker-compose up",
  "docker exec -it container_name bash",
  "docker run --rm -v $(pwd):/app -w /app node:18 npm install",
  "gcc -Wall -Wextra -o build/app src/main.c src/utils.c -I./include",
  "make clean && make all",
  "cargo run --release --features gui",
  "cargo test --all --no-fail-fast -- --nocapture",
  "npm run lint",
  "pytest tests/",
  "eslint src/**/*.{js,ts,jsx,tsx} --fix",
  "jest --coverage --watchAll",
];

const Home = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const loadUsers = async () => {
    const result = await invoke<User[]>("get_users_cmd");
    setUsers(result);
  };

  const addUser = async () => {
    await invoke("create_user_cmd", { name, age: parseInt(age) });
    await loadUsers();
    setName("");
    setAge("");
  };

  const deleteUser = async (id: number) => {
    await invoke("delete_user_cmd", { id });
    await loadUsers();
  };
  useEffect(() => {
    loadUsers();
  }, []);

  const handleCopy = async (cmd: string, index: number) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-white">

      {/* <div>
      <h1>SQLite CRUD</h1>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input value={age} onChange={e => setAge(e.target.value)} placeholder="Age" />
      <button onClick={addUser}>Add User</button>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.age}) <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div> */}

      {/* Technologies Section */}
      <section className="mb-4">
        <h5 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-2 uppercase tracking-wide">
          Tags
        </h5>
        <div className="flex flex-wrap gap-1">
          {techList.slice(0, 25).map((tech, index) => (
            <Card key={index} title={tech} />
          ))}
        </div>
      </section>

      {/* Recent Commands Section */}
      <section className="flex-1 overflow-hidden">
        <h5 className="text-md font-semibold mb-2 text-gray-900 dark:text-gray-100 uppercase tracking-wide">
          Recent
        </h5>
        <div className="overflow-y-auto max-h-[47vh] pr-1 space-y-1 custom-scroll">
          {devCommands.map((cmd, index) => (
            <div
              key={index}
              className="group flex justify-between items-center bg-gray-100 dark:bg-black text-gray-800 dark:text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              <p className="text-sm font-mono break-words group-hover:text-green-600 dark:group-hover:text-green-400 transition">
                {cmd}
              </p>
              <button
                onClick={() => handleCopy(cmd, index)}
                className="ml-3 text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 flex items-center gap-1 text-sm"
                title="Copy"
              >
                {copiedIndex === index ? (
                  <>
                    <TiTick className="text-green-600 dark:text-green-400" />
                    <span className="text-xs">Copied</span>
                  </>
                ) : (
                  <MdContentCopy />
                )}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Sticky Bar */}
      <footer className="sticky bottom-0 w-full border-t border-gray-300 dark:border-gray-700 py-3 mt-4 bg-white dark:bg-gray-900">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-3 py-2 text-sm rounded-md border bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          <Button type="button">Default</Button>
          <Button type="button" color="green">
            Export
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Home;
