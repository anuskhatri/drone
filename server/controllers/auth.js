const { verifyrece_token } = require('../middleware/jwtToken')
const { pool } = require('../config/dbConfig')

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
            return res.send({ message: "Alert sent", data:user })
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