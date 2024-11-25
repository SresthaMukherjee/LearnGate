const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  public_id: String,
  freePreview: Boolean,
});

// Define the Course schema
const CourseSchema = new mongoose.Schema({

  instructorId: String,
  admin: String,
  date: Date,
  title: String,
  category: String,
  level: String,
  primaryLanguage: String,
  description: String,
  image: String,
  welcomeMessage: String,
  pricing: Number,
  objectives: String,
  students: [
    {
      studentId: String,
      studentName: String,
      studentEmail: String,
      paidAmount: String,
    },
  ],
  curriculum: [LectureSchema],
  isPublised: Boolean,
});

module.exports = mongoose.model("Course", CourseSchema);
