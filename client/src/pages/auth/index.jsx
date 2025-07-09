import CommonForm from "@/components/common-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signInFormControls, signUpFormControls } from "@/config";
import { AuthContext } from "@/context/auth-context";
import { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';

function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");
  const {
    signInFormData,
    setSignInFormData,
    signUpFormData,
    setSignUpFormData,
    handleRegisterUser,
    handleLoginUser,
  } = useContext(AuthContext);
  // const navigate = useNavigate();
  
  function handleTabChange(value) {
    setActiveTab(value);
  }

  function checkIfSignInFormIsValid() {
    return (
      signInFormData &&
      signInFormData.userEmail !== "" &&
      signInFormData.password !== ""
    );
  }

  function checkIfSignUpFormIsValid() {
    return isUsernameValid && isValidEmail && isValidPassword && isPasswordConfirmed;
  }
  
  const [errorMessages, setErrorMessages] = useState([]);

  console.log(signInFormData);
  console.log(signUpFormData);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Funky Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rotate-45 opacity-30 animate-spin-slow"></div>
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-15 animate-pulse"></div>
        <div className="absolute bottom-20 right-32 w-28 h-28 bg-gradient-to-r from-yellow-400 to-orange-500 rotate-12 opacity-25 animate-bounce"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      {/* Top Navigation */}
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
            <div className="flex items-center space-x-6">
              <a href="/Home" className="relative group">
                <span className="text-white font-semibold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 transition-all duration-300">
                  Home
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></div>
              </a>
              <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-50"></div>
              <a href="/about" className="text-white/80 hover:text-white transition-colors">About</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-6 relative z-10">
        <div className="w-full max-w-md">
          
          {/* Welcome Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">LearnGate</span>
            </h2>
            <p className="text-white/70 text-lg">
              Your gateway to endless learning possibilities
            </p>
          </div>

          {/* Auth Tabs */}
          <Tabs
            value={activeTab}
            defaultValue="signin"
            onValueChange={handleTabChange}
            className="w-full"
          >
            {/* Funky Tab List */}
            <TabsList className=" w-full grid grid-cols-2 mb-6 bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-0">
              <TabsTrigger 
                value="signin" 
                className="relative py-3 px-6 rounded-xl font-semibold transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-500/25 text-white/70 hover:text-white"
              >
                <span className="relative z-10">Sign In</span>
                {activeTab === "signin" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl animate-pulse opacity-20"></div>
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="signup" 
                className="relative py-3 px-6 rounded-xl font-semibold transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-purple-500/25 text-white/70 hover:text-white"
              >
                <span className="relative z-10">Sign Up</span>
                {activeTab === "signup" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl animate-pulse opacity-20"></div>
                )}
              </TabsTrigger>
            </TabsList>

            {/* Sign In Content */}
            <TabsContent value="signin" className="space-y-0">
              <Card className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                
                <CardHeader className="text-center py-8">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/25 rotate-3 hover:rotate-0 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <CardTitle className="text-2xl font-bold text-white mb-2">
                    Welcome Back! 👋
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    Ready to continue your learning adventure?
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="px-8 pb-8">
                  <CommonForm
                    formControls={signInFormControls}
                    buttonText={"Sign In"}
                    formData={signInFormData}
                    setFormData={setSignInFormData}
                    handleSubmit={handleLoginUser}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sign Up Content */}
            <TabsContent value="signup" className="space-y-0">
              <Card className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                
                <CardHeader className="text-center py-8">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/25 rotate-3 hover:rotate-0 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <CardTitle className="text-2xl font-bold text-white mb-2">
                    Join the Fun! 🚀
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    Start your amazing learning journey today
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="px-8 pb-8 space-y-6">
                  {/* Fun Warning Message */}
                  <div className="relative p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20 backdrop-blur-sm">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
                        </svg>
                      </div>
                      <p className="text-yellow-100 text-sm font-medium">
                        <span className="font-bold">Hey there!</span> Remember your login details - no password recovery yet! 🔐
                      </p>
                    </div>
                  </div>
                  
                  <CommonForm
                    formControls={signUpFormControls}
                    buttonText={"Sign Up"}
                    formData={signUpFormData}
                    setFormData={setSignUpFormData}
                    handleSubmit={(e) => handleRegisterUser(e, setActiveTab)}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Fun Footer */}
          <div className="text-center mt-8">
            <p className="text-white/50 text-sm">
              Made with 💜 for awesome learners like you!
            </p>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
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
}

export default AuthPage;