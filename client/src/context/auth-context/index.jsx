import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuthService, loginService, registerService } from "@/services";
import { createContext, useEffect, useState } from "react";

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
    const allowedDomains = ["gmail.com", "yahoo.com", "yopmail.com"];
    const emailDomain = email.split("@")[1];
    return allowedDomains.includes(emailDomain.toLowerCase());
  }

  function validateSignUpForm() {
    const { userName, userEmail, password, reEnterPassword } = signUpFormData;
    const isUsernameValid = /^[A-Za-z]{2,}$/.test(userName);
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
    const isUsernameValid = /^[A-Za-z]{2,}$/.test(userName);
    const isPasswordValid = password.length >= 8;
    const isPasswordMatch = password === confirmPassword;
    const isEmailValid = isEmailAllowed(userEmail);
  
    // Display detailed alerts and stop execution if validation fails
    if (!isUsernameValid) {
      alert("Username must contain at least 2 letters.");
      return; // Prevents further execution
    }
    if (!isEmailValid) {
      alert("Invalid email domain. Use gmail.com, yahoo.com, or yopmail.com.");
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
        alert("Registration successful!");
        setAuth({
          authenticate: true,
          user: data.data.user,
        });
        
      } else {
        alert(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      alert("An error occurred during registration. Please try again later.");
      console.error(error);
    }
  }
  

  async function handleLoginUser(event) {
    event.preventDefault();
    const data = await loginService(signInFormData);
    console.log(data, "datadatadatadatadata");

    if (data.success) {
      alert("login successful!");
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