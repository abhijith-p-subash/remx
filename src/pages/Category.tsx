import { useParams } from "react-router-dom";
import { Button, Card } from "flowbite-react";
import { IoMdAdd } from "react-icons/io";

const Category = () => {
  const { id } = useParams();
  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex-1 overflow-hidden">
        <h5 className="text-md font-semibold mb-2 text-gray-800 dark:text-gray-100 uppercase tracking-wide">
          Category {id}
        </h5>

        {/* Category List */}
        <div className="overflow-y-auto max-h-[calc(102vh-160px)] px-1">
          <div className="grid grid-cols-4 gap-2"></div>
        </div>
      </section>

      {/* Bottom Bar */}
      <footer className="sticky bottom-0 w-full border-t border-gray-300 dark:border-gray-700 py-3 mt-4 bg-gray-100 dark:bg-gray-900">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <Button
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <IoMdAdd className="text-white font-bold" /> Add
          </Button>
        </div>
      </footer>

      {/* Modal */}
      {/* <Modal show={openModal} size="md" onClose={() => setOpenModal(false)}>
        <ModalHeader>{editingCategory ? "Update" : "Add"} Category</ModalHeader>

        <ModalBody>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name">Name</Label>
              </div>
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
              <div className="mb-2 block">
                <Label htmlFor="description">Description</Label>
              </div>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
              ></Textarea>
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
      </Modal> */}
    </div>
  );
};

export default Category;
