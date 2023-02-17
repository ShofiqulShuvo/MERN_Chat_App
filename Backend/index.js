// config dotenv for reading env file
require("dotenv").config();

const app = require("./app");
const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
  console.log(`Server is Running at http://localhost:${PORT}`);
});
