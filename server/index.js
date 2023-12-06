import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import imaigeRoutes from "./routes/imaigeRoutes.js";

dotenv.config(); //set up dotenv

const app = express();
app.use(cors()); //middleware
app.use(express.json({ limit: "50mb" })); //middleware to prevent abuse or denial-of-service attacks through limiting size of incoming data

app.use("/api/v1/post", postRoutes); //using v1 versioning to allow clients to continue using the existing REST API and migrate thier applications to the newer API when they are ready
app.use("/api/v1/imaige", imaigeRoutes);

app.get("/", async (req, res) => {
  //checking if app works
  res.send("Hello from IMAIGE");
});

const startServer = async () => {
  //starting the server on a port, before listening, we need to connect to MongoDB
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log("Server has started on port http://localhost:8080")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
