import { useState, useEffect } from "react";
import { IoMdAdd, IoMdTrash, IoMdCreate } from "react-icons/io";

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
          color: "#0db7ed", // Docker blue
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
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <section className="flex-1 overflow-hidden">
        <h5 className="text-md font-semibold mb-2 text-gray-800 dark:text-gray-100 uppercase tracking-wide">
          Categories
        </h5>

        {/* Category List */}
        <div className="grid grid-cols-3 gap-2">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="p-2 rounded-md shadow-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 relative"
            >
              <span
                className="absolute w-3 h-3 rounded-full top-2 right-2"
                style={{ backgroundColor: cat.color }}
              ></span>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                {cat.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {cat.description}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(cat)}
                  type="button"
                  className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <IoMdCreate />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  type="button"
                  className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  <IoMdTrash className="text-lg me-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
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
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <IoMdAdd className="text-white font-bold" /> Add
          </button>
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
              <button
                onClick={resetForm}
                className="px-4 py-2 text-sm rounded-md bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCategory}
                className="px-4 py-2 text-sm rounded-md bg-blue-600 hover:bg-blue-700 text-white"
              >
                {editingCategory ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
