const express = require('express');
const app = express();
const { port } = require('./app/config')
const apiRouter = require('./app/routes/api')
const cors = require('cors')
require('./app/db/mongoose')

app.use(express.json());
app.use(cors());
app.use('/api/', apiRouter);

app.listen(port, () => { console.log('Server is running', port) });
