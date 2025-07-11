import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import { fetchStudentBoughtCoursesService } from "@/services";
import { Watch, BookOpen, GraduationCap, Star } from "lucide-react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StudentCoursesPage() {
  const { auth } = useContext(AuthContext);
  const { studentBoughtCoursesList, setStudentBoughtCoursesList } =
    useContext(StudentContext);
  const navigate = useNavigate();

  async function fetchStudentBoughtCourses() {
    const response = await fetchStudentBoughtCoursesService(auth?.user?._id);
    if (response?.success) {
      setStudentBoughtCoursesList(response?.data);
    }
    console.log(response);
  }
  useEffect(() => {
    fetchStudentBoughtCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900 p-6">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">

          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4">
            My Learning Journey
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Continue your educational adventure with your enrolled courses
          </p>
         
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {studentBoughtCoursesList && studentBoughtCoursesList.length > 0 ? (
            studentBoughtCoursesList.map((course, index) => (
              <Card 
                key={course.id} 
                className="group relative overflow-hidden bg-white/10 backdrop-blur-sm border border-purple-500/20 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 rounded-2xl hover:bg-white/20"
              >
                {/* Course Image with Overlay */}
                <div className="relative overflow-hidden">
                  <img
                    src={course?.courseImage}
                    alt={course?.title}
                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Course Number Badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    #{index + 1}
                  </div>
                  
                  {/* Progress Ring - Placeholder */}
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-green-500/20 backdrop-blur-sm border-2 border-green-400/40 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500" />
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-3">
                    <h3 className="font-bold text-xl text-white group-hover:text-orange-300 transition-colors duration-200 line-clamp-2">
                      {course?.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-sm text-purple-200">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                        {course?.instruct?.charAt(0) || "T"}
                      </div>
                      <span className="font-medium">{course?.instruct}</span>
                    </div>
                    
                    {/* Course Stats */}
                    <div className="flex items-center justify-between pt-2">
                      
                      {/* <div className="text-sm text-purple-300">
                       <span  className="font-medium">{course?.instruct.length}</span> 
                      </div> */}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <Button
                    onClick={() =>
                      navigate(`/course-progress/${course?.courseId}`)
                    }
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    
                    Continue Learning
                  </Button>
                </CardFooter>

                {/* Animated Border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
              </Card>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <div className="w-32 h-32 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full flex items-center justify-center mb-8 border border-purple-400/30">
                <BookOpen className="w-16 h-16 text-purple-300" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                No Courses Yet
              </h2>
              <p className="text-xl text-purple-200 mb-8 max-w-md text-center">
                Start your learning journey by exploring our course catalog
              </p>
              <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                Browse Courses
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentCoursesPage;