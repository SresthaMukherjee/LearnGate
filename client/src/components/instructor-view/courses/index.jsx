import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import { Delete, Edit, Plus, BookOpen, Users, DollarSign, Star, TrendingUp } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function InstructorCourses({ listOfCourses, refreshCourses }) {
  const navigate = useNavigate();
  const {
    setCurrentEditedCourseId,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
  } = useContext(InstructorContext);

  // Function to handle course deletion
  const handleDeleteCourse = async (courseId) => {
    const confirmation = window.confirm("Are you sure you want to delete this course?");
    if (!confirmation) return;

    try {
      console.log("Attempting to delete course:", courseId);
      // API call to delete the course by ID
      const response = await axios.delete(`http://localhost:8001/instructor/course/delete/${courseId}`); 
      console.log("Delete response:", response.data)
      if (response.data.success) {
        alert("Course deleted successfully.");
        // Refresh the course list after deletion if the callback is provided
        if (refreshCourses) refreshCourses();
      } else {
        alert(response.data.message || "Failed to delete the course.");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("An error occurred while deleting the course.");
    }
  };

  const getLevelBadgeColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category) => {
    const colors = [
      'bg-blue-100 text-blue-800 border-blue-200',
      'bg-purple-100 text-purple-800 border-purple-200',
      'bg-pink-100 text-pink-800 border-pink-200',
      'bg-indigo-100 text-indigo-800 border-indigo-200',
      'bg-cyan-100 text-cyan-800 border-cyan-200',
      'bg-teal-100 text-teal-800 border-teal-200',
    ];
    return colors[Math.abs(category?.charCodeAt(0) || 0) % colors.length];
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <BookOpen className="h-10 w-10" />
              Course Dashboard
            </h1>
            <p className="text-blue-100 text-lg">
              Manage and track your course performance
            </p>
          </div>
          <Button
            onClick={() => {
              setCurrentEditedCourseId(null);
              setCourseLandingFormData(courseLandingInitialFormData);
              setCourseCurriculumFormData(courseCurriculumInitialFormData);
              navigate("/instructor/create-new-course");
            }}
            className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Create New Course
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 font-medium text-sm">Total Courses</p>
                <p className="text-3xl font-bold text-green-800">{listOfCourses?.length || 0}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 font-medium text-sm">Total Students</p>
                <p className="text-3xl font-bold text-blue-800">
                  {listOfCourses?.reduce((total, course) => total + (course?.students?.length || 0), 0)}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 font-medium text-sm">Total Revenue</p>
                <p className="text-3xl font-bold text-purple-800">
                  ${listOfCourses?.reduce((total, course) => total + ((course?.students?.length || 0) * (course?.pricing || 0)), 0)}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card className="shadow-xl border-0 bg-white rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100 p-6">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              All Courses
            </CardTitle>
            <div className="text-sm text-gray-500">
              {listOfCourses?.length || 0} courses total
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50 hover:bg-gray-50">
                  <TableHead className="font-semibold text-gray-700 py-4 px-6">Course</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4">Instructor</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4">Language</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4">Category</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4">Level</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4">Students</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4">Revenue</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listOfCourses && listOfCourses.length > 0
                  ? listOfCourses.map((course, index) => (
                      <TableRow key={course._id} className="hover:bg-blue-50/30 transition-colors duration-150 border-b border-gray-100">
                        <TableCell className="font-semibold text-gray-800 py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                              {course?.title?.charAt(0)?.toUpperCase() || 'C'}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{course?.title}</div>
                              <div className="text-sm text-gray-500">Course #{index + 1}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="font-medium text-gray-800">{course?.instruct}</div>
                        </TableCell>
                        <TableCell className="py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800 border border-orange-200">
                            {course?.primaryLanguage}
                          </span>
                        </TableCell>
                        <TableCell className="py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(course?.category)}`}>
                            {course?.category}
                          </span>
                        </TableCell>
                        <TableCell className="py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getLevelBadgeColor(course?.level)}`}>
                            {course?.level}
                          </span>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-blue-600" />
                            <span className="font-semibold text-gray-800">{course?.students?.length || 0}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-green-600" />
                            <span className="font-semibold text-green-700">
                              {((course?.students?.length || 0) * (course?.pricing || 0)).toLocaleString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              onClick={() => {
                                navigate(`/instructor/edit-course/${course?._id}`);
                              }}
                              variant="ghost"
                              size="sm"
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-colors duration-200"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteCourse(course._id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors duration-200"
                            >
                              <Delete className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-12">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                            <BookOpen className="h-8 w-8 text-gray-400" />
                          </div>
                          <div>
                            <p className="text-lg font-semibold text-gray-600">No courses found</p>
                            <p className="text-gray-500">Create your first course to get started</p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default InstructorCourses;