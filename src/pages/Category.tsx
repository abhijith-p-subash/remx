import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Toast } from "flowbite-react";
import { IoMdAdd } from "react-icons/io";
import { IoChevronBack } from "react-icons/io5";
import { MdContentCopy, MdDownload } from "react-icons/md";
import { useState } from "react";
import { TiTick } from "react-icons/ti";

const npmCommands = [
  {
    cmd: "npm init",
    description:
      "Initialize a new Node.js project and create a package.json file",
  },
  {
    cmd: "npm install",
    description: "Install all dependencies listed in package.json",
  },
  {
    cmd: "npm install <package>",
    description: "Install a specific package and add it to dependencies",
  },
  {
    cmd: "npm install -D <package>",
    description: "Install a package as a development dependency",
  },
  {
    cmd: "npm uninstall <package>",
    description: "Remove a package from the project",
  },
  {
    cmd: "npm update",
    description:
      "Update all packages to their latest versions based on version ranges",
  },
  { cmd: "npm outdated", description: "List outdated packages" },
  {
    cmd: "npm run <script>",
    description: "Run a script defined in package.json",
  },
  { cmd: "npm test", description: "Run the test script" },
  { cmd: "npm start", description: "Run the start script" },
  {
    cmd: "npm publish",
    description: "Publish the package to the npm registry",
  },
  { cmd: "npm login", description: "Authenticate with the npm registry" },
  { cmd: "npm logout", description: "Log out of the npm registry" },
  { cmd: "npm cache clean --force", description: "Clear the npm cache" },
  {
    cmd: "npm config list",
    description: "Show current npm configuration settings",
  },
  {
    cmd: "npm list",
    description: "Show installed packages in the current project",
  },
  { cmd: "npm list -g", description: "List globally installed npm packages" },
  {
    cmd: "npm audit",
    description: "Scan the project for security vulnerabilities",
  },
  {
    cmd: "npm audit fix",
    description: "Automatically fix vulnerabilities where possible",
  },
  {
    cmd: "npm ci",
    description: "Clean install from package-lock.json for consistent builds",
  },
  {
    cmd: "docker run -d -p 3000:3000 --name my-app --env NODE_ENV=production -v $(pwd):/app node:18-alpine npm start",
    description:
      "Run a Node.js container in detached mode with port binding, environment variables, volume mounting, and automatic npm start",
  },
];

const Category = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showCopiedAlert, setShowCopiedAlert] = useState(false);

  const handleCopy = async (cmd: string, index: number) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedIndex(index);
      setShowCopiedAlert(true);
      setTimeout(() => {
        setCopiedIndex(null);
        setShowCopiedAlert(false);
      }, 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <>
      {showCopiedAlert && (
        <div className="fixed bottom-24 right-4 z-50">
          <Toast className="!bg-green-600 !text-white">
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-800 text-green-200">
              <TiTick className="text-white h-5 w-5" />
            </div>

            <div className="ml-3 text-sm font-normal">
              Command copied to clipboard
            </div>
          </Toast>
        </div>
      )}

      <div className="min-h-screen flex flex-col">
        <section className="flex-1 overflow-hidden">
          <div
            className="flex items-center gap-2 mb-2 bg-gray-800 p-2 rounded-md shadow-sm "
          >
            <Button onClick={() => navigate(-1)} size="sm" color="gray">
              <IoChevronBack className="text-lg" />
            </Button>

            <h5 className="text-md font-semibold  text-gray-800 dark:text-gray-100 uppercase tracking-wide">
              Docker {id}
            </h5>
          </div>

          {/* Category List */}
          <div className="overflow-y-auto max-h-[calc(100vh-160px)] px-1">
            <div>
              {npmCommands.map((cmdItem, index) => (
                <Card key={index} className="max-w-full mb-3 p-0">
                  <p className="font-normal text-gray-400">
                    {cmdItem.description}
                  </p>
                  <div
                    onClick={() => handleCopy(cmdItem.cmd, index)}
                    className="cursor-pointer group flex justify-between items-center  text-white  rounded-md transition-colors duration-200"
                  >
                    <h5 className="text-lg font-bold font-mono break-words text-green-400 group-hover:text-green-300 transition">
                      {cmdItem.cmd}
                    </h5>
                  </div>
                </Card>
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
              className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <Button color="green">
              <MdDownload className="mr-2 h-5 w-5" />
              Export
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
    </>
  );
};

export default Category;
