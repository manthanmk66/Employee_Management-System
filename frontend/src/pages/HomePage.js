import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";

const HomePage = () => {
  const [empData, setEmpData] = useState([]);

  const getAllData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL.replace(
          "https",
          "http"
        )}/getallUsers`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setEmpData(response.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      // Send a DELETE request to the backend API endpoint with the user ID
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/deleteUser/${userId}`
      );

      // Check if the deletion was successful
      if (response.status === 200) {
        console.log("User deleted successfully");
        toast.success("User deleted successfully", { position: "top-center" });
        // Refresh the employee data after deletion
        getAllData();
      } else {
        console.log("Failed to delete user");
        toast.error("Failed to delete user", { position: "top-center" });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user", { position: "top-center" });
    }
  };

  const handleEdit = (id) => {
    
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <>
      <section className="container px-4 mx-auto py-4">
        <ToastContainer />
        <div className="flex items-start justify-between">
          <ToastContainer />
          <div>
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              Employees
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              This is a list of all employees. You can add new employees, edit
              or delete existing ones.
            </p>
          </div>
          <Link to={"/addemployee"}>
            <div>
              <button className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold leading-7 text-white hover:bg-indigo-500 ">
                Add Employee
              </button>
            </div>
          </Link>
        </div>
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <span>Employee</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Title
                      </th>

                      <th
                        scope="col"
                        className="px-4  py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Edit
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Delete
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {empData?.data &&
                      empData.data.map((person) => (
                        <tr key={person.name}>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={person.image}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {person.name}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-300">
                                  {person.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-12 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {person.title}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-300">
                              {person.department}
                            </div>
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {person.role}
                          </td>
                          <td>
                            <button
                              className="text-black px-4 py-2 rounded-md bg-yellow-400"
                              onClick={() => handleEdit(person.id)}
                            >
                              Edit
                            </button>
                          </td>
                          <td>
                            <button
                              className="text-black px-4 py-2 rounded-md bg-yellow-400"
                              onClick={() => handleDelete(person._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
