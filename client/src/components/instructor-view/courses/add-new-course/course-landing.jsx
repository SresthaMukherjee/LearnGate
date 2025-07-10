import FormControls from "@/components/common-form/form-controls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courseLandingPageFormControls } from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import { FileText, Sparkles, Target, Users } from "lucide-react";
import { useContext } from "react";

function CourseLanding() {
  const { courseLandingFormData, setCourseLandingFormData } =
    useContext(InstructorContext);

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white border-0 shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold flex items-center gap-3">
                <FileText className="h-8 w-8" />
                Course Landing Page
              </CardTitle>
              <p className="text-emerald-100 mt-2">Create an engaging course description that attracts students</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-blue-800">Course Goals</h3>
            </div>
            <p className="text-sm text-blue-600">Define clear learning objectives and outcomes for your students</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-purple-800">Target Audience</h3>
            </div>
            <p className="text-sm text-purple-600">Identify who will benefit most from your course content</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-green-800">Engaging Content</h3>
            </div>
            <p className="text-sm text-green-600">Create compelling descriptions that showcase your expertise</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Form Card */}
      <Card className="shadow-xl border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100 rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <FileText className="h-6 w-6 text-emerald-600" />
            Course Information
          </CardTitle>
          <p className="text-gray-600 mt-2">Fill in the details that will help students discover and understand your course</p>
        </CardHeader>
        <CardContent className="p-8">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">💡 Pro Tips for Success</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Write a compelling title that clearly states what students will learn</li>
                  <li>• Use specific, measurable learning outcomes in your description</li>
                  <li>• Set competitive pricing based on your course value and market research</li>
                  <li>• Choose relevant categories and skill levels to reach the right audience</li>
                </ul>
              </div>
            </div>
          </div>

          <FormControls
            formControls={courseLandingPageFormControls}
            formData={courseLandingFormData}
            setFormData={setCourseLandingFormData}
          />
        </CardContent>
      </Card>

      {/* Preview Card */}
      {courseLandingFormData?.title && (
        <Card className="shadow-lg border-0 bg-gradient-to-r from-gray-50 to-blue-50">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
              Course Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  {courseLandingFormData.title.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{courseLandingFormData.title}</h3>
                  {courseLandingFormData.description && (
                    <p className="text-gray-600 mb-3 line-clamp-3">{courseLandingFormData.description}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm">
                    {courseLandingFormData.category && (
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                        {courseLandingFormData.category}
                      </span>
                    )}
                    {courseLandingFormData.level && (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                        {courseLandingFormData.level}
                      </span>
                    )}
                    {courseLandingFormData.pricing && (
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">
                        ${courseLandingFormData.pricing}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default CourseLanding;