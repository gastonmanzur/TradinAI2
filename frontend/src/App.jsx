import { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from './Chart.jsx';

export default function App() {
  const [symbol, setSymbol] = useState('aapl');
  const [data, setData] = useState([]);
  const [signals, setSignals] = useState([]);

  const fetchData = async (sym) => {
    const d = await axios.get(`/api/data/${sym}`);
    setData(d.data);
    const s = await axios.get(`/api/signals/${sym}`);
    setSignals(s.data);
  };

  useEffect(() => { fetchData(symbol); }, [symbol]);

  return (
    <div className="container-fluid p-3">
      <input
        type="text"
        className="form-control my-3"
        value={symbol}
        onChange={e => setSymbol(e.target.value.toLowerCase())}
        placeholder="Símbolo (ej. AAPL)"
      />
      <Chart data={data} signals={signals} />
    </div>
  );
}
