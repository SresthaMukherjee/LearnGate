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
import { Search, BookOpen, Users, Trophy, Star, Clock, User, Menu, X, ChevronRight, Play, Zap, Target, Award } from "lucide-react";

function StudentHomePage() {
  // Contexts and Navigation
  const { studentViewCoursesList, setStudentViewCoursesList } =
    useContext(StudentContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  // Local State
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
      if (response?.success) {
        if (response?.data) {
          navigate(`/course-progress/${getCurrentCourseId}`);
        } else {
          navigate(`/course/details/${getCurrentCourseId}`);
        }
      } else {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Modern Navbar */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                LearnGate
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* <Link to="/student-courses" className="text-white hover:text-blue-300 transition-colors flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link> */}
              <Link to="/aboutus" className="text-white hover:text-blue-300 transition-colors">
                About
              </Link>
              {!auth?.user ? (
                <Link to="/auth">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none">
                    Login
                  </Button>
                </Link>
              ) : (
                <Link to="/student-courses" >
                  <div className="flex items-center space-x-3">

                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-white font-medium">
                      Hello, {auth?.user?.userName?.split(' ')[0]?.toUpperCase() || "User"}
                    </span>

                  </div>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-blue-300 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-white/20 py-4">
              <div className="flex flex-col space-y-4">
                <Link to="/student-courses" className="text-white hover:text-blue-300 transition-colors">
                  Profile
                </Link>
                <Link to="/aboutus" className="text-white hover:text-blue-300 transition-colors">
                  About
                </Link>
                {!auth?.user ? (
                  <Link to="/auth">
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none w-full">
                      Login
                    </Button>
                  </Link>
                ) : (
                  <span className="text-white font-medium">
                    Hello, {auth?.user?.userName?.split(' ')[0]?.toUpperCase() || "User"}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                  Learning that
                  <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    {" "}transforms
                  </span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Master new skills with our cutting-edge courses. Learn from industry experts and build your future today.
                </p>
              </div>

              <div className="relative z-10 pointer-events-auto">
                <button
                  onClick={() => navigate("/courses")}
                  className="flex items-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg px-8 py-6 rounded-xl transition-all duration-300"
                  type="button"
                >
                  Explore Courses
                  <ChevronRight className="ml-2 h-5 w-5" />
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">10K+</div>
                  <div className="text-gray-400">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">500+</div>
                  <div className="text-gray-400">Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">98%</div>
                  <div className="text-gray-400">Success Rate</div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl opacity-20 blur-3xl" />
                <img
                  src="/Banner1.png"
                  alt="Learning illustration"
                  className="relative z-10 w-full h-auto rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose LearnGate?</h2>
            <p className="text-gray-300 text-lg">Experience the future of online learning</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-300">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Fast Learning</h3>
              <p className="text-gray-300">Accelerate your learning with our optimized curriculum and interactive content.</p>
            </div>

            <div className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Focused Learning</h3>
              <p className="text-gray-300">Personalized learning paths designed to match your goals and skill level.</p>
            </div>

            <div className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-green-500/50 transition-all duration-300">
              <div className="bg-gradient-to-r from-green-500 to-teal-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Certified Learning</h3>
              <p className="text-gray-300">Earn industry-recognized certificates upon course completion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Explore Categories</h2>
            <p className="text-gray-300 text-lg">Choose from our wide range of course categories</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {courseCategories.map((categoryItem, index) => (
              <button
                key={categoryItem.id}
                onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
                className={`group p-6 rounded-2xl border border-white/10 transition-all duration-300 hover:scale-105 ${index % 4 === 0 ? 'bg-gradient-to-br from-blue-500/20 to-purple-600/20 hover:from-blue-500/30 hover:to-purple-600/30' :
                  index % 4 === 1 ? 'bg-gradient-to-br from-purple-500/20 to-pink-600/20 hover:from-purple-500/30 hover:to-pink-600/30' :
                    index % 4 === 2 ? 'bg-gradient-to-br from-green-500/20 to-teal-600/20 hover:from-green-500/30 hover:to-teal-600/30' :
                      'bg-gradient-to-br from-orange-500/20 to-red-600/20 hover:from-orange-500/30 hover:to-red-600/30'
                  }`}
              >
                <div className="text-center">
                  <BookOpen className="h-8 w-8 text-white mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <span className="text-white font-medium">{categoryItem.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Featured Courses</h2>
            <p className="text-gray-300 text-lg">Discover our most popular and newest courses</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {isLoading ? (
              Array(4).fill(0).map((_, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden animate-pulse">
                  <div className="h-48 bg-gradient-to-r from-blue-500/20 to-purple-600/20" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-white/10 rounded" />
                    <div className="h-3 bg-white/10 rounded w-3/4" />
                    <div className="h-3 bg-white/10 rounded w-1/2" />
                  </div>
                </div>
              ))
            ) : sortedCourses && sortedCourses.length > 0 ? (
              sortedCourses
                .slice(0, 8)
                .map((courseItem, index) => (
                  <div
                    key={courseItem?._id}
                    onClick={() => handleCourseNavigate(courseItem?._id)}
                    className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-blue-500/50 transition-all duration-300 cursor-pointer hover:scale-105"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={courseItem?.image}
                        alt={courseItem?.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-full p-2">
                        <Star className="h-4 w-4 text-yellow-400" />
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-bold text-lg text-white mb-2 group-hover:text-blue-300 transition-colors line-clamp-2">
                        {courseItem?.title}
                      </h3>
                      <p className="text-gray-300 text-sm mb-3 flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {courseItem?.instruct}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-white">
                          ${courseItem?.pricing}
                        </span>
                        <div className="flex items-center space-x-2 text-gray-400">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">2-3 hours</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="col-span-full text-center py-20">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Courses Found</h3>
                <p className="text-gray-400">Check back later for new courses</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-3xl p-12 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Learning?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of students who are already transforming their careers with LearnGate.
            </p>
            <Button
              onClick={() => navigate("/courses")}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none text-lg px-8 py-6 rounded-xl"
            >
              Get Started Today
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">LearnGate</span>
              </div>
              <p className="text-gray-400">Empowering learners worldwide with quality education and innovative courses.</p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/courses" className="text-gray-400 hover:text-white block transition-colors">All Courses</Link>
                <Link to="/about" className="text-gray-400 hover:text-white block transition-colors">About Us</Link>
                <Link to="/contact" className="text-gray-400 hover:text-white block transition-colors">Contact</Link>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <div className="space-y-2">
                <Link to="/help" className="text-gray-400 hover:text-white block transition-colors">Help Center</Link>
                <Link to="/faq" className="text-gray-400 hover:text-white block transition-colors">FAQ</Link>
                <Link to="/community" className="text-gray-400 hover:text-white block transition-colors">Community</Link>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibizer mb-4">Legal</h3>
              <div className="space-y-2">
                <Link to="/privacy" className="text-gray-400 hover:text-white block transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="text-gray-400 hover:text-white block transition-colors">Terms of Service</Link>
                <Link to="/cookies" className="text-gray-400 hover:text-white block transition-colors">Cookie Policy</Link>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2024 LearnGate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default StudentHomePage;