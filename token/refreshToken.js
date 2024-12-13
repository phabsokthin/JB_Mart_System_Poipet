import db from '../config/config.js';
const User = db.User

import jwt from 'jsonwebtoken'

export const refresh = async (req, res) => {
    try {

        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) return res.sendStatus(401)
        const user = await User.findAll({
            where: {
                refreshToken: refreshToken
            }
        })
        
        if (!user[0]) return res.sendStatus(403)
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {

            if(err) return res.sendStatus(403)
            const userId = user[0].userId 
            const userName = user[0].userName
            const email = user[0].email
            
            const accessToken = jwt.sign({userId, userName, email}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            })
            res.json({accessToken})

        })
    }
    catch (err) {
        console.log(err)
    }
}