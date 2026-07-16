import { useToast } from "./useToast";
import { validateField } from "../utility/validation";

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

  return { validateInputHandler };
}
