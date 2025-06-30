import { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from './Chart.jsx';

export default function App() {
  const [symbol, setSymbol] = useState('aapl');
  const [data, setData] = useState([]);
  const [signals, setSignals] = useState([]);
  const [symbolsList, setSymbolsList] = useState([]);

  const fetchData = async (sym) => {
    try {
      const d = await axios.get(`/api/data/${sym}`);
      setData(d.data);
      const s = await axios.get(`/api/signals/${sym}`);
      setSignals(s.data);
    } catch (err) {
      setData([]);
      setSignals([]);
    }
  };

  useEffect(() => { fetchData(symbol); }, [symbol]);

  useEffect(() => {
    axios.get('/api/symbols')
      .then(res => setSymbolsList(res.data))
      .catch(() => setSymbolsList([]));
  }, []);

  return (
    <div className="container-fluid p-3">
      <input
        list="symbols"
        type="text"
        className="form-control my-3"
        value={symbol}
        onChange={e => setSymbol(e.target.value.toLowerCase().trim())}
        placeholder="Símbolo"
      />
      <datalist id="symbols">
        {symbolsList.map(sym => (
          <option key={sym} value={sym} />
        ))}
      </datalist>
      <Chart data={data} signals={signals} />
    </div>
  );
}
