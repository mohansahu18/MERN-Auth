import express from "express"
const router = express.Router();
import { login, signup } from "../controllers/auth.js";

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

export default router