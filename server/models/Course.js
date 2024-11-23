const mongoose = require("mongoose");

// Counter schema to keep track of sequential IDs for courses
const CounterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  sequenceValue: { type: Number, default: 1 }, // Start from 1
});

// Model for counter collection
const Counter = mongoose.model('Counter', CounterSchema);

// Function to generate custom Course ID (combining title, category, and a sequential number)
async function generateCourseId(title, category) {
  // Extract first 3 characters of the title and category, convert to uppercase
  const titlePart = title.slice(0, 3).toUpperCase();  // First 3 characters of title
  const categoryPart = category.slice(0, 3).toUpperCase();  // First 3 characters of category

  // Use the Counter model to generate a sequential number
  const counter = await Counter.findOneAndUpdate(
    { name: 'courseId' }, // This is the counter name, you can use different ones for each category
    { $inc: { sequenceValue: 1 } },  // Increment the sequence number
    { new: true, upsert: true } // Create the counter if it doesn't exist
  );

  // Create the final Course ID by combining title, category, and sequence number
  return `${titlePart}-${categoryPart}-${counter.sequenceValue.toString().padStart(3, '0')}`;
}

// Define the Lecture schema
const LectureSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  public_id: String,
  freePreview: Boolean,
});

// Define the Course schema
const CourseSchema = new mongoose.Schema({
  _id: { type: String },  // Custom Course ID will be generated dynamically
  instructorId: String,
  instructorName: String,
  date: { type: Date, default: Date.now },  // Default to current date if not provided
  title: String,
  category: String,
  level: String,
  primaryLanguage: String,
  subtitle: String,
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
  isPublised: { type: Boolean, default: false },  // Default to false if not provided
});

// Pre-save hook to generate Course ID dynamically
CourseSchema.pre("save", async function (next) {
  if (!this._id) {
    // Generate the course ID combining title, category, and a sequential number
    this._id = await generateCourseId(this.title, this.category);
  }
  next();  // Continue with saving the course
});

module.exports = mongoose.model("Course", CourseSchema);
