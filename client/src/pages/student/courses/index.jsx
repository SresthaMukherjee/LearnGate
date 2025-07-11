import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { filterOptions, sortOptions } from "@/config";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import {
  checkCoursePurchaseInfoService,
  fetchStudentViewCourseListService,
} from "@/services";
import { ArrowUpDownIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join("&");
}

function StudentViewCoursesPage() {
  const [sort, setSort] = useState("price-lowtohigh");
  const [filters, setFilters] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    studentViewCoursesList,
    setStudentViewCoursesList,
    loadingState,
    setLoadingState,
  } = useContext(StudentContext);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  function handleFilterOnChange(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSeection =
      Object.keys(cpyFilters).indexOf(getSectionId);

    console.log(indexOfCurrentSeection, getSectionId);
    if (indexOfCurrentSeection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption.id],
      };

      console.log(cpyFilters);
    } else {
      const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(
        getCurrentOption.id
      );

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption.id);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  async function fetchAllStudentViewCourses(filters, sort) {
    const query = new URLSearchParams({
      ...filters,
      sortBy: sort,
    });
    const response = await fetchStudentViewCourseListService(query);
    if (response?.success) {
      setStudentViewCoursesList(response?.data);
      setLoadingState(false);
    }
  }

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

  useEffect(() => {
    const buildQueryStringForFilters = createSearchParamsHelper(filters);
    setSearchParams(new URLSearchParams(buildQueryStringForFilters));
  }, [filters]);

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    if (filters !== null && sort !== null)
      fetchAllStudentViewCourses(filters, sort);
  }, [filters, sort]);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("filters");
    };
  }, []);

  console.log(loadingState, "loadingState");

  
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-1/2 right-10 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto p-6">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 animate-pulse">
              Explore All Courses
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover amazing courses and level up your skills with our comprehensive learning platform
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 sticky top-0">
            {/* Enhanced Sidebar */}
            <aside className="w-full lg:w-80 space-y-4 sticky top-0">
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl sticky top-0">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Filter Courses
                </h2>
                {Object.keys(filterOptions).map((ketItem) => (
                  <div key={ketItem} className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
                    <h3 className="font-bold mb-4 text-lg bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                      {ketItem.toUpperCase()}
                    </h3>
                    <div className="grid gap-3 mt-2">
                      {filterOptions[ketItem].map((option) => (
                        <Label
                          key={option.id}
                          className="flex font-medium items-center gap-3 text-gray-200 hover:text-white cursor-pointer transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
                        >
                          <Checkbox
                            checked={
                              filters &&
                              Object.keys(filters).length > 0 &&
                              filters[ketItem] &&
                              filters[ketItem].indexOf(option.id) > -1
                            }
                            onCheckedChange={() =>
                              handleFilterOnChange(ketItem, option)
                            }
                            className="border-cyan-400 text-cyan-400 data-[state=checked]:bg-cyan-400 data-[state=checked]:border-cyan-400"
                          />
                          {option.label}
                        </Label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1">
              {/* Enhanced Header */}
              <div className="flex justify-between items-center mb-6 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-lg font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                    {studentViewCoursesList.length} Amazing Courses Available
                  </span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-none shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 px-6 py-3">
                      <ArrowUpDownIcon className="h-4 w-4 mr-2" />
                      <span className="font-medium">Sort By</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-[200px] backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-2xl"
                  >
                    <DropdownMenuRadioGroup
                      value={sort}
                      onValueChange={(value) => setSort(value)}
                    >
                      {sortOptions.map((sortItem) => (
                        <DropdownMenuRadioItem
                          value={sortItem.id}
                          key={sortItem.id}
                          className="text-gray-200 hover:bg-white/20 focus:bg-white/20 rounded-lg mx-2 my-1"
                        >
                          {sortItem.label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Enhanced Course Cards */}
              <div className="space-y-6">
                {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
                  studentViewCoursesList.map((courseItem, index) => (
                    <Card
                      onClick={() => handleCourseNavigate(courseItem?._id)}
                      className="cursor-pointer backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 overflow-hidden group"
                      key={courseItem?._id}
                    >
                      <CardContent className="flex gap-6 p-6">
                        <div className="w-52 h-36 flex-shrink-0 overflow-hidden rounded-xl">
                          <img
                            src={courseItem?.image}
                            alt={courseItem?.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-200">
                              {courseItem?.title}
                            </CardTitle>
                            <div className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-cyan-400 px-3 py-1 rounded-full text-sm font-bold text-gray-900">
                              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                              ${courseItem?.pricing}
                            </div>
                          </div>
                          
                          <p className="text-gray-300 text-sm">
                            Created By{" "}
                            <span className="font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                              {courseItem?.instruct}
                            </span>
                          </p>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                              <span>
                                {courseItem?.curriculum?.length} {
                                  courseItem?.curriculum?.length <= 1
                                    ? "Lecture"
                                    : "Lectures"
                                }
                              </span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                              <span>{courseItem?.level.toUpperCase()} Level</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : loadingState ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 animate-pulse">
                        <div className="flex gap-6">
                          <div className="w-52 h-36 bg-white/20 rounded-xl"></div>
                          <div className="flex-1 space-y-3">
                            <div className="h-6 bg-white/20 rounded-lg w-3/4"></div>
                            <div className="h-4 bg-white/20 rounded-lg w-1/2"></div>
                            <div className="h-4 bg-white/20 rounded-lg w-1/4"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <div className="w-32 h-32 bg-gradient-to-r from-red-400 to-pink-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <span className="text-6xl">🔍</span>
                    </div>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent mb-4">
                      No Courses Found
                    </h2>
                    <p className="text-gray-400 text-lg">
                      Try adjusting your filters or search terms
                    </p>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
    
}

export default StudentViewCoursesPage;