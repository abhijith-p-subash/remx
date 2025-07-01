import Card from "../components/ui/Card";
import { MdContentCopy } from "react-icons/md";
import { useState } from "react";

const arr = [
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

  const handleCopy = async (cmd: string, index: number) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Top Section: Cards */}
      <div className="p-4 overflow-y-auto max-h-[25vh]">
        <div className="flex flex-wrap gap-2">
          {arr.map((data, index) => (
            <Card key={index} title={data} />
          ))}
        </div>
      </div>

      {/* Middle Section: Scrollable Commands */}
      {/* Middle Section: Scrollable Commands */}
      <div className="flex-1 overflow-y-auto px-4 pb-36">
        <h5 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
          Recent Commands
        </h5>
        {devCommands.map((cmd, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-black text-white px-4 py-2 my-1 rounded-lg"
          >
            <p className="text-sm font-mono break-all">{cmd}</p>
            <button
              onClick={() => handleCopy(cmd, index)}
              className="text-white hover:text-green-400"
              title="Copy"
            >
              {copiedIndex === index ? "✅" : <MdContentCopy />}
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Section: Sticky Search Bar & Theme Buttons */}
      <div className="sticky bottom-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-8">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="col-span-12 md:col-span-4 flex flex-wrap justify-end gap-2 mt-2 md:mt-0">
            <button className="text-sm px-3 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800">
              Default
            </button>
            <button className="text-sm px-3 py-2 rounded-lg border border-gray-300 text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700">
              Alternative
            </button>
            <button className="text-sm px-3 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900">
              Dark
            </button>
            <button className="text-sm px-3 py-2 rounded-lg border border-gray-300 text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700">
              Light
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
