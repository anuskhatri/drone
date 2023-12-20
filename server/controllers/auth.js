const { verifyrece_token } = require('../middleware/jwtToken')
const { pool } = require('../config/dbConfig')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const senderEmail = process.env.SENDER_EMAIL
const senderPass = process.env.SENDER_APP_PASS
const secret = process.env.SESSION_SECRET
const urlAdddress = process.env.FRONTEND_URL

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: senderEmail,
        pass: senderPass
    }
})

const verifyUser = async (req, res) => {

    const { token } = req.body
    try {
        const user = await verifyrece_token(token)
        if (user == "not valid") {
            return res.send({ error: "invalid user" })
        }
        else if (user) {
            console.log(user);
            const result = await pool.query(
                `INSERT INTO disaster_detail(user_id, location) VALUES($1, POINT($2, $3)) RETURNING *`,
                [user.id, user.location.longitude, user.location.latitude]
            )

            return res.send({ message: "Alert sent", data: user })
        }
        else {
            res.send({ error: "something went wrong" })
        }
    } catch (error) {
        console.log(error);
        res.send({ error: "something went wrong" })
    }

}
module.exports = verifyUser