import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

// Dummy courses data
const courses = [
  { id: 1, name: "JavaScript for Beginners" },
  { id: 2, name: "Advanced React" },
  { id: 3, name: "Introduction to Python" },
  { id: 4, name: "Full Stack Development" },
];

const CourseSearch = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for the search input
  const [filteredCourses, setFilteredCourses] = useState(courses); // State for filtered courses

  // Handle the change in search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle the search button click or when the user types
  const handleSearch = () => {
    const result = courses.filter((course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCourses(result);
  };

  return (
    <div className="p-4">
      <div className="flex items-center space-x-2">
        {/* Search input field */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for a course..."
          className="p-2 rounded border"
        />
        {/* Search button with FaSearch icon */}
        <button
          onClick={handleSearch}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <FaSearch />
        </button>
      </div>

      {/* Display filtered courses */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Courses</h3>
        <ul>
          {filteredCourses.length === 0 ? (
            <li>No courses found</li>
          ) : (
            filteredCourses.map((course) => (
              <li key={course.id} className="py-2">
                {course.name}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default CourseSearch;
