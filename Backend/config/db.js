const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`Connected with Database`);
  })
  .catch((err) => {
    console.log(err.message);
  });
