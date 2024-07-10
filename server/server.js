const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 8000;
// console.log(process.env);
app.listen(port, () => {
  console.log(`server Started on port ${port}`);
});
