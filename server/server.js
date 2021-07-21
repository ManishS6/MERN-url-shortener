require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const uri = process.env.MONGO_URI
const option = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  useUnifiedTopology: true,
  useNewUrlParser: true
}
app.use(express.json({ limit: '50mb' }));

app.use(cors())
const db = require("./app/models");

db.mongoose
  .connect(uri,option)
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch(err => {
    console.error("Failed to connect MongoDB", err);
    process.exit();
  });

  app.get('/',(req,res)=>{
    res.json({
        greetings:"Hello Manish",
        Endpoint: "/"
    })
  })
// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);


app.listen(port,()=>{
    console.log(`Server is listening on ${port}`)
})

