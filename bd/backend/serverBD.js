const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const orderRoutes = require('./routes/orderRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Usar las rutas
app.use('/api/order', orderRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});