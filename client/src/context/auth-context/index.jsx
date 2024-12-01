import { Skeleton } from "@/components/ui/skeleton"; //skeleton is a loading placeholder
import { initialSignInFormData, initialSignUpFormData } from "@/config"; //Imports initial form data templates for sign-in and sign-up forms.
import { checkAuthService, loginService, registerService } from "@/services";//Imports API service functions for checking authentication, logging in, and registering users
import { createContext, useEffect, useState } from "react";//React hooks

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState({
    ...initialSignUpFormData,
    reEnterPassword: "", // Added for password re-entry
  });
  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
  });
  const [loading, setLoading] = useState(true);

  function isEmailAllowed(email) {
    const allowedDomains = ["gmail.com", "yahoo.com","outlook.com"];
    const emailDomain = email.split("@")[1];
    return allowedDomains.includes(emailDomain.toLowerCase());
  }

  function validateSignUpForm() {
    const { userName, userEmail, password, reEnterPassword } = signUpFormData;
    const isUsernameValid = /^[A-Za-z0-9]{2,}$/.test(userName);
    const isPasswordValid = password.length >= 8;
    const isPasswordMatch = password === reEnterPassword;
    const isEmailValid = isEmailAllowed(userEmail);

    return (
      isUsernameValid && isPasswordValid && isPasswordMatch && isEmailValid
    );
  }

  async function handleRegisterUser(event) {
    event.preventDefault();
  
    // Extract necessary fields for validation
    const { userName, userEmail, password, confirmPassword } = signUpFormData;
  
    // Validation checks
    const isUsernameValid = /^[A-Za-z0-9]{2,}$/.test(userName);
    const isPasswordValid = password.length >= 8;
    const isPasswordMatch = password === confirmPassword;
    const isEmailValid = isEmailAllowed(userEmail);
  
    // Display detailed alerts and stop execution if validation fails
    if (!isUsernameValid) {
      alert("Username must contain at least 2 letters and No Space contains ");
      return; // Prevents further execution
    }
    if (!isEmailValid) {
      alert("Invalid email domain. Use gmail.com, yahoo.com or outlook.com.");
      return; // Prevents further execution
    }
    if (!isPasswordValid) {
      alert("Password must be at least 8 characters.");
      return; // Prevents further execution
    }
    if (!isPasswordMatch) {
      alert("Passwords do not match.");
      return; // Prevents further execution
    }
  
    // Proceed with registration if all validations pass
    try {
      const data = await registerService(signUpFormData);
      
  
      if (data.success) {
        setSignUpFormData(initialSignUpFormData); // Reset form
        alert("Registration Successful!");
        
        setAuth({
          authenticate: true,
          user: data.data.user,
        });
        
      } else {
        alert(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      alert("Your Email or User Name is Exist.Please Change It");
      console.error(error);
    }
  }
  

  async function handleLoginUser(event) {
    event.preventDefault();
    const data = await loginService(signInFormData);
    console.log(data, "datadatadatadatadata");
    if (!isEmailValid) {
      alert("Invalid email not correct");
      return; // Prevents further execution
    }
    if (!isPasswordValid) {
      alert("Password not match.");
      return; // Prevents further execution
    }

    if (data.success) {
      setSignInFormData(initialSignInFormData);
      alert("login Successful!");
      sessionStorage.setItem(
        "accessToken",
        JSON.stringify(data.data.accessToken)
      );
      setAuth({
        authenticate: true,
        user: data.data.user,
      });
    } else {
      alert("Login failed! please check your ");
      setAuth({
        authenticate: false,
        user: null,
      });
    }
  }

  async function checkAuthUser() {
    try {
      const data = await checkAuthService();
      if (data.success) {
        setAuth({
          authenticate: true,
          user: data.data.user,
        });
        setLoading(false);
      } else {
        setAuth({
          authenticate: false,
          user: null,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (!error?.response?.data?.success) {
        setAuth({
          authenticate: false,
          user: null,
        });
        setLoading(false);
      }
    }
  }

  function resetCredentials() {
    setAuth({
      authenticate: false,
      user: null,
    });
  }

  useEffect(() => {
    checkAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        auth,
        resetCredentials,
      }}
    >
      {loading ? <Skeleton /> : children}
    </AuthContext.Provider>
  );
}