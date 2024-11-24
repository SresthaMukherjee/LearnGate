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
import { Link, useNavigate } from "react-router-dom";

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

  const navigate = useNavigate(); // To redirect after successful registration

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
    if (!signUpFormData.userEmail || !signUpFormData.userEmail.includes("@")) {
      return false;
    }

    const validEmailDomains = ["gmail.com", "yahoo.com", "yopmail.com"];
    const emailDomain = signUpFormData.userEmail.split("@").pop().toLowerCase();
    const isValidEmail = validEmailDomains.includes(emailDomain);

    const isValidPassword = signUpFormData.password.length >= 8;
    const isUsernameValid = /^[a-zA-Z0-9]{2,}$/.test(signUpFormData.userName);
    const isPasswordConfirmed = signUpFormData.password === signUpFormData.confirmPassword;

    return isUsernameValid && isValidEmail && isValidPassword && isPasswordConfirmed;
  }

  const [errorMessages, setErrorMessages] = useState([]);

  // Validation for Sign Up and Sign In
  function validateSignUpForm() {
    const errors = [];
    if (!signUpFormData.userEmail || !signUpFormData.userEmail.includes("@")) {
      errors.push("Email is required and must be valid.");
    }
    
    const validEmailDomains = ["gmail.com", "yahoo.com", "yopmail.com"];
    const emailDomain = signUpFormData.userEmail.split("@").pop().toLowerCase();
    if (!validEmailDomains.includes(emailDomain)) {
      errors.push("Email must be from a valid domain (Gmail, Yahoo, Yopmail).");
    }

    if (signUpFormData.password.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }

    if (!/^[a-zA-Z0-9]{2,}$/.test(signUpFormData.userName)) {
      errors.push("Username must be at least 2 characters long and alphabetic.");
    }

    if (signUpFormData.password !== signUpFormData.confirmPassword) {
      errors.push("Passwords must match.");
    }

    setErrorMessages(errors);
    return errors.length === 0;
  }

  function handleSignUpSubmit() {
    if (validateSignUpForm()) {
      handleRegisterUser(); // Register user if form is valid
      navigate("/home"); // Redirect to home after successful registration
    }
  }

  function handleSignInSubmit() {
    if (checkIfSignInFormIsValid()) {
      handleLoginUser(); // Login user if form is valid
      navigate("/home"); // Redirect to home after successful login
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-gray-900 p-4">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link className="flex items-center hover:text-black">
              <img
                src="/LearnGate_Logo.png"
                alt="LearnGate Logo"
                style={{ width: "200px", height: "auto" }}
                className="mr-4"
              />
            </Link>
          </div>
          <ul className="flex space-x-6 items-center ml-auto">
            <li>
              <Link to="/home" className="text-white hover:text-gray-300">
                Home
              </Link>
            </li>
          </ul>
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
                  isButtonDisabled={!checkIfSignInFormIsValid()}
                  handleSubmit={handleSignInSubmit}
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
                {/* Render error messages */}
                {errorMessages.length > 0 && (
                  <div className="text-red-600 space-y-1">
                    {errorMessages.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                )}
                <CommonForm
                  formControls={signUpFormControls}
                  buttonText={"Sign Up"}
                  formData={signUpFormData}
                  setFormData={setSignUpFormData}
                 
                  handleSubmit={handleSignUpSubmit}
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
