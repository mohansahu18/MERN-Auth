import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import DbConnection from "./config/DbConnection.js";
import routing from "./routes/auth.js"
dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routing);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// db connection
DbConnection()