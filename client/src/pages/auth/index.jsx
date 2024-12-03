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
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
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
    <div className="flex flex-col min-h-screen">
      

      <nav className="bg-gray-900 ">
      <div className="flex items-center  justify-between p-3 ">
        {/* Logo */}
        <div className="flex items-center space-x-4 ml-20">
          <img
            src="/LearnGate_Logo.png"
            alt="LearnGate Logo"
            style={{ width: "250px", height: "auto" }}
            className="ml-8"
          />
        </div>
  
        {/* Navbar Links aligned to the right */}
        <div className="flex items-center space-x-4">
          <div className="flex gap-5 items-center mr-48">
            {/* Home */}
            <div>
              <Link to="/Home" className="text-white hover:text-gray-300 font-bold">
                Home
              </Link>
            </div> 
          </div>
        </div>
      </div>
    </nav>




      <div className="flex items-center justify-center min-h-screen bg-background">
        <Tabs
          value={activeTab}
          defaultValue="signin"
          onValueChange={handleTabChange}
          className="w-full max-w-md"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Sign in to your account</CardTitle>
                <CardDescription>
                  Enter your email and password to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
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
          <TabsContent value="signup">
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Create a new account</CardTitle>
                <CardDescription>
                  Enter your details to get started
                </CardDescription>
                <CardDescription className="text-red-700 text-xs font-bold">
                  **Kindly Remember Your Email and Password. There is No Recovery Option Right Now.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <CommonForm
                  formControls={signUpFormControls}
                  buttonText={"Sign Up"}
                  formData={signUpFormData}
                  setFormData={setSignUpFormData}
                  handleSubmit={(e) => handleRegisterUser(e, setActiveTab("signin"))}
                  
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AuthPage;
