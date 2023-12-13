const { pool } = require('../config/dbConfig');

const emergency = async (req, res) => {
    const { name, email, contact, location } = req.body;
    console.log(req.body);
    try {
        const {longitude,latitude} = location

        const result = await pool.query(
            `INSERT INTO disaster_detail(username, email, contact_num, location) VALUES($1, $2, $3, POINT($4, $5)) RETURNING id, username, email, contact_num, location`,
            [name, email, contact, longitude, latitude]
        );

        res.status(200).json({ message: 'Data inserted successfully', insertedData: result.rows[0] });
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports = emergency;
