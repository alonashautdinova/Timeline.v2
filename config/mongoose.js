const mongoose = require("mongoose");
const db =
  "mongodb+srv://user:eKKiNMBPSXZOq6vv@demochallenge.sbmc30k.mongodb.net/?retryWrites=true&w=majority&appName=DemoChallenge";
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));
