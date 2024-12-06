import { useState, useEffect, useRef } from "react";

import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

import {
  FaEdit,
  FaLink,
  FaBell,
  FaShareAlt,
  FaEnvelope,
  FaBan,
  FaTrash,
} from "react-icons/fa";

import useAllPostDataStore from "../store/useAllPostDataStore";


function ActionMenu({ actionText, id, type }) {
  const {fetchAllPostedData}=useAllPostDataStore()
  
 const router=useRouter()
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        actionText(""); // Call actionText function with an empty string
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [actionText]);


  const handleDelete = async () => {
    try {
      const token = Cookies.get("token"); // Get token from cookies
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/${id}`, {
        method: "DELETE", // Use DELETE HTTP method
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in headers
        },
      });
  
      if (!response.ok) {
        alert("error")
        throw new Error("Failed to delete the image");
      }
      const result = await response.json();
      alert("Delete SuccessFully")
      fetchAllPostedData(`${process.env.NEXT_PUBLIC_API_URL}/posts/published?type=${type}&limit=15&page=1`, 'Article');
      
  
      // Optionally: Update state or refetch data after delete
    } catch (error) {
      console.error("Error during delete:", error.message);
    }
  };

  return (
    <div className="relative inline-block" ref={menuRef}>
      {/* Toggle Button */}

      {/* Dropdown Menu */}

      <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-10 text-xs">
        <ul>
          {/* <li className="py-2 px-4 hover:bg-gray-100 hover:text-blue-700">
            <a href="#" className="flex group items-center">
              <FaEdit className="w-3 h-3 transition-all duration-100 mr-2" />
              Create AI Web Story
            </a>
          </li>
          <li className="py-2 px-4 hover:bg-gray-100 hover:text-blue-700">
            <a href="#" className="flex group items-center">
              <FaLink className="w-3 h-3 transition-all duration-100 mr-2" />
              Edit Permalink
            </a>
          </li>
          <li className="py-2 px-4 hover:bg-gray-100 hover:text-blue-700">
            <a href="#" className="flex group items-center">
              <FaBell className="w-3 h-3 transition-all duration-100 mr-2" />
              Push Notification
            </a>
          </li>
          <li className="py-2 px-4 hover:bg-gray-100 hover:text-blue-700">
            <a href="#" className="flex group items-center">
              <FaShareAlt className="w-3 h-3 transition-all duration-100 mr-2" />
              Distribute Post
            </a>
          </li>
          <li className="py-2 px-4 hover:bg-gray-100 hover:text-blue-700">
            <a href="#" className="flex group items-center">
              <FaEnvelope className="w-3 h-3 transition-all duration-100 mr-2" />
              Send Newsletter
            </a>
          </li>
          <li className="py-2 px-4 hover:bg-gray-100 hover:text-blue-700">
            <a href="#" className="flex group items-center">
              <FaBan className="w-3 h-3 transition-all duration-100 mr-2" />
              Unpublish
            </a>
          </li> */}
          <li className="py-2 px-4 hover:bg-gray-100 hover:text-blue-700">
            <button
              type="button"
              className="flex group items-center"
              onClick={handleDelete}
              
            >
              <FaTrash className="w-3 h-3 transition-all duration-100 mr-2" />
              Delete
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ActionMenu;
