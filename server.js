const { mongoose } = require("mongoose");
const app = require("./app");
require("dotenv").config();





const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Mongo connected');
     })
  .catch(err => {
    console.error('DB connect error', err);
    process.exit(1);
  });





app.listen(PORT, () => {
  console.log(`Server running on ${PORT} ....`);
});
