import React from 'react';
import { Link } from 'react-router-dom'; // Make sure you have this import if you're using React Router

// Teammate data with image paths directly from the public folder
const teammates = [
  { name: 'Srestha Mukherjee', image: "/srestha.png" },
  { name: 'Utsho Saha', image: "/utsho.JPG" },
  { name: 'Sukanya Dey', image: "/sukanya.png" },
  { name: 'Tripti Das', image: "/tripti.png" },
  { name: 'Diganta Chowdhury', image: '/diganta.jpg' },
];

const AboutUs = () => {
  const auth = {}; // Placeholder for auth object; replace with actual authentication logic

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-gray-900 mx-auto">
      <div className="flex items-center  justify-between p-3 ">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img
            src="/LearnGate_Logo.png"
            alt="LearnGate Logo"
            style={{ width: "250px", height: "auto" }}
            className="ml-8"
          />
        </div>
  
        {/* Navbar Links aligned to the right */}
        <div className="flex items-center space-x-4">
          <div className="flex gap-5 items-center mr-20">
            {/* Home */}
            <div>
              <Link to="/Home" className="text-white hover:text-gray-300 font-bold">
                Home
              </Link>
            </div>
           
            
            {/* Login or Greeting */}
            <div>
              {!auth?.user && (
            
                  <Link to="/courses" className="text-white hover:text-gray-300 font-bold">
                    Explore Courses
                  </Link>
                
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>

      {/* Main Content */}
      <div className="bg-black text-white min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-100">About Us</h1>
        
        {/* Website Info Section */}
        <div className="bg-gray-900/60 rounded-lg p-6 mb-10 shadow-lg text-center backdrop-blur-sm">
          <h2 className="text-3xl font-semibold mb-4 text-indigo-400">Our Website</h2>
          <p className="text-gray-400 leading-relaxed">
            Welcome to our platform! We are dedicated to providing a comprehensive and user-friendly 
            experience for our learner. Our goal is to make online learning, project management, and 
            team collaboration more efficient and accessible for everyone.
          </p>
        </div>

        {/* Team Members Section */}
        <div className="mb-10">
          <h2 className="text-3xl font-semibold mb-6 text-center text-indigo-400">Meet the Team</h2>
          <div className="flex flex-wrap justify-center gap-8 ">
            {teammates.map((teammate, index) => (
              <div
                key={index}
                className="bg-gray-800/60 rounded-lg shadow-md p-5 max-w-xl text-center hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm "
              >
                <img
                  src={teammate.image}
                  alt={teammate.name}
                  className="w-32 h-32 mx-auto rounded-full mb-4 border-4 border-indigo-500 shadow-lg "
                />
                <h3 className="text-xl font-semibold text-gray-100">{teammate.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Location Section */}
        <div className="bg-gray-900/60 rounded-lg p-6 shadow-lg text-center backdrop-blur-sm">
          <h2 className="text-3xl font-semibold mb-4 text-indigo-400">Our Location</h2>
          <p className="text-gray-400 leading-relaxed">
            We are based in Kolkata, providing our services globally. Our team operates remotely, 
            allowing us to collaborate across different time zones and deliver the best results to our users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
