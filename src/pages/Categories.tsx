import { useState, useEffect } from "react";
import { Button, Dropdown, DropdownItem, Card } from "flowbite-react";
import { IoMdAdd, IoMdTrash, IoMdCreate } from "react-icons/io";
import { FaEllipsis } from "react-icons/fa6";

interface Category {
  id: number;
  name: string;
  description: string;
  color: string;
}

const Categories = () => {
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#10b981");
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (categories.length === 0) {
      setCategories([
        {
          id: Date.now(),
          name: "Docker",
          description: "Containerization platform",
          color: "#0db7ed",
        },
        {
          id: Date.now() + 1,
          name: "Kubernetes",
          description: "Container orchestration system",
          color: "#326ce5",
        },
        {
          id: Date.now() + 2,
          name: "Git",
          description: "Version control system",
          color: "#f1502f",
        },
        {
          id: Date.now() + 3,
          name: "Node.js",
          description: "JavaScript runtime",
          color: "#68a063",
        },
        {
          id: Date.now() + 4,
          name: "React",
          description: "Frontend library",
          color: "#61dafb",
        },
        {
          id: Date.now() + 5,
          name: "Rust",
          description: "Systems programming language",
          color: "#dea584",
        },
        {
          id: Date.now() + 6,
          name: "Python",
          description: "High-level programming language",
          color: "#3572A5",
        },
        {
          id: Date.now() + 7,
          name: "Go",
          description: "Compiled programming language",
          color: "#00ADD8",
        },
        {
          id: Date.now() + 8,
          name: "TypeScript",
          description: "Typed superset of JavaScript",
          color: "#3178c6",
        },
        {
          id: Date.now() + 9,
          name: "Tailwind CSS",
          description: "Utility-first CSS framework",
          color: "#38bdf8",
        },
        {
          id: Date.now() + 10,
          name: "Linux",
          description: "Open-source OS",
          color: "#333",
        },
        {
          id: Date.now() + 11,
          name: "PostgreSQL",
          description: "Relational database",
          color: "#336791",
        },
        {
          id: Date.now() + 12,
          name: "MongoDB",
          description: "NoSQL database",
          color: "#4DB33D",
        },
        {
          id: Date.now() + 13,
          name: "Redis",
          description: "In-memory key-value store",
          color: "#d82c20",
        },
        {
          id: Date.now() + 14,
          name: "Nginx",
          description: "Web server and reverse proxy",
          color: "#009639",
        },
        {
          id: Date.now() + 15,
          name: "Firebase",
          description: "Backend-as-a-Service (BaaS)",
          color: "#FFCA28",
        },
        {
          id: Date.now() + 16,
          name: "Tauri",
          description: "Rust-powered desktop apps",
          color: "#ffc131",
        },
        {
          id: Date.now() + 17,
          name: "Vite",
          description: "Next-gen frontend tooling",
          color: "#646cff",
        },
        {
          id: Date.now() + 18,
          name: "GraphQL",
          description: "Query language for APIs",
          color: "#e535ab",
        },
        {
          id: Date.now() + 19,
          name: "OpenAI",
          description: "AI research and deployment company",
          color: "#10a37f",
        },
        {
          id: Date.now() + 7,
          name: "Go",
          description: "Compiled programming language",
          color: "#00ADD8",
        },
        {
          id: Date.now() + 8,
          name: "TypeScript",
          description: "Typed superset of JavaScript",
          color: "#3178c6",
        },
        {
          id: Date.now() + 9,
          name: "Tailwind CSS",
          description: "Utility-first CSS framework",
          color: "#38bdf8",
        },
        {
          id: Date.now() + 10,
          name: "Linux",
          description: "Open-source OS",
          color: "#333",
        },
        {
          id: Date.now() + 11,
          name: "PostgreSQL",
          description: "Relational database",
          color: "#336791",
        },
        {
          id: Date.now() + 7,
          name: "Go",
          description: "Compiled programming language",
          color: "#00ADD8",
        },
        {
          id: Date.now() + 8,
          name: "TypeScript",
          description: "Typed superset of JavaScript",
          color: "#3178c6",
        },
        {
          id: Date.now() + 9,
          name: "Tailwind CSS",
          description: "Utility-first CSS framework",
          color: "#38bdf8",
        },
        {
          id: Date.now() + 10,
          name: "Linux",
          description: "Open-source OS",
          color: "#333",
        },
        {
          id: Date.now() + 11,
          name: "PostgreSQL",
          description: "Relational database",
          color: "#336791",
        },
      ]);
    }
  }, []);

  const handleSaveCategory = () => {
    if (categoryName.trim()) {
      if (editingCategory) {
        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === editingCategory.id
              ? { ...cat, name: categoryName, description, color }
              : cat
          )
        );
      } else {
        setCategories((prev) => [
          ...prev,
          {
            id: Date.now(),
            name: categoryName,
            description,
            color,
          },
        ]);
      }
      resetForm();
    }
  };

  const handleEdit = (cat: Category) => {
    setEditingCategory(cat);
    setCategoryName(cat.name);
    setDescription(cat.description);
    setColor(cat.color);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  const resetForm = () => {
    setCategoryName("");
    setDescription("");
    setColor("#10b981");
    setEditingCategory(null);
    setShowModal(false);
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex-1 overflow-hidden">
        <h5 className="text-md font-semibold mb-2 text-gray-800 dark:text-gray-100 uppercase tracking-wide">
          Categories
        </h5>

        {/* Category List */}
        <div className="overflow-y-auto max-h-[calc(102vh-160px)] px-1">
          <div className="grid grid-cols-4 gap-2">
            {filteredCategories.map((cat) => (
              <div
                key={cat.id}
                className="cursor-pointer min-h-28 p-2 rounded-md shadow-md border border-b-4 border-gray-700  bg-gray-800 relative"
                style={{ borderBottomColor: cat.color }}
              >
                <div className="w-full flex justify-between">
                  {/* <span
                className="absolute w-3 h-3 rounded-full top-2 right-2"
                style={{ backgroundColor: cat.color }}
              ></span> */}
                  <h3 className="truncate text-lg font-bold text-gray-800 dark:text-white">
                    {cat.name}
                  </h3>

                  <Dropdown
                    label=""
                    dismissOnClick={false}
                    renderTrigger={() => (
                      <span>
                        <button>
                          <FaEllipsis />
                        </button>
                      </span>
                    )}
                  >
                    <DropdownItem onClick={() => handleEdit(cat)}>
                      <IoMdCreate className="text-lg me-1" /> Edit
                    </DropdownItem>
                    <DropdownItem onClick={() => handleDelete(cat.id)}>
                      <IoMdTrash className="text-lg me-1" /> Delete
                    </DropdownItem>
                  </Dropdown>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {cat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Bar */}
      <footer className="sticky bottom-0 w-full border-t border-gray-300 dark:border-gray-700 py-3 mt-4 bg-gray-100 dark:bg-gray-900">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <Button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <IoMdAdd className="text-white font-bold" /> Add
          </Button>
        </div>
      </footer>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={resetForm}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              {editingCategory ? "Edit" : "Add"} Category
            </h2>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Name
              </label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Color
              </label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-16 cursor-pointer"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                onClick={resetForm}
                className="px-4 py-2 text-sm rounded-md bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveCategory}
                className="px-4 py-2 text-sm rounded-md bg-blue-600 hover:bg-blue-700 text-white"
              >
                {editingCategory ? "Update" : "Add"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
