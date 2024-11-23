import { GraduationCap, TvMinimalPlay, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/auth-context";

function StudentViewCommonHeader() {
  const navigate = useNavigate();
  const { resetCredentials } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }

  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
  }

  function handleSearch() {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  }

  return (
    <header className="flex items-center justify-between p-4 border-b relative">
      <div className="flex items-center space-x-4">
        
          
          <img
            src="/LearnGate_Logo.png"
            alt="LearnGate Logo"
            style={{ width: '200px', height: 'auto' }}
            className="mr-4"
          />
        
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            onClick={() => {
              location.pathname.includes("/courses")
                ? null
                : navigate("/courses");
            }}
            className="text-[14px] md:text-[16px] font-medium"
          >
            Explore Courses
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border rounded-md p-2 text-[14px] md:text-[16px] focus:outline-none"
          />
          <Button onClick={handleSearch} variant="ghost">
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>

      
              
      <div className="flex items-center space-x-4">
        <div className="flex gap-4 items-center">
          <div>
          <Link to="/Home" className="text-white hover:text-gray-300 font-black text-xl">
                Home
              </Link>
          </div>
          <div
            onClick={() => navigate("/student-courses")}
            className="flex cursor-pointer items-center gap-3"
          >
            <span className="font-extrabold md:text-xl text-[14px] hover:text-gray-500">
              My Courses
            </span>
            <TvMinimalPlay className="w-8 h-8 cursor-pointer" />
          </div>
          <Button onClick={handleLogout}>Sign Out</Button>
        </div>
      </div>
    </header>
  );
}

export default StudentViewCommonHeader;
