import { validateField, validateFields } from "../utility/validation";
import { useToast } from "./useToast";

export function useFieldValidation() {
  const toast = useToast();

  const validateInputHandler = (e) => {
    const { name, value, style } = e.target;
    const { valid, message } = validateField(name, value);

    style.border = valid ? "1px solid #ddd" : "2px solid #d26466";

    if (!valid) {
      toast.error("Check this field", message);
    }

    return !valid;
  };

  const validateFormHandler = (fields) => {
    const { valid, errors } = validateFields(fields);
    if (!valid) {
      Object.values(errors).forEach((message) => {
        toast.error("Check this field", message);
      });
    }
    return valid;
  };

  return { validateInputHandler, validateFormHandler };
}
