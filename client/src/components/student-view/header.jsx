import { GraduationCap, Play, Search, Menu, X, User, LogOut, BookOpen, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/auth-context";

function StudentViewCommonHeader() {
  const navigate = useNavigate();
  const { resetCredentials } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="relative bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 shadow-lg">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-500/10 to-indigo-600/20 animate-pulse"></div>
      
      <div className="relative z-10">
        {/* Main header content */}
        <div className="flex items-center justify-between p-4 lg:px-8">
          {/* Logo section */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold text-white tracking-tight">LearnGate</h1>
                <p className="text-purple-200 text-sm">Your Learning Journey</p>
              </div>
            </div>
            
            {/* Desktop Explore Courses */}
            <div className="hidden lg:block ml-8">
              <Button
                variant="ghost"
                onClick={() => {
                  location.pathname.includes("/courses") ? null : navigate("/courses");
                }}
                className="text-white hover:bg-white/20 hover:text-white transition-all duration-300 backdrop-blur-sm border border-white/20 px-6 py-2 rounded-full"
              >
                <Search className="w-4 h-4 mr-2" />
                Explore Courses
              </Button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link 
              to="/Home" 
              className="flex items-center space-x-2 text-white hover:text-purple-200 transition-colors duration-300 group"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Home</span>
            </Link>
            
            <div
              onClick={() => navigate("/student-courses")}
              className="flex cursor-pointer items-center space-x-2 text-white hover:text-purple-200 transition-colors duration-300 group"
            >
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">My Courses</span>
            </div>
            
            <Button 
              onClick={handleLogout}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors duration-300 backdrop-blur-sm"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-purple-700 to-indigo-800 shadow-xl border-t border-white/20 backdrop-blur-md">
            <div className="p-4 space-y-4">
              {/* Mobile Explore Courses */}
              <Button
                variant="ghost"
                onClick={() => {
                  location.pathname.includes("/courses") ? null : navigate("/courses");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-white hover:bg-white/20 hover:text-white transition-all duration-300 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>Explore Courses</span>
              </Button>
              
              {/* Mobile Navigation Links */}
              <div className="space-y-3">
                <Link 
                  to="/Home" 
                  className="flex items-center space-x-3 text-white hover:text-purple-200 transition-colors duration-300 p-3 rounded-lg hover:bg-white/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Home className="w-5 h-5" />
                  <span className="font-medium">Home</span>
                </Link>
                
                <div
                  onClick={() => {
                    navigate("/student-courses");
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex cursor-pointer items-center space-x-3 text-white hover:text-purple-200 transition-colors duration-300 p-3 rounded-lg hover:bg-white/10"
                >
                  <Play className="w-5 h-5" />
                  <span className="font-medium">My Courses</span>
                </div>
                
                <Button 
                  onClick={handleLogout}
                  className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/20 backdrop-blur-sm transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default StudentViewCommonHeader;