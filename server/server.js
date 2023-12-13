const express = require('express');
const cors = require('cors');
const { connectDb } = require('./config/dbConfig');
const indexRoute = require('./routes/indexRoute');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors())
app.options('*', cors());
app.use(express.json());
app.use('/api', indexRoute);

connectDb();

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
