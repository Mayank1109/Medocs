const Regex = {
  fullName: {
    pattern: /^[a-zA-Z]+(?: [a-zA-Z]+)*$/,
    emptyMsg: "Name cannot be empty.",
    errorMsg: "Name should contain only alphabets.",
  },
  username: {
    pattern: /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/,
    emptyMsg: "Username cannot be empty.",
    errorMsg:
      "Username should not contain any special characters except underscore .",
  },
  fileName: {
    pattern: /^[a-zA-Z]+(?: [a-zA-Z]+)*$/,
    emptyMsg: "File name cannot be empty.",
    errorMsg:
      "File name should not contain any special characters except underscore .",
  },
  documentCategory: {
    pattern: /^[a-zA-Z]+(?: [a-zA-Z]+)*$/,
    emptyMsg: "Document category cannot be empty.",
    errorMsg:
      "Document category should not contain any special characters except underscore .",
  },
  description: {
    pattern: /^.{0,500}$/,
    emptyMsg: "", // optional field — don't error on empty
    errorMsg: "Description must be under 500 characters.",
  },
  email: {
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    emptyMsg: "Email cannot be empty.",
    errorMsg: "Email should contain @ and end with a valid domain",
  },
  phoneNumber: {
    pattern: /^(?!([6-9])\1{9})[6-9]\d{9}$/,
    emptyMsg: "Phone number cannot be empty.",
    errorMsg: "Phone number should start with 6-9 and must be of 10 digits",
  },
  password: {
    pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
    emptyMsg: "Password cannot be empty.",
    errorMsg:
      "Password must be at least 8 characters long, contain at least one uppercase letter, one digit, and one special character.",
  },
  loginPassword: {
    pattern: /^.+$/, // any non-empty value — don't re-enforce strength rules on login
    emptyMsg: "Password cannot be empty.",
    errorMsg: "Password cannot be empty.",
  },
  confirmPassword: {
    pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
    emptyMsg: "Please confirm your password.",
    errorMsg: "Passwords do not match.",
  },
};

export default Regex;
