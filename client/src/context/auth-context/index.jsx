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
    // Regular expression to validate email with alphanumeric and at least one letter in the local part
    const emailRegex = /^[a-zA-Z0-9]*[a-zA-Z]+[a-zA-Z0-9]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com"];
  
    if (!emailRegex.test(email)) {
      alert("Invalid email format. email not accept only numerics, Use a valid domain like gmail.com, yahoo.com, or outlook.com.");
      return false;
    }
  
    // Extract the domain from the email
    const emailDomain = email.split("@")[1];
  
    // Check if the domain is in the allowed list
    return allowedDomains.includes(emailDomain.toLowerCase());
  }
  
  async function handleRegisterUser(event) {
    event.preventDefault();
    
  
    // Extract necessary fields for validation
    const { userName, userEmail, password, confirmPassword } = signUpFormData;
  
    // Validation checks
    const isUsernameValid = /^(?=.*[A-Za-z])[A-Za-z0-9]{2,}$/.test(userName);
    const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password); // At least one letter, one number, and 8 characters
    const isPasswordMatch = password === confirmPassword;
    const isEmailValid = isEmailAllowed(userEmail);
  
    // Display detailed alerts and stop execution if validation fails
    if (!isUsernameValid) {
      alert("Username should be 2 character long where it must contain at least 1 letter and not have spaces.");
      return;
    }
    if (!isEmailValid) {
      return; // Email validation already handled in `isEmailAllowed`
    }
    if (!isPasswordValid) {
      alert("Password must be at least 8 characters long and include at least one letter and one number.");
      return;
    }
    if (!isPasswordMatch) {
      alert("Passwords do not match.");
      return;
    }
  
    // Proceed with registration if all validations pass
      try {
        const data = await registerService(signUpFormData);
    
        if (data.success) {
          setSignUpFormData(initialSignUpFormData); // Reset form
          alert("Registration Successful! Now You SignIN Yourself...");
          setActiveTab("signin"); // Redirect to signin tab
        } else {
          alert(data.message); // Show error message from backend
        }
      } catch (error) {
        
        console.error(error);
      }
    }
  
  async function handleLoginUser(event) {
    event.preventDefault();
  
    try {
      const data = await loginService(signInFormData);
  
      if (data.success) {
        setSignInFormData(initialSignInFormData); // Reset form
        alert("Login Successful!");
        sessionStorage.setItem("accessToken", JSON.stringify(data.data.accessToken));
        setAuth({
          authenticate: true,
          user: data.data.user,
        });
      } else {
        alert("Login failed! Email or password is incorrect.");
        setAuth({
          authenticate: false,
          user: null,
        });
      }
    } catch (error) {
      alert("An error occurred during login. Please try again.");
      console.error(error);
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