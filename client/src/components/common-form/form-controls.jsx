import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

// Password visibility toggle component for better readability and reusability
const PasswordToggle = ({ isPasswordVisible, toggleShowPassword, fieldName }) => (
  <button
    type="button"
    onClick={() => toggleShowPassword(fieldName)}
    className="absolute right-2 top-2 text-gray-500 focus:outline-none"
  >
    {isPasswordVisible ? "Hide" : "Show"}
  </button>
);

function FormControls({ formControls = [], formData, setFormData, errors }) {
  // Local state to handle show/hide for password fields
  const [showPassword, setShowPassword] = useState({});

  // Toggles visibility of a password field
  const toggleShowPassword = (fieldName) => {
    setShowPassword((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  function renderComponentByType(controlItem) {
    let element = null;
    const currentControlItemValue = formData[controlItem.name] || "";
    const isPasswordField = controlItem.type === "password";
    const isPasswordVisible = showPassword[controlItem.name] || false;

    switch (controlItem.componentType) {
      case "input":
        element = (
          <div className="relative">
            <Input
              id={controlItem.name}
              name={controlItem.name}
              placeholder={controlItem.placeholder}
              type={isPasswordField && isPasswordVisible ? "text" : controlItem.type}
              value={currentControlItemValue}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [controlItem.name]: event.target.value,
                })
              }
            />
            {/* Toggle button for password fields */}
            {isPasswordField && (
              <PasswordToggle
                isPasswordVisible={isPasswordVisible}
                toggleShowPassword={toggleShowPassword}
                fieldName={controlItem.name}
              />
            )}
          </div>
        );
        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [controlItem.name]: value,
              })
            }
            value={currentControlItemValue}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={controlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {controlItem.options && controlItem.options.length > 0
                ? controlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            id={controlItem.name}
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            value={currentControlItemValue}
            onChange={(event) =>
              setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
      default:
        element = (
          <Input
            id={controlItem.name}
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            type={controlItem.type}
            value={currentControlItemValue}
            onChange={(event) =>
              setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <div className="flex flex-col gap-3">
      {formControls.map((controlItem) => (
        <div key={controlItem.name}>
          <Label htmlFor={controlItem.name}>{controlItem.label}</Label>
          {renderComponentByType(controlItem)}
          {/* Display validation error if any */}
          {errors && errors[controlItem.name] && (
            <div className="text-red-500 text-xs">{errors[controlItem.name]}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FormControls;
