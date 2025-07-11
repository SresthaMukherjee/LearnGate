import CourseCurriculum from "@/components/instructor-view/courses/add-new-course/course-curriculum";
import CourseLanding from "@/components/instructor-view/courses/add-new-course/course-landing";
import CourseSettings from "@/components/instructor-view/courses/add-new-course/course-settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";
import {
  addNewCourseService,
  fetchInstructorCourseDetailsService,
  updateCourseByIdService,
} from "@/services";
import { useContext, useEffect, useState } from "react"; // Added useState import
import { useNavigate, useParams } from "react-router-dom";

function AddNewCoursePage() {
  const {
    courseLandingFormData,
    courseCurriculumFormData,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
    currentEditedCourseId,
    setCurrentEditedCourseId,
  } = useContext(InstructorContext);

  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();

  // State to manage the selected file for upload
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle file selection
  function handleFileChange(event) {
    setSelectedFile(event.target.files[0]);
  }

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    }

    return value === "" || value === null || value === undefined;
  }

  function validateFormData() {
    for (const key in courseLandingFormData) {
      if (isEmpty(courseLandingFormData[key])) {
        return false;
      }
    }

    let hasFreePreview = false;

    for (const item of courseCurriculumFormData) {
      if (
        isEmpty(item.title) ||
        isEmpty(item.videoUrl) ||
        isEmpty(item.public_id)
      ) {
        return false;
      }

      
    }

    return true;
  }

  async function handleCreateCourse() {
    setIsSubmitting(true);
    let uploadedFileUrl = null;

    // If there's a selected file, handle the file upload
    if (selectedFile) {
      try {
        // Replace this with the actual file upload logic
        const formData = new FormData();
        formData.append("file", selectedFile);

        // Example of uploading to a service (replace with your own service)
        const uploadResponse = await fetch("/your-file-upload-endpoint", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadResponse.json();

        // Assume the response contains the URL of the uploaded file
        if (uploadResponse.ok && uploadData.url) {
          uploadedFileUrl = uploadData.url;
        } else {
          console.error("File upload failed", uploadData);
          setIsSubmitting(false);
          return; // Exit if the upload fails
        }
      } catch (error) {
        console.error("File upload error:", error);
        setIsSubmitting(false);
        return; // Exit if an error occurs during upload
      }
    }

    const courseFinalFormData = {
      instructorId: auth?.user?._id,
      instructor: auth?.user?.userName,
      date: new Date(),
      ...courseLandingFormData,
      //students: [],
      curriculum: courseCurriculumFormData,
      isPublised: true,
      uploadedFileUrl, // Add the uploaded file URL to the course data
    };

    const response =
      currentEditedCourseId !== null
        ? await updateCourseByIdService(
            currentEditedCourseId,
            courseFinalFormData
          )
        : await addNewCourseService(courseFinalFormData);

    if (response?.success) {
      setCourseLandingFormData(courseLandingInitialFormData);
      setCourseCurriculumFormData(courseCurriculumInitialFormData);
      navigate(-1);
      setCurrentEditedCourseId(null);
    }

    setIsSubmitting(false);
    console.log(courseFinalFormData, "courseFinalFormData");
  }

  async function fetchCurrentCourseDetails() {
    const response = await fetchInstructorCourseDetailsService(
      currentEditedCourseId
    );

    if (response?.success) {
      const setCourseFormData = Object.keys(
        courseLandingInitialFormData
      ).reduce((acc, key) => {
        acc[key] = response?.data[key] || courseLandingInitialFormData[key];

        return acc;
      }, {});

      console.log(setCourseFormData, response?.data, "setCourseFormData");
      setCourseLandingFormData(setCourseFormData);
      setCourseCurriculumFormData(response?.data?.curriculum);
    }

    console.log(response, "response");
  }

  useEffect(() => {
    if (currentEditedCourseId !== null) fetchCurrentCourseDetails();
  }, [currentEditedCourseId]);

  useEffect(() => {
    if (params?.courseId) setCurrentEditedCourseId(params?.courseId);
  }, [params?.courseId]);

  console.log(params, currentEditedCourseId, "params");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {currentEditedCourseId ? 'Edit Course' : 'Create New Course'}
                </h1>
                <p className="text-gray-600 mt-1">
                  {currentEditedCourseId ? 'Update your course content and settings' : 'Build an amazing learning experience for your students'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => navigate(-1)}
                className="px-6 py-2 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200"
              >
                Cancel
              </Button>
              <Button
                disabled={!validateFormData() || isSubmitting}
                className={`px-8 py-2 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg ${
                  !validateFormData() || isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 hover:shadow-xl transform hover:-translate-y-0.5'
                }`}
                onClick={handleCreateCourse}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Publishing...
                  </div>
                ) : (
                  currentEditedCourseId ? 'Update Course' : 'Publish Course'
                )}
              </Button>
            </div>
          </div>
        </div>

        

        {/* Main Content Card */}
        <Card className="bg-white shadow-xl border-0 rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 p-6">
              <div className="text-center">
                <h2 className="text-white text-xl font-semibold mb-2">Course Builder</h2>
                <p className="text-purple-100">Use the tabs below to customize your course content</p>
              </div>
            </div>
            
            <div className="p-6">
              <Tabs defaultValue="curriculum" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-xl p-1 h-auto">
                  <TabsTrigger 
                    value="curriculum" 
                    className="flex items-center gap-2 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Curriculum
                  </TabsTrigger>
                  <TabsTrigger 
                    value="course-landing-page" 
                    className="flex items-center gap-2 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Course Page
                  </TabsTrigger>
                  <TabsTrigger 
                    value="settings" 
                    className="flex items-center gap-2 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="curriculum" className="mt-6">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Course Curriculum</h3>
                      <p className="text-gray-600 text-sm">Structure your course content with engaging lessons and materials</p>
                    </div>
                    <CourseCurriculum />
                  </div>
                </TabsContent>

                <TabsContent value="course-landing-page" className="mt-6">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Course Landing Page</h3>
                      <p className="text-gray-600 text-sm">Create an attractive landing page that converts visitors to students</p>
                    </div>
                    <CourseLanding />
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="mt-6">
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Course Settings</h3>
                      <p className="text-gray-600 text-sm">Configure pricing, access, and other course parameters</p>
                    </div>
                    <CourseSettings />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        
      </div>
    </div>
  );
}

export default AddNewCoursePage;