const express = require('express');
const cors = require('cors');
// Removed authentication dependencies
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


app.get('/api/data/:symbol', (req, res) => {
  const symbol = req.params.symbol.toLowerCase();
  const file = path.join(__dirname, 'data', `${symbol}.json`);
  if (!fs.existsSync(file)) return res.status(404).json({ error: 'Symbol not found' });
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  res.json(data);
});

function calculateSignals(data) {
  const signals = [];
  const closes = data.map(d => d[4]);
  const times = data.map(d => d[0]);
  const maShort = [];
  const maLong = [];
  const shortPeriod = 10;
  const longPeriod = 20;
  for (let i = 0; i < data.length; i++) {
    if (i >= shortPeriod - 1) {
      const slice = closes.slice(i - shortPeriod + 1, i + 1);
      maShort.push(slice.reduce((a,b) => a + b, 0) / shortPeriod);
    } else {
      maShort.push(null);
    }
    if (i >= longPeriod - 1) {
      const slice = closes.slice(i - longPeriod + 1, i + 1);
      maLong.push(slice.reduce((a,b) => a + b, 0) / longPeriod);
    } else {
      maLong.push(null);
    }
    if (i > 0 && maShort[i] && maLong[i] && maShort[i-1] && maLong[i-1]) {
      if (maShort[i] > maLong[i] && maShort[i-1] <= maLong[i-1]) {
        signals.push({ time: times[i], type: 'buy' });
      }
      if (maShort[i] < maLong[i] && maShort[i-1] >= maLong[i-1]) {
        signals.push({ time: times[i], type: 'sell' });
      }
    }
  }
  return signals;
}

app.get('/api/signals/:symbol', (req, res) => {
  const symbol = req.params.symbol.toLowerCase();
  const file = path.join(__dirname, 'data', `${symbol}.json`);
  if (!fs.existsSync(file)) return res.status(404).json({ error: 'Symbol not found' });
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const signals = calculateSignals(data);
  res.json(signals);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
