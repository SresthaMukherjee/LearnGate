import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import VideoPlayer from "@/components/video-player";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import {
  checkCoursePurchaseInfoService,
  createPaymentService,
  fetchStudentViewCourseDetailsService,
} from "@/services";
import { CheckCircle, Globe, Lock, PlayCircle, Star, Users, Calendar, Award } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function StudentViewCourseDetailsPage() {
  const {
    studentViewCourseDetails,
    setStudentViewCourseDetails,
    currentCourseDetailsId,
    setCurrentCourseDetailsId,
    loadingState,
    setLoadingState,
  } = useContext(StudentContext);

  const { auth } = useContext(AuthContext);

  const [displayCurrentVideoFreePreview, setDisplayCurrentVideoFreePreview] =
    useState(null);
  const [showFreePreviewDialog, setShowFreePreviewDialog] = useState(false);
  const [approvalUrl, setApprovalUrl] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  
async function fetchStudentViewCourseDetails() {
    //{ccomment out area}
   /* const checkCoursePurchaseInfoResponse =
    await checkCoursePurchaseInfoService(
        currentCourseDetailsId,
        auth?.user._id
       );

     if (
       checkCoursePurchaseInfoResponse?.success &&
       checkCoursePurchaseInfoResponse?.data
     ) {
       navigate(`/course-progress/${currentCourseDetailsId}`);
       return;
     }*/

    const response = await fetchStudentViewCourseDetailsService(
      currentCourseDetailsId
    );

    if (response?.success) {
      setStudentViewCourseDetails(response?.data);
      setLoadingState(false);
    } else {
      setStudentViewCourseDetails(null);
      setLoadingState(false);
    }
  }

  function handleSetFreePreview(getCurrentVideoInfo) {
    console.log(getCurrentVideoInfo);
    setDisplayCurrentVideoFreePreview(getCurrentVideoInfo?.videoUrl);
  }

  async function handleCreatePayment() {
    const paymentPayload = {
      userId: auth?.user?._id,
      userName: auth?.user?.userName,
      userEmail: auth?.user?.userEmail,
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "initiated",
      orderDate: new Date(),
      paymentId: "",
      payerId: "",
      instructorId: studentViewCourseDetails?.instructorId,
      instruct: studentViewCourseDetails?.instruct,
      courseImage: studentViewCourseDetails?.image,
      courseTitle: studentViewCourseDetails?.title,
      courseId: studentViewCourseDetails?._id,
      coursePricing: studentViewCourseDetails?.pricing,
    };

    console.log(paymentPayload, "paymentPayload");
    const response = await createPaymentService(paymentPayload);

    if (response.success) {
      sessionStorage.setItem(
        "currentOrderId",
        JSON.stringify(response?.data?.orderId)
      );
      setApprovalUrl(response?.data?.approveUrl);
    }
  }

  useEffect(() => {
    if (displayCurrentVideoFreePreview !== null) setShowFreePreviewDialog(true);
  }, [displayCurrentVideoFreePreview]);

  useEffect(() => {
    if (currentCourseDetailsId !== null) fetchStudentViewCourseDetails();
  }, [currentCourseDetailsId]);

  useEffect(() => {
    if (id) setCurrentCourseDetailsId(id);
  }, [id]);

  useEffect(() => {
    if (!location.pathname.includes("course/details"))
      setStudentViewCourseDetails(null),
        setCurrentCourseDetailsId(null),
        setCoursePurchaseId(null);
  }, [location.pathname]);

  if (loadingState) return <Skeleton />;

  if (approvalUrl !== "") {
    window.location.href = approvalUrl;
  }

  const getIndexOfFreePreviewUrl =
    studentViewCourseDetails !== null
      ? studentViewCourseDetails?.curriculum?.findIndex(
          (item) => item.freePreview
        )
      : -1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-blue-600/90 to-indigo-700/90"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              {studentViewCourseDetails?.title}
            </h1>
            
            <div className="flex flex-wrap justify-center items-center gap-6 mt-8 text-sm">
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Award className="mr-2 h-4 w-4 text-yellow-300" />
                <span className="font-medium">By {studentViewCourseDetails?.instruct}</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Calendar className="mr-2 h-4 w-4 text-green-300" />
                <span>Created {studentViewCourseDetails?.date.split("T")[0]}</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Globe className="mr-2 h-4 w-4 text-blue-300" />
                <span>{studentViewCourseDetails?.primaryLanguage}</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Users className="mr-2 h-4 w-4 text-pink-300" />
                <span>
                  {studentViewCourseDetails?.students.length}{" "}
                  {studentViewCourseDetails?.students.length <= 1
                    ? "Student"
                    : "Students"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-grow space-y-8">
            {/* What You'll Learn */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-purple-50 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                <CardTitle className="text-xl font-bold flex items-center">
                  <Star className="mr-2 h-5 w-5" />
                  What you'll learn
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {studentViewCourseDetails?.objectives
                    .split(",")
                    .map((objective, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-white/70 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{objective.trim()}</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Course Description */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                <CardTitle className="text-xl font-bold">Course Description</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-white/70 rounded-lg p-4 text-gray-700 leading-relaxed">
                  {studentViewCourseDetails?.description}
                </div>
              </CardContent>
            </Card>

            {/* Course Curriculum */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-indigo-50 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                <CardTitle className="text-xl font-bold">Course Curriculum</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {studentViewCourseDetails?.curriculum?.map(
                    (curriculumItem, index) => (
                      <div
                        key={index}
                        className={`${
                          curriculumItem?.freePreview
                            ? "cursor-pointer hover:bg-green-50 hover:border-green-300 hover:shadow-md"
                            : "cursor-not-allowed opacity-60"
                        } flex items-center p-4 bg-white/70 rounded-xl border-2 border-transparent transition-all duration-200`}
                        onClick={
                          curriculumItem?.freePreview
                            ? () => handleSetFreePreview(curriculumItem)
                            : null
                        }
                      >
                        {curriculumItem?.freePreview ? (
                          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-4">
                            <PlayCircle className="h-5 w-5 text-white" />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full mr-4">
                            <Lock className="h-5 w-5 text-white" />
                          </div>
                        )}
                        <div className="flex-grow">
                          <span className="font-medium text-gray-800">{curriculumItem?.title}</span>
                          {curriculumItem?.freePreview && (
                            <div className="text-sm text-green-600 font-medium mt-1">
                              Free Preview Available
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </main>

          {/* Sidebar */}
          <aside className="w-full lg:w-96">
            <Card className="sticky top-4 border-0 shadow-2xl bg-gradient-to-br from-white to-pink-50 overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-white">
                  <h3 className="text-lg font-bold mb-2">Start Learning Today</h3>
                  <p className="text-pink-100 text-sm">Join thousands of students already enrolled</p>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="aspect-video rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-100 to-gray-200">
                    <VideoPlayer
                      url={
                        getIndexOfFreePreviewUrl !== -1
                          ? studentViewCourseDetails?.curriculum[
                              getIndexOfFreePreviewUrl
                            ].videoUrl
                          : ""
                      }
                      width="100%"
                      height="100%"
                    />
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white inline-block px-4 py-2 rounded-full mb-2">
                      <span className="text-sm font-medium">Special Price</span>
                    </div>
                    <div className="text-4xl font-bold text-gray-800">
                      ${studentViewCourseDetails?.pricing}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">One-time payment</div>
                  </div>
                  
                  <Button 
                    onClick={handleCreatePayment} 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    🚀 Enroll Now
                  </Button>
                  
                  <div className="text-center text-sm text-gray-500">
                    30-day money-back guarantee
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog
        open={showFreePreviewDialog}
        onOpenChange={() => {
          setShowFreePreviewDialog(false);
          setDisplayCurrentVideoFreePreview(null);
        }}
      >
        <DialogContent className="max-w-4xl bg-gradient-to-br from-white to-purple-50 border-0 shadow-2xl">
          <DialogHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white -m-6 mb-6 p-6 rounded-t-lg">
            <DialogTitle className="text-xl font-bold">🎬 Course Preview</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-100 to-gray-200">
              <VideoPlayer
                url={displayCurrentVideoFreePreview}
                width="100%"
                height="100%"
              />
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800 mb-3">Other Free Previews:</h4>
              {studentViewCourseDetails?.curriculum
                ?.filter((item) => item.freePreview)
                .map((filteredItem, index) => (
                  <div
                    key={index}
                    onClick={() => handleSetFreePreview(filteredItem)}
                    className="cursor-pointer p-3 bg-white/70 rounded-lg border-2 border-transparent hover:border-purple-300 hover:shadow-md transition-all duration-200 flex items-center"
                  >
                    <PlayCircle className="h-4 w-4 text-purple-500 mr-3" />
                    <span className="font-medium text-gray-800">{filteredItem?.title}</span>
                  </div>
                ))}
            </div>
          </div>
          <DialogFooter className="sm:justify-start mt-6">
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="bg-gray-200 hover:bg-gray-300">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StudentViewCourseDetailsPage;