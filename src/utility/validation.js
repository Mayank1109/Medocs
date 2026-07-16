import Regex from "../data/validationData";
import { showMessage } from "./Functions";

export function validateField(name, value) {
  const regexConfig = Regex[name];
  if (!regexConfig) return { valid: true, message: "" };

  const trimmed = (value ?? "").trim();
  if (!trimmed) {
    if (!regexConfig.emptyMsg) return { valid: true, message: "" }; // optional field
    return { valid: false, message: regexConfig.emptyMsg };
  }
  if (!regexConfig.pattern.test(trimmed)) {
    return { valid: false, message: regexConfig.errorMsg };
  }
  return { valid: true, message: "" };
}

// Validates a set of {fieldName: value} pairs, returns { valid, errors: {fieldName: message} }
export function validateFields(fields) {
  const errors = {};
  for (const [name, value] of Object.entries(fields)) {
    const result = validateField(name, value);
    if (!result.valid) errors[name] = result.message;
  }
  return { valid: Object.keys(errors).length === 0, errors };
}
