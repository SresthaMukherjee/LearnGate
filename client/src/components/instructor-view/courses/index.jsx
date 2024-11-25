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
import { Delete, Edit } from "lucide-react";
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

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-3xl font-extrabold">All Courses</CardTitle>
        <Button
          onClick={() => {
            setCurrentEditedCourseId(null);
            setCourseLandingFormData(courseLandingInitialFormData);
            setCourseCurriculumFormData(courseCurriculumInitialFormData);
            navigate("/instructor/create-new-course");
          }}
          className="p-6"
        >
          Create New Course
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listOfCourses && listOfCourses.length > 0
                ? listOfCourses.map((course) => (
                    <TableRow key={course._id}>
                      <TableCell className="font-medium">
                        {course?.title}
                      </TableCell>
                      <TableCell>{course?.admin}</TableCell>
                      <TableCell>{course?.primaryLanguage}</TableCell>
                      <TableCell>{course?.category}</TableCell>
                      <TableCell>{course?.level}</TableCell>
                      <TableCell>{course?.students?.length}</TableCell>
                      <TableCell>
                        ${course?.students?.length * course?.pricing}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          onClick={() => {
                            navigate(`/instructor/edit-course/${course?._id}`);
                          }}
                          variant="ghost"
                          size="sm"
                        >
                          <Edit className="h-6 w-6" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCourse(course._id)}
                        >
                          <Delete className="h-6 w-6" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default InstructorCourses;
