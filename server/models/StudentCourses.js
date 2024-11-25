const mongoose = require("mongoose");

const StudentCoursesSchema = new mongoose.Schema({
  userId: String,
  courses: [
    {
      courseId: String,
      title: String,
      instructorId: String,
      admin: String,
      dateOfPurchase: Date,
      courseImage: String,
    },
  ],
});

module.exports = mongoose.model("StudentCourses", StudentCoursesSchema);
