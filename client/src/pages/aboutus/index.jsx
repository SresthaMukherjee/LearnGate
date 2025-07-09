import React from 'react';
// import { Link } from 'react-router-dom'; // Make sure you have this import if you're using React Router

// Teammate data with image paths directly from the public folder
const teammates = [
  { name: 'Srestha Mukherjee', image: "/srestha.png" },
  { name: 'Utsho Saha', image: "/utsho.JPG" },
  { name: 'Sukanya Dey', image: "/sukanya.png" },
  { name: 'Tripti Das', image: "/tripti.png" },
];

const AboutUs = () => {
  const auth = {}; // Placeholder for auth object; replace with actual authentication logic

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Funky Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-400 rotate-45 opacity-20 animate-spin-slow"></div>
        <div className="absolute bottom-40 left-32 w-48 h-48 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-15 animate-bounce-slow"></div>
        <div className="absolute bottom-20 right-10 w-36 h-36 bg-gradient-to-r from-yellow-400 to-orange-500 rotate-12 opacity-20 animate-pulse"></div>
        
        {/* Floating Dots */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-pink-400 rounded-full opacity-60 animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-blue-400 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-green-400 rounded-full opacity-50 animate-pulse"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      {/* Enhanced Navigation */}
      <nav className="relative z-50 bg-black/10 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-400 to-pink-500 rounded-xl blur opacity-30"></div>
              </div>
              <h1 className="text-2xl font-bold text-white">
                Learn<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Gate</span>
              </h1>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              <a href="/Home" className="relative group">
                <span className="text-white font-semibold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 transition-all duration-300">
                  Home
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></div>
              </a>
              
              {!auth?.user && (
                <a href="/courses" className="relative group">
                  <span className="text-white font-semibold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all duration-300">
                    Explore Courses
                  </span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></div>
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen p-8">
        {/* Hero Section */}
        <div className="text-center mb-16 pt-8">
          <div className="relative inline-block">
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
              About Us
            </h1>
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
          </div>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">
            Meet the amazing team behind LearnGate! 🚀
          </p>
        </div>

        {/* Website Info Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60 animate-pulse"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 rotate-3 hover:rotate-0 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Our Mission 🎯
              </h2>
              <p className="text-white/80 text-lg leading-relaxed text-center">
                Welcome to our platform! We are dedicated to providing a comprehensive and user-friendly 
                experience for our learner. Our goal is to make online learning, project management, and 
                team collaboration more efficient and accessible for everyone. ✨
              </p>
            </div>
          </div>
        </div>

        {/* Team Members Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Dream Team</span> 👥
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teammates.map((teammate, index) => (
              <div
                key={index}
                className="group relative bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-3xl"></div>
                
                {/* Floating decoration */}
                <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60 animate-pulse"></div>
                
                <div className="text-center relative z-10">
                  <div className="relative mb-6">
                    <img
                      src={teammate.image}
                      alt={teammate.name}
                      className="w-24 h-24 mx-auto rounded-full border-4 border-purple-400 shadow-lg shadow-purple-500/25 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                    {teammate.name}
                  </h3>
                  
                  <div className="mt-4 flex justify-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full opacity-60"></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full opacity-60"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-blue-500"></div>
            <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-60 animate-bounce"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25 rotate-3 hover:rotate-0 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Our Location 🌍
              </h2>
              <p className="text-white/80 text-lg leading-relaxed text-center">
                We are based in <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 font-bold">Kolkata</span>, providing our services globally. Our team operates remotely, 
                allowing us to collaborate across different time zones and deliver the best results to our users. 🌟
              </p>
            </div>
          </div>
        </div>

        {/* Fun Footer */}
        <div className="text-center mt-16 pb-8">
          <div className="flex justify-center space-x-4 mb-4">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
          <p className="text-white/60 text-sm">
            Made with 💜 by the LearnGate team in Kolkata
          </p>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
};

export default AboutUs;