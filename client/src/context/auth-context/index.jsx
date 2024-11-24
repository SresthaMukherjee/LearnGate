import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuthService, loginService, registerService } from "@/services";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate(); // For redirecting after successful registration

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

    const { userName, userEmail, password, reEnterPassword } = signUpFormData;
    const errors = [];

    // Validation checks
    if (!/^[A-Za-z]{2,}$/.test(userName)) {
      errors.push("Username must contain at least 2 letters.");
    }
    if (!isEmailAllowed(userEmail)) {
      errors.push("Invalid email domain. Use gmail.com, yahoo.com, or yopmail.com.");
    }
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters.");
    }
    if (password !== reEnterPassword) {
      errors.push("Passwords do not match.");
    }

    if (errors.length > 0) {
      setErrorMessages(errors); // Display validation errors
      return; // Stop further execution if validation fails
    }

    try {
      const data = await registerService(signUpFormData);

      if (data.success) {
        setSignUpFormData(initialSignUpFormData); // Reset form
        setErrorMessages([]); // Clear error messages
        setAuth({
          authenticate: true,
          user: data.data.user,
        });
        navigate("/home"); // Redirect to home after successful registration
      } else {
        setErrorMessages([data.message || "Registration failed. Please try again."]);
      }
    } catch (error) {
      setErrorMessages(["An error occurred during registration. Please try again later."]);
      console.error(error);
    }
  }

  async function handleLoginUser(event) {
    event.preventDefault();
    const data = await loginService(signInFormData);

    if (data.success) {
      sessionStorage.setItem("accessToken", JSON.stringify(data.data.accessToken));
      setAuth({
        authenticate: true,
        user: data.data.user,
      });
      navigate("/home"); // Redirect to home after successful login
    } else {
      setErrorMessages(["Login failed! Please check your credentials."]);
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
      } else {
        setAuth({
          authenticate: false,
          user: null,
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setAuth({
        authenticate: false,
        user: null,
      });
      setLoading(false);
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
        errorMessages,
      }}
    >
      {loading ? <Skeleton /> : children}
    </AuthContext.Provider>
  );
}
