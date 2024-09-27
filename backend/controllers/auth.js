import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"


export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // valaidation
        if (!username || !email || !password) {
            return res.status(400).json({ msg: 'field missing' });
        }

        // Check for email already exists
        let user = await User.findOne({ email });
        console.log(user);

        if (user) {
            return res.status(400).json({ msg: 'Email already in use' });
        }

        // Check for username already exists
        user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'Username already taken' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        // Create new user
        user = new User({
            username,
            email,
            password: hashedpassword
        });

        user.save()
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid Email' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Password' });
        }

        // Create and send token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}