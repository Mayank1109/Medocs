// Validation patterns and rules
const Regex = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    emptyMsg: "Email is required",
    errorMsg: "Please enter a valid email address",
  },
  password: {
    pattern:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    emptyMsg: "Password is required",
    errorMsg:
      "Password must be at least 8 characters with uppercase, lowercase, number, and special character",
  },
  name: {
    pattern: /^[a-zA-Z\s]{2,}$/,
    emptyMsg: "Name is required",
    errorMsg: "Name must contain only letters and be at least 2 characters",
  },
  phone: {
    pattern: /^[\d\s\-\+\(\)]{10,}$/,
    emptyMsg: "Phone number is required",
    errorMsg: "Please enter a valid phone number",
  },
  zipcode: {
    pattern: /^\d{5}(?:-\d{4})?$/,
    emptyMsg: "Zip code is required",
    errorMsg: "Please enter a valid zip code",
  },
  documentTitle: {
    pattern: /^.{1,255}$/,
    emptyMsg: "Document title is required",
    errorMsg: "Document title must not exceed 255 characters",
  },
};

export default Regex;
