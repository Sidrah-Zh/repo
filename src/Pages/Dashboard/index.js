import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "../../Components/Input";
import { Button } from "../../Components/Button/Index";

const logRequest = (method, data) => {
  console.log(`[${method}] Request:`);
  console.log(data);
};

const Dashboard = () => {
  const arr = [
    {
      id: 1,
      title: "Intro to CSS",
      author: "Adam",
    },
    {
      id: 2,
      title:
        "A Long and Winding Tour of the History of UI Frameworks and Tools and Impact on the Design",
      author: "Adam",
    },
    {
      id: 3,
      title: "This is for Testing",
      author: "Ahmad",
    },
  ];

  const [items, setItems] = useState(arr);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const handleClick = (e) => {
    e.preventDefault();
    let obj = {
      title: title,
      author: author,
    };

    logRequest("POST", obj); // Log the POST request before sending

    axios
      .post("https://jsonplaceholder.typicode.com/posts", obj)
      .then((response) => {
        const newItem = {
          id: response.data.id,
          title: response.data.title,
          author: response.data.author,
        };

        const updatedItems = [newItem, ...items.slice(0, 9)];
        const sequentialItems = updatedItems.map((item, index) => ({
          ...item,
          id: index + 1,
        }));

        setItems(sequentialItems);
        setIsModalOpen(false);
        reset();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleEdit = (id) => {
    const find = items.find((item) => item.id === id);
    setTitle(find.title);
    setAuthor(find.author);

    logRequest("PUT", { id, title, author }); // Log the PUT request before sending

    setIsModalOpen(true);
  };

  const reset = () => {
    setTitle("");
    setAuthor("");
  };

  const handleDelete = (id) => {
    logRequest("DELETE", { id }); // Log the DELETE request before sending

    const filter = items.filter((item) => item.id !== id);
    setItems(filter);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    reset();
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border border-gray-300 bg-slate-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <Button
          type="submit"
          size="large"
          className=""
          onClick={() => setIsModalOpen(true)}
        >
          Add
        </Button>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-gray-600">ID</th>
              <th className="px-4 py-2 text-gray-600">Title</th>
              <th className="px-4 py-2 text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.slice(0, 10).map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-500 px-4 py-2 text-gray-600 font-medium">
                  {item.id}
                </td>
                <td className="border border-gray-500 px-4 py-2 text-gray-600 font-medium">
                  {item.title}
                </td>
                <td className="border border-gray-500 px-4 py-2 text-gray-600 font-medium">
                  <div className="flex justify-center items-center">
                    <Button
                      type="button"
                      size="large"
                      className="mr-3"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      size="large"
                      variant="danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CreateModal
        setIsModalOpen={handleModalClose}
        isModalOpen={isModalOpen}
        handleClick={handleClick}
        setTitle={setTitle}
        setAuthor={setAuthor}
        title={title}
        author={author}
      />
    </div>
  );
};

export default Dashboard;

function CreateModal({
  isModalOpen,
  handleModalClose,
  handleClick,
  title,
  setTitle,
  author,
  setAuthor,
}) {
  return (
    <div
      id="authentication-modal"
      aria-hidden="true"
      className={`fixed flex justify-center items-center z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${
        isModalOpen ? "" : "hidden"
      }`}
    >
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-gray-300 rounded-lg shadow ">
          <button
            onClick={handleModalClose}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="authentication-modal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 ">
              Sign in to our platform
            </h3>
            <form className="space-y-6" onSubmit={handleClick}>
              <div className="mb-6">
                <Input
                  label="Title"
                  name="title"
                  id="title"
                  value={title}
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <Input
                  label="Author"
                  name="author"
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>

              <div className="flex justify-center items-center">
                <Button type="submit" size="large" className="mr-3">
                  Add
                </Button>
                <Button
                  type="button"
                  size="large"
                  variant="danger"
                  onClick={handleModalClose}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
