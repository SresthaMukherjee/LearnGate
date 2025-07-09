import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Custom table components for better styling
const Table = ({ children, className = "" }) => (
  <div className={`w-full ${className}`}>{children}</div>
);

const TableHeader = ({ children }) => (
  <div className="table-header-group">{children}</div>
);

const TableBody = ({ children }) => (
  <div className="table-row-group">{children}</div>
);

const TableRow = ({ children, className = "" }) => (
  <div className={`table-row ${className}`}>{children}</div>
);

const TableHead = ({ children, className = "" }) => (
  <div className={`table-cell ${className}`}>{children}</div>
);

const TableCell = ({ children, className = "" }) => (
  <div className={`table-cell ${className}`}>{children}</div>
);
import { DollarSign, Users, BookOpen, TrendingUp, Award, Star } from "lucide-react";

function InstructorDashboard({ listOfCourses }) {
  function calculateTotalStudentsAndProfit() {
    const { totalStudents, totalProfit, studentList } = listOfCourses.reduce(
      (acc, course) => {
        const studentCount = course.students.length;
        acc.totalStudents += studentCount;
        acc.totalProfit += course.pricing * studentCount;

        course.students.forEach((student) => {
          acc.studentList.push({
            Instruct: course.instruct,
            courseTitle: course.title,
            studentName: student.studentName,
            studentEmail: student.studentEmail,
          });
        });

        return acc;
      },
      {
        totalStudents: 0,
        totalProfit: 0,
        studentList: [],
      }
    );

    return {
      totalProfit,
      totalStudents,
      studentList,
    };
  }

  console.log(calculateTotalStudentsAndProfit());

  const config = [
    {
      icon: Users,
      label: "Total Enrolled Students",
      value: calculateTotalStudentsAndProfit().totalStudents,
      color: "from-blue-500 to-purple-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: DollarSign,
      label: "Total Revenue Generated",
      value: `$${calculateTotalStudentsAndProfit().totalProfit.toLocaleString()}`,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
            <Award className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Instructor Dashboard
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Track your teaching success and student engagement in real-time
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {config.map((item, index) => (
            <Card key={index} className={`${item.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold text-gray-700">
                  {item.label}
                </CardTitle>
                <div className={`p-3 rounded-full bg-gradient-to-r ${item.color} shadow-lg`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <div className={`text-3xl font-bold ${item.iconColor}`}>
                    {item.value}
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600 font-medium">+12%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {index === 0 ? "Active learners this month" : "Compared to last month"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Students Table */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-full">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Student Enrollment Overview</CardTitle>
                <p className="text-purple-100 mt-1">Manage and track your students across all courses</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <div className="w-full table border-collapse">
                <div className="table-header-group">
                  <div className="table-row bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-purple-200">
                    <div className="table-cell font-bold text-gray-700 py-4 px-6 align-middle">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-purple-600" />
                        <span>Course Name</span>
                      </div>
                    </div>
                    <div className="table-cell font-bold text-gray-700 py-4 px-6 align-middle">
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-purple-600" />
                        <span>Instructor Name</span>
                      </div>
                    </div>
                    <div className="table-cell font-bold text-gray-700 py-4 px-6 align-middle">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-purple-600" />
                        <span>Student Name</span>
                      </div>
                    </div>
                    <div className="table-cell font-bold text-gray-700 py-4 px-6 align-middle">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-purple-600" />
                        <span>Student Email</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="table-row-group">
                  {calculateTotalStudentsAndProfit().studentList.map(
                    (studentItem, index) => (
                      <div 
                        key={index} 
                        className={`
                          table-row
                          ${index % 2 === 0 ? 'bg-white' : 'bg-gradient-to-r from-purple-50/50 to-pink-50/50'}
                          hover:bg-gradient-to-r hover:from-purple-100/70 hover:to-pink-100/70 
                          transition-all duration-200 border-b border-purple-100
                        `}
                      >
                        <div className="table-cell py-4 px-6 align-middle">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                              <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-800">{studentItem.courseTitle}</div>
                              <div className="text-sm text-gray-500">Active Course</div>
                            </div>
                          </div>
                        </div>
                        <div className="table-cell py-4 px-6 align-middle">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <Award className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-medium text-gray-800">{studentItem.Instruct}</span>
                          </div>
                        </div>
                        <div className="table-cell py-4 px-6 align-middle">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                              <Users className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-medium text-gray-800">{studentItem.studentName}</span>
                          </div>
                        </div>
                        <div className="table-cell py-4 px-6 align-middle">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                              <Star className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-medium text-gray-800">{studentItem.studentEmail}</span>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default InstructorDashboard;