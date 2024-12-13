import db from '../config/config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const User = db.User;

export const register = async (req, res) => {
    const { userName, email, password, confpassword, permission } = req.body;

    if (password !== confpassword) {
        return res.status(400).json({ msg: "Passwords must match" });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ msg: "Email already in use" });
        }

       
        const bcryptSalt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, bcryptSalt);

 
        await User.create({
            userName,
            email,
            password: hashedPassword,
            permission
        });

        return res.status(201).json({ msg: "Registration successful" });
    } catch (err) {
        console.error("Error during registration:", err);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};


export const login = async (req, res) => {
    try {
        const user = await User.findAll({
            where: {
                email: req.body.email
            }
        })
        if (!user.length) {
            return res.status(400).json({ msg: "អុីម៉ែលមិនត្រឹមត្រូវ" })
        }

        const match = await bcrypt.compare(req.body.password, user[0].password)
        if (!match) return res.status(400).json({ msg: "លេខសម្ងាត់មិនត្រឹមត្រូវ" })
        const { userId, userName, email } = user[0]
        const accessToken = jwt.sign({ userId: userName, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        })

        const refreshTokens = jwt.sign({ userId, userName, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        })
        
        await User.update({ refreshToken: refreshTokens }, {
            where: {
                userId: user[0].userId
            }
        })
        res.cookie('refreshToken', refreshTokens, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        res.json({ accessToken })

    }
    catch (err) {
        console.log(err)
    }
}


export const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(204).send('No refresh token found'); // No refresh token to clear
    }

    try {
        // Find the user by refresh token
        const user = await User.findAll({
            where: {
                refreshToken: refreshToken
            }
        });

        if (!user[0]) {
            return res.status(204).send('No user found with this refresh token');
        }

        const userId = user[0].userId;

        // Remove refresh token from the user record in the database
        await User.update({ refreshToken: null }, {
            where: {
                userId: userId
            }
        });

        res.clearCookie('refreshToken', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        return res.status(200).send('Logged out successfully');
    } catch (err) {
        console.error('Logout error:', err);
        return res.status(500).send('Internal server error');
    }
};