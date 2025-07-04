import Card from "../components/ui/Card";
import { MdContentCopy } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { useState } from "react";

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
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 ">
      {/* Cards Section */}
      <section className="mb-2">
        <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Technologies
        </h5>
        <div className="flex flex-wrap gap-1">
          {techList.slice(0, 25).map((tech, index) => (
            <Card key={index} title={tech} />
          ))}
        </div>
      </section>

      {/* Commands Section */}
      <section className="flex-1 overflow-hidden">
        <h5 className="text-lg font-semibold mb-1 text-gray-800 dark:text-gray-100">
          Recent Commands
        </h5>
        <div className="overflow-y-auto max-h-[45vh] pr-1 ">
          {devCommands.map((cmd, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-black text-white px-4 py-2 my-1 rounded-md transition-colors duration-300 ease-in-out hover:text-green-500"
            >
              <p className="text-sm font-mono break-words">{cmd}</p>
              {/* <button
                onClick={() => handleCopy(cmd, index)}
                className="ml-3 text-white hover:text-green-400"
                title="Copy"
              >
                {copiedIndex === index ? (
                  <TiTick className="text-green-500" />
                ) : (
                  <MdContentCopy />
                )}
              </button> */}
              <button
                onClick={() => handleCopy(cmd, index)}
                className="ml-3 text-white hover:text-green-500 flex items-center gap-1"
                title="Copy"
              >
                {copiedIndex === index ? (
                  <>
                    <TiTick className="text-green-50" />
                    <span className="text-xs text-green-500">Copied!</span>
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
      <footer className="sticky bottom-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search"
            className="w-full  p-2.5 text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            type="button"
            className="w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Default
          </button>
          <button
            type="button"
            className="w-full md:w-auto text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
          >
            Export 
          </button>
          
        </div>
      </footer>
    </div>
  );
};

export default Home;
