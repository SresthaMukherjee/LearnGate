import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoPlayer from "@/components/video-player";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import {
  getCurrentCourseProgressService,
  markLectureAsViewedService,
  resetCourseProgressService,
} from "@/services";
import { Check, ChevronLeft, ChevronRight, Play, BookOpen, Award, Clock, Users, Download, Trophy } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "jspdf-autotable";

import { useContext, useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useNavigate, useParams } from "react-router-dom";

function StudentViewCourseProgressPage() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { studentCurrentCourseProgress, setStudentCurrentCourseProgress } =
    useContext(StudentContext);
  const [lockCourse, setLockCourse] = useState(false);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [showCourseCompleteDialog, setShowCourseCompleteDialog] =
    useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [showCertificateDialog, setShowCertificateDialog] = useState(false);
  const [isCourseCompleted, setIsCourseCompleted] = useState(false);
  const { id } = useParams();

  async function fetchCurrentCourseProgress() {
    const response = await getCurrentCourseProgressService(auth?.user?._id, id);
    if (response?.success) {
      if (!response?.data?.isPurchased) {
        setLockCourse(true);
      } else {
        setStudentCurrentCourseProgress({
          courseDetails: response?.data?.courseDetails,
          progress: response?.data?.progress,
        });

        // Check if course is completed
        const completed = response?.data?.completed;
        setIsCourseCompleted(completed);

        if (completed) {
          setShowConfetti(true);
          setShowCourseCompleteDialog(true);
        }

        if (response?.data?.progress?.length === 0) {
          setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
        } else {
          console.log("logging here");
          const lastIndexOfViewedAsTrue = response?.data?.progress.reduceRight(
            (acc, obj, index) => {
              return acc === -1 && obj.viewed ? index : acc;
            },
            -1
          );

          setCurrentLecture(
            response?.data?.courseDetails?.curriculum[
            lastIndexOfViewedAsTrue + 1
            ] || response?.data?.courseDetails?.curriculum[0]
          );
        }
      }
    }
  }

  async function updateCourseProgress() {
    if (currentLecture) {
      const response = await markLectureAsViewedService(
        auth?.user?._id,
        studentCurrentCourseProgress?.courseDetails?._id,
        currentLecture._id
      );

      if (response?.success) {
        fetchCurrentCourseProgress();
      }
    }
  }

  async function handleRewatchCourse() {
    const response = await resetCourseProgressService(
      auth?.user?._id,
      studentCurrentCourseProgress?.courseDetails?._id
    );

    if (response?.success) {
      setCurrentLecture(null);
      setShowConfetti(false);
      setShowCourseCompleteDialog(false);
      setIsCourseCompleted(false);
      fetchCurrentCourseProgress();
    }
  }
  function capitalizeEachWord(name = "") {
    return name
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }


  const downloadCertificate = async () => {
    const certificateData = {
      studentName: auth?.user?.userName,
      courseTitle: studentCurrentCourseProgress?.courseDetails?.title,
      completionDate: new Date().toLocaleDateString(),
      certificateId: `CERT-${Date.now()}`,
      instructorName: studentCurrentCourseProgress?.courseDetails?.instruct,
      logo: "/LearnGate_Logo.png",
    };

    // Create a temporary certificate element
    const certificateElement = document.createElement('div');
    certificateElement.innerHTML = `
  <div id="certificate" style="
    width: 1200px;
  height: 800px;
  padding: 60px 80px;
  background-color: #f0f9ff;
  
  border: 2px solid rgba(37, 99, 235, 0.2);
  border-radius: 30px;
  font-family: 'Poppins', 'Segoe UI', sans-serif;
  text-align: center;
  position: relative;
  box-shadow: 0 10px 40px rgba(37, 99, 235, 0.3);
  transition: all 0.4s ease-in-out;
  ">
    <h1 style="
      font-size: 48px;
      font-weight: bold;
      color: #1d4ed8;
      margin-bottom: 15px;
      text-transform: uppercase;
      letter-spacing: 3px;
    ">
      Certificate of Completion
    </h1>

    <p style="font-size: 22px; color: #4b5563; margin-bottom: 30px;">
      This certifies that
    </p>

    <h2 style="
      font-size: 38px;
      font-family: 'Argent CF';
      color: #0f172a;
      margin-bottom: 30px;
      border-bottom: 2px dashed #2563eb;
      display: inline-block;
      padding: 5px 20px;
    ">
      ${capitalizeEachWord(certificateData.studentName)}
    </h2>

    <p style="font-size: 20px; color: #374151; margin-bottom: 15px;">
      has successfully completed the course
    </p>

    <h3 style="
      font-size: 28px;
      font-weight: bold;
      color: #1e3a8a;
      margin-bottom: 30px;
    ">
      ${certificateData.courseTitle}
    </h3>

    <p style="font-size: 18px; color: #4b5563;">
      with dedication and excellent performance
    </p>

    <div style="
      margin-top: 60px;
      font-size: 16px;
      color: #334155;
      display: flex;
      justify-content: space-between;
      align-items: center;
    ">
      <div style="text-align: left; width: 30%;">
        <p><strong>Completed On: </strong>${certificateData.completionDate}</p>
        
        <p><strong>Certificate ID: </strong>${certificateData.certificateId}</p>
      
    
      </div>

      <div style="text-align: center; width: 30%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <img src="${certificateData.logo}" alt="logo" style="height: 60px;" crossorigin="anonymous" />
        <p style="font-size: 12px; color: #9ca3af;">LearnGate Official Logo</p>
      </div>


      <div style="
      text-align: right; width: 30%;
      font-size: 18px;
      color: #1e3a8a;
    ">
      <p><strong>Issued By:</strong> </br> ${capitalizeEachWord(certificateData.instructorName)}</strong></p>
      </div>

    

    
  </div>
`;




    document.body.appendChild(certificateElement);

    try {
      const canvas = await html2canvas(certificateElement.querySelector('#certificate'), {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = (pdfHeight - imgHeight * ratio) / 2;

      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`${certificateData.courseTitle.replace(/[^a-zA-Z0-9]/g, '_')}_Certificate.pdf`);

      setShowCertificateDialog(false);
    } catch (error) {
      console.error('Error generating certificate:', error);
    } finally {
      document.body.removeChild(certificateElement);
    }
  };



  const handleLectureClick = (lecture) => {
    // Allow clicking any lecture if course is completed
    if (isCourseCompleted) {
      setCurrentLecture(lecture);
      return;
    }

    // Original logic for incomplete courses
    const lectureIndex = studentCurrentCourseProgress?.courseDetails?.curriculum?.findIndex(
      item => item._id === lecture._id
    );

    const viewedLectures = studentCurrentCourseProgress?.progress?.filter(p => p.viewed) || [];

    // Allow clicking if it's the next lecture or already viewed
    if (lectureIndex <= viewedLectures.length) {
      setCurrentLecture(lecture);
    }
  };

  useEffect(() => {
    fetchCurrentCourseProgress();
  }, [id]);

  useEffect(() => {
    if (currentLecture?.progressValue === 1) updateCourseProgress();
  }, [currentLecture]);

  useEffect(() => {
    if (showConfetti) setTimeout(() => setShowConfetti(false), 15000);
  }, [showConfetti]);

  console.log(currentLecture, "currentLecture");

  // Calculate progress percentage
  const progressPercentage = studentCurrentCourseProgress?.progress
    ? (studentCurrentCourseProgress.progress.filter(p => p.viewed).length /
      studentCurrentCourseProgress.courseDetails.curriculum.length) * 100
    : 0;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {showConfetti && <Confetti />}

      {/* Enhanced Header with Certificate Button */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-800/20 to-blue-800/20 backdrop-blur-sm border-b border-purple-500/20">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => navigate("/student-courses")}
            className="text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0 shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            size="sm"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to My Courses
          </Button>
          <div className="hidden md:block">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {studentCurrentCourseProgress?.courseDetails?.title}
            </h1>
            <h3 className=" font-bold text-white bg-clip-text text-transparent">
             <p>Instructor: {studentCurrentCourseProgress?.courseDetails?.instruct} </p>  
            </h3>
           
            <div className="flex items-center space-x-4 mt-1">
              <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className="text-sm text-purple-300">{Math.round(progressPercentage)}% Complete</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isCourseCompleted && (
            <Button
              onClick={() => setShowCertificateDialog(true)}
              className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 border-0 shadow-lg hover:shadow-yellow-500/25 transition-all duration-300"
              size="sm"
            >
              <Trophy className="h-4 w-4 mr-2" />
              Get Certificate
            </Button>
          )}
          <Button
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0 shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
          >
            {isSideBarOpen ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content Area */}
        <div
          className={`flex-1 ${isSideBarOpen ? "mr-[400px]" : ""
            } transition-all duration-300`}
        >
          {/* Video Player Container */}
          <div className="relative">
            <VideoPlayer
              width="100%"
              height="500px"
              url={currentLecture?.videoUrl}
              onProgressUpdate={setCurrentLecture}
              progressData={currentLecture}
            />
            {/* Video Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none" />

            {/* Course Completed Badge */}
            {isCourseCompleted && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                <Award className="h-4 w-4 inline mr-1" />
                Course Completed
              </div>
            )}
          </div>

          {/* Enhanced Content Section */}
          <div className="p-6 bg-gradient-to-r from-slate-800/50 to-purple-800/20 backdrop-blur-sm">
            <div className="max-w-4xl">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {currentLecture?.title}
                </h2>
                {isCourseCompleted && (
                  <Button
                    onClick={() => setShowCertificateDialog(true)}
                    className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 border-0 shadow-lg hover:shadow-yellow-500/25 transition-all duration-300"
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Certificate
                  </Button>
                )}
              </div>
              <div className="flex items-center space-x-6 text-sm text-purple-300">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Lesson {
                    studentCurrentCourseProgress?.courseDetails?.curriculum?.findIndex(
                      item => item._id === currentLecture?._id
                    ) + 1
                  } of {studentCurrentCourseProgress?.courseDetails?.curriculum?.length}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Interactive Learning</span>
                </div>
                {isCourseCompleted && (
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-4 w-4" />
                    <span>All Lessons Unlocked</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Sidebar */}
        <div
          className={`fixed top-[135px] right-0 bottom-0 w-[400px] bg-gradient-to-b from-slate-800/95 to-purple-900/95 backdrop-blur-xl border-l border-purple-500/20 transition-all duration-300 ${isSideBarOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <Tabs defaultValue="content" className="h-full flex flex-col">
            <TabsList className="grid bg-gradient-to-r from-purple-800/50 to-blue-800/50 w-full grid-cols-2 p-1 h-14 m-2 rounded-lg">
              <TabsTrigger
                value="content"
                className="text-white rounded-md h-full bg-transparent hover:bg-white/10 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:shadow-lg transition-all duration-300"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Course Content
              </TabsTrigger>
              <TabsTrigger
                value="overview"
                className="text-white rounded-md h-full bg-transparent hover:bg-white/10 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:shadow-lg transition-all duration-300"
              >
                <Users className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-3">
                  {/* Certificate Button at Top */}
                  {isCourseCompleted && (
                    <div className="mb-4">
                      <Button
                        onClick={() => setShowCertificateDialog(true)}
                        className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 border-0 shadow-lg hover:shadow-yellow-500/25 transition-all duration-300"
                      >
                        <Trophy className="h-4 w-4 mr-2" />
                        Get Your Certificate
                      </Button>
                    </div>
                  )}

                  {studentCurrentCourseProgress?.courseDetails?.curriculum.map(
                    (item, index) => {
                      const isViewed = studentCurrentCourseProgress?.progress?.find(
                        (progressItem) => progressItem.lectureId === item._id
                      )?.viewed;
                      const isCurrent = currentLecture?._id === item._id;
                      const isAccessible = isCourseCompleted || index <= (studentCurrentCourseProgress?.progress?.filter(p => p.viewed)?.length || 0);

                      return (
                        <div
                          className={`flex items-center space-x-3 p-3 rounded-xl text-sm font-medium transition-all duration-300 ${isAccessible
                            ? 'cursor-pointer hover:bg-white/5 hover:border-purple-500/20'
                            : 'opacity-50 cursor-not-allowed'
                            } ${isCurrent
                              ? 'bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-purple-500/30 shadow-lg'
                              : 'border border-transparent'
                            }`}
                          key={item._id}
                          onClick={() => handleLectureClick(item)}
                        >
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isViewed
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg'
                            : isCurrent
                              ? 'bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg'
                              : isAccessible
                                ? 'bg-slate-700'
                                : 'bg-slate-800'
                            }`}>
                            {isViewed ? (
                              <Check className="h-4 w-4 text-white" />
                            ) : (
                              <Play className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className={`truncate ${isCurrent
                                ? 'text-purple-300'
                                : isAccessible
                                  ? 'text-white'
                                  : 'text-gray-500'
                                }`}>
                                {item?.title}
                              </span>
                              <span className="text-xs text-purple-400 ml-2">
                                {index + 1}
                              </span>
                            </div>
                            {isCurrent && (
                              <div className="text-xs text-purple-400 mt-1">
                                Currently Playing
                              </div>
                            )}
                            {!isAccessible && !isCourseCompleted && (
                              <div className="text-xs text-gray-500 mt-1">
                                🔒 Locked
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="overview" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-6">
                  {/* Certificate Section */}
                  {isCourseCompleted && (
                    <div className="bg-gradient-to-r from-yellow-800/20 to-orange-800/20 rounded-xl p-4 border border-yellow-500/20">
                      <h3 className="text-lg font-semibold mb-3 text-yellow-300 flex items-center">
                        <Trophy className="h-5 w-5 mr-2" />
                        Certificate Ready
                      </h3>
                      <p className="text-gray-300 mb-3 text-sm">
                        Congratulations! You've completed the course and earned your certificate.
                      </p>
                      <Button
                        onClick={() => setShowCertificateDialog(true)}
                        className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 border-0 shadow-lg hover:shadow-yellow-500/25 transition-all duration-300"
                        size="sm"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Certificate
                      </Button>
                    </div>
                  )}

                  <div className="bg-gradient-to-r from-purple-800/20 to-blue-800/20 rounded-xl p-4 border border-purple-500/20">
                    <h2 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      About this course
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                      {studentCurrentCourseProgress?.courseDetails?.description}
                    </p>
                  </div>

                  {/* Progress Stats */}
                  <div className="bg-gradient-to-r from-slate-800/50 to-purple-800/20 rounded-xl p-4 border border-purple-500/20">
                    <h3 className="text-lg font-semibold mb-3 text-purple-300">Your Progress</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Completion</span>
                        <span className="text-sm font-medium text-purple-300">{Math.round(progressPercentage)}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">
                          {studentCurrentCourseProgress?.progress?.filter(p => p.viewed).length || 0} of {studentCurrentCourseProgress?.courseDetails?.curriculum?.length || 0} lessons
                        </span>
                        <span className="text-purple-300">
                          {studentCurrentCourseProgress?.courseDetails?.curriculum?.length - (studentCurrentCourseProgress?.progress?.filter(p => p.viewed).length || 0)} remaining
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Certificate Dialog */}
      <Dialog open={showCertificateDialog} onOpenChange={setShowCertificateDialog}>
        <DialogContent className="sm:w-[500px] bg-gradient-to-br from-slate-800 to-purple-900 border-purple-500/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent flex items-center">
              <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
              Download Your Certificate
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              <div className="space-y-4">
                <p>🎉 Congratulations on completing <strong>{studentCurrentCourseProgress?.courseDetails?.title}</strong>!</p>
                <p>Your certificate of completion is ready to download. This official document verifies that you have successfully completed all course requirements.</p>
                <div className="bg-gradient-to-r from-yellow-800/20 to-orange-800/20 rounded-lg p-4 border border-yellow-500/20">
                  <h4 className="font-semibold text-yellow-300 mb-2">Certificate Details:</h4>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• Student: {auth?.user?.userName}</li>
                    <li>• Course: {studentCurrentCourseProgress?.courseDetails?.title}</li>
                    <li>• Completion Date: {new Date().toLocaleDateString()}</li>
                    <li>• Organization: Tech Learning Academy</li>
                  </ul>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Button
              onClick={downloadCertificate}
              className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 border-0 shadow-lg hover:shadow-yellow-500/25 transition-all duration-300"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Certificate
            </Button>
            <Button
              onClick={() => setShowCertificateDialog(false)}
              className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 border-0 shadow-lg hover:shadow-gray-500/25 transition-all duration-300"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Course Complete Dialog */}
      <Dialog
        open={showCourseCompleteDialog}
        onOpenChange={setShowCourseCompleteDialog}
      >
        <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-purple-800 to-blue-900 border-purple-500/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-3xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent flex items-center justify-center">
              <Award className="h-8 w-8 mr-3 text-green-400" />
              Course Completed!
            </DialogTitle>
            <DialogDescription className="text-center text-gray-300 text-base mt-2">
              <p>You have successfully completed all lessons in this course.</p>
              <p className="mt-2">What would you like to do next?</p>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button
              onClick={() => {
                setShowCourseCompleteDialog(false);
                setShowCertificateDialog(true);
              }}
              className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 border-0 shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 text-lg py-6"
            >
              <Trophy className="h-5 w-5 mr-3" />
              Get Your Certificate
            </Button>
            {/* 
            <Button
              onClick={handleRewatchCourse}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0 shadow-lg hover:shadow-purple-500/25 transition-all duration-300 text-lg py-6"
            >
              <Play className="h-5 w-5 mr-3" />
              Rewatch Course
            </Button> 
            */}

            <Button
              onClick={() => navigate("/student-courses")}
              className="w-full bg-gradient-to-r from-slate-600 to-gray-700 hover:from-slate-700 hover:to-gray-800 border-0 shadow-lg hover:shadow-gray-500/25 transition-all duration-300 text-lg py-6"
            >
              <ChevronLeft className="h-5 w-5 mr-3" />
              Back to My Courses
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StudentViewCourseProgressPage;