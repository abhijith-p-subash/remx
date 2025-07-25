import { useState, useEffect } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
  Textarea,
  ModalFooter,
} from "flowbite-react";
import { IoMdAdd, IoMdTrash, IoMdCreate } from "react-icons/io";
import { FaEllipsis } from "react-icons/fa6";
import randomColor from "randomcolor";
import { useNavigate } from "react-router-dom";

interface Category {
  id: number;
  name: string;
  description: string;
  color: string;
}

const Categories = () => {
  const rColor = randomColor();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
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
            color: rColor,
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
    setOpenModal(true);
  };

  const handleDelete = (id: number) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  const resetForm = () => {
    setCategoryName("");
    setDescription("");
    setColor("#10b981");
    setEditingCategory(null);
    setOpenModal(false);
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
   <div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <section className="flex-1 overflow-hidden">
        <h5 className="text-md font-semibold mb-2 text-gray-900 dark:text-gray-100 uppercase tracking-wide">
          Categories
        </h5>

        {/* Category List */}
        <div className="overflow-y-auto max-h-[calc(102vh-160px)] px-1">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {filteredCategories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => navigate(`${cat.id}`)}
                className="cursor-pointer min-h-28 p-2 rounded-md shadow-md border border-b-4 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 relative"
                style={{ borderBottomColor: cat.color }}
              >
                <div className="w-full flex justify-between">
                  <h3 className="truncate text-lg font-bold text-gray-900 dark:text-white">
                    {cat.name}
                  </h3>
                  <div onClick={(e) => e.stopPropagation()}>
                    <Dropdown
                      label=""
                      dismissOnClick={false}
                      renderTrigger={() => (
                        <span>
                          <button className="cursor-pointer">
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
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
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
            className="w-full px-3 py-2 text-sm rounded-md border bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          <Button onClick={() => setOpenModal(true)}>
            <IoMdAdd className="mr-2 h-5 w-5" /> Add
          </Button>
        </div>
      </footer>

      {/* Modal */}
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)}>
        <ModalHeader>{editingCategory ? "Update" : "Add"} Category</ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <TextInput
                id="name"
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Category Name"
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="alternative" onClick={resetForm}>
            Cancel
          </Button>
          <Button onClick={handleSaveCategory}>
            {editingCategory ? "Update" : "Add"}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Categories;
