const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3002;

app.use(bodyParser.json());
app.use(cors());

let billetera = [
  { amount: 100},
];

app.post('/cobrar-pedido', (req, res) => {
  console.log(req.body)
  const amount = req.body.amount;

  const saldoRestante = billetera[0].amount - amount;
  console.log('A')

  if (saldoRestante > 0) {
    res.status(200).json({
      message: `Cobro de ${saldoRestante} pe exitoso`
    });
    billetera[0].amount = saldoRestante

  } else {
    res.status(400).json({
      message: `Te faltan ${saldoRestante * -1} capo`
    });
  }
});

app.get('/billetera', (req, res) => {
  res.status(200).json(billetera[0].amount);
});

app.listen(port, () => {
  console.log(`Finanzas MS corriendo en http://localhost:${port}`);
});