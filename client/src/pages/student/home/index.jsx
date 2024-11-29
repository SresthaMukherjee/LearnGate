import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { courseCategories } from "@/config";
import { StudentContext } from "@/context/student-context";
import { AuthContext } from "@/context/auth-context";
import {
  checkCoursePurchaseInfoService,
  fetchStudentViewCourseListService,
} from "@/services";

function StudentHomePage() {
  // Contexts and Navigation
  const { studentViewCoursesList, setStudentViewCoursesList } =
    useContext(StudentContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  // Local State
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Courses
  async function fetchAllStudentViewCourses() {
    try {
      setIsLoading(true);
      const response = await fetchStudentViewCourseListService();
      if (response?.success) {
        setStudentViewCoursesList(response?.data);
      } else {
        console.error("Failed to fetch courses.");
      }
    } catch (error) {
      console.error("An error occurred while fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Handle Navigation to Course Details or Progress
  async function handleCourseNavigate(getCurrentCourseId) {
    try {
      const response = await checkCoursePurchaseInfoService(
        getCurrentCourseId,
        auth?.user?._id
      );
      console.log(response)
      if (response?.success) {
        if (response?.data) {
          navigate(`/course-progress/${getCurrentCourseId}`);
        } else {
          navigate(`/course/details/${getCurrentCourseId}`);
        }
      }
      else{
        navigate(`/course/details/${getCurrentCourseId}`);
       }
    } catch (error) {
      navigate(`/course/details/${getCurrentCourseId}`);
    }
  }

  // Handle Category Filter Navigation
  function handleNavigateToCoursesPage(getCurrentId) {
    sessionStorage.removeItem("filters");
    const currentFilter = { category: [getCurrentId] };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/courses");
  }

  // Use Effect to Fetch Courses on Component Mount
  useEffect(() => {
    fetchAllStudentViewCourses();
  }, []);

  // Sorting Courses by Creation Date (most recent first)
  const sortedCourses = studentViewCoursesList.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="min-h-screen bg-gray-800">
      {/* Navbar */}
      <nav className="bg-gray-900 p-4">
  <div className="max-w-screen-xl mx-auto flex justify-between items-center">
    {/* Logo */}
    <div className="flex items-left ">
      <Link to="/home" className="flex items-center hover:text-black">
        <img
          src="/LearnGate_Logo.png"
          alt="LearnGate Logo"
          style={{ width: "250px", height: "auto" }}
          className="mr-4"
        />
      </Link>
    </div>

    {/* Navbar Links aligned to the right */}
    <ul className="flex space-x-5 items-center ml-auto">
      <li>
        <Link to="/student-courses" className="text-white hover:text-gray-300">
          Profile
        </Link>
      </li>
      <li>
        <Link to="/aboutus" className="text-white hover:text-gray-300">
          About
        </Link>
      </li>

      {/* Conditional rendering for login button */}
      {!auth?.user ? (
        <li>
          <Link to="/auth" className="text-white hover:text-gray-300">
            Login
          </Link>
        </li>
      ) : (
        // If user is logged in, show the greeting
        <li className="text-white">
          {auth?.user?.username ? `Hello, ${auth.user.username}` : "Hello, User"}
        </li>
      )}
    </ul>
  </div>
</nav>


      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg:px-8">
        <div className="lg:w-1/2 lg:pr-12">
          <h1 className="text-4xl font-bold mb-4 text-white">Learning that gets you</h1>
          <p className="text-xl text-gray-200">
            Skills for your present and your future. Get Started with Us
          </p>
        </div>
        <div className="lg:w-full mb-8 lg:mb-0">
          <img
            src="/Banner1.png"
            alt="Banner"
            width={500}
            height={500}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Course Categories Section */}
      <section className="py-8 px-4 lg:px-8 bg-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-white">Course Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {courseCategories.map((categoryItem) => (
            <Button
              className="justify-start"
              variant="outline"
              key={categoryItem.id}
              onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
            >
              {categoryItem.label}
            </Button>
          ))}
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-12 px-4 lg:px-8 bg-gray-900">
        <h2 className="text-2xl font-bold mb-6 text-white">Featured Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            <div className="text-indigo">Loading...</div>
          ) : sortedCourses && sortedCourses.length > 0 ? (
            sortedCourses
              .slice(0, 5) // Display only the top 5 most recent courses
              .map((courseItem) => (
                <div
                  key={courseItem?._id}
                  onClick={() => handleCourseNavigate(courseItem?._id)}
                  className="border rounded-lg overflow-hidden shadow cursor-pointer bg-gray-900 transition duration-300 ease-in-out hover:scale-105"
                >
                  <img
                    src={courseItem?.image}
                    width={300}
                    height={150}
                    className="w-auto h-auto object-cover"
                    alt={courseItem?.title}
                  />
                  <div className="p-4 bg-gray-900">
                    <h3 className="font-bold mb-2 text-indigo-500 hover:text-indigo-300 hover:font-extrabold">
                      {courseItem?.title}
                    </h3>
                    <p className="text-sm text-gray-300 mb-2 font-bold">
                      {courseItem?.instruct}
                    </p>
                    <p className="font-bold text-[16px] text-white hover:font-extrabold">
                      ${courseItem?.pricing}
                    </p>
                  </div>
                </div>
              ))
          ) : (
            <h1 className="text-white">No Courses Found</h1>
          )}
        </div>
      </section>

      {/* Footer Section */}
      <section>
        <div className="bg-gray-900 py-8">
          <div className="max-w-screen-xl mx-auto text-center text-white">
            <p className="text-sm mb-2">© 2024 LearnGate. All Rights Reserved.</p>
            <div className="space-x-6 mb-4">
              <Link  className="text-gray-400 hover:text-gray-200">
                Privacy Policy
              </Link>
              <Link  className="text-gray-400 hover:text-gray-200">
                Terms of Service
              </Link>
              <Link  className="text-gray-400 hover:text-gray-200">
                Contact Us
              </Link>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}

export default StudentHomePage;
