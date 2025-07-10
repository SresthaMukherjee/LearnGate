import MediaProgressbar from "@/components/media-progress-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { InstructorContext } from "@/context/instructor-context";
import { mediaUploadService } from "@/services";
import { useContext } from "react";
import { Settings, Image, Upload, Trash2, Eye, Camera } from "lucide-react";

function CourseSettings() {
  const {
    courseLandingFormData,
    setCourseLandingFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercentage,
    setMediaUploadProgressPercentage,
  } = useContext(InstructorContext);

  // Handle image upload change
  async function handleImageUploadChange(event) {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      const imageFormData = new FormData();
      imageFormData.append("file", selectedImage);

      try {
        setMediaUploadProgress(true);
        const response = await mediaUploadService(
          imageFormData,
          setMediaUploadProgressPercentage
        );
        if (response.success) {
          setCourseLandingFormData({
            ...courseLandingFormData,
            image: response.data.url,
          });
          setMediaUploadProgress(false);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  // Handle delete image action
  function handleImageDelete() {
    setCourseLandingFormData({
      ...courseLandingFormData,
      image: "", // Remove the image URL from the state
    });
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white border-0 shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Settings className="h-8 w-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-white text-3xl font-bold">Course Settings</CardTitle>
              <p className="text-white/80 text-lg mt-2">Customize your course appearance and settings</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Image Upload Card */}
      <Card className="shadow-xl border-0 bg-white rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100 p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <Image className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800">Course Thumbnail</CardTitle>
              <p className="text-gray-600 mt-1">Upload an attractive image that represents your course</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          {/* Progress Bar */}
          {mediaUploadProgress && (
            <div className="mb-6 p-4 bg-orange-50 rounded-xl border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <Upload className="h-4 w-4 text-orange-600" />
                <span className="text-orange-800 font-medium">Uploading image...</span>
              </div>
              <MediaProgressbar
                isMediaUploading={mediaUploadProgress}
                progress={mediaUploadProgressPercentage}
              />
            </div>
          )}

          {courseLandingFormData?.image ? (
            /* Image Preview Section */
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-center gap-2 text-green-600 font-medium mb-4">
                  <Eye className="h-5 w-5" />
                  Current Course Thumbnail
                </div>
                <div className="relative group">
                  <img
                    src={courseLandingFormData.image}
                    alt="Course Thumbnail"
                    className="w-full max-w-md h-64 object-cover rounded-xl shadow-lg border border-gray-200 group-hover:shadow-xl transition-shadow duration-200"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-xl transition-colors duration-200"></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="text-blue-600 border-blue-200 hover:bg-blue-50 flex items-center gap-2"
                  onClick={() => document.getElementById('image-upload-input').click()}
                >
                  <Camera className="h-4 w-4" />
                  Replace Image
                </Button>
                <Button
                  variant="outline"
                  onClick={handleImageDelete}
                  className="text-red-600 border-red-200 hover:bg-red-50 flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Image
                </Button>
              </div>

              {/* Hidden file input */}
              <Input
                id="image-upload-input"
                onChange={handleImageUploadChange}
                type="file"
                accept="image/*"
                className="hidden"
              />
            </div>
          ) : (
            /* Upload Section */
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Image className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">📸 Image Guidelines</h3>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Use high-quality images (minimum 1280x720 pixels)</li>
                      <li>• Choose images that clearly represent your course topic</li>
                      <li>• Avoid cluttered or busy images</li>
                      <li>• Ensure good contrast and readability</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-orange-400 hover:bg-orange-50/30 transition-all duration-200">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Upload className="h-10 w-10 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Upload Course Image</h3>
                <p className="text-gray-600 mb-6">Select an image that will attract students to your course</p>

                <div className="space-y-4">
                  <Label htmlFor="course-image-upload" className="cursor-pointer">
                    <Button
                      type="button"
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 mx-auto"

                      onClick={() =>
                        document.getElementById("image-upload-input").click()
                      }
                    >
                      <Upload className="h-5 w-5" />
                      Upload Image
                    </Button>
                  </Label>

                  {/* Hidden file input for image upload */}
                  <Input
                    id="image-upload-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUploadChange}
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default CourseSettings;
