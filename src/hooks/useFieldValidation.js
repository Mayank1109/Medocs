import { useToast } from "./useToast";
import { validateField, validateFields } from "../utility/validation";

export function useFieldValidation() {
  const { showToast } = useToast();

  const validateInputHandler = (e) => {
    const { name, value, style } = e.target;
    const { valid, message } = validateField(name, value);

    style.border = valid ? "1px solid #ddd" : "2px solid #d26466";

    if (!valid) {
      showToast("error", message, { title: "Check this field" });
    }

    return !valid;
  };

  const validateFormHandler = (fields) => {
    const { valid, errors } = validateFields(fields);
    if (!valid) {
      Object.values(errors).forEach((message) => {
        showToast("error", message, { title: "Check this field" });
      });
    }
    return valid;
  };

  return { validateInputHandler, validateFormHandler };
}
