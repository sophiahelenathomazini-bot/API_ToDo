const express = require('express');
require('dotenv').config();
const taskRoutes = require('./src/routes/taskRoutes');

const app = express();
app.use(express.json());
app.use(taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});