import { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from './Chart.jsx';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export default function App() {
  const [symbol, setSymbol] = useState('aapl');
  const [data, setData] = useState([]);
  const [signals, setSignals] = useState([]);
  const [user, setUser] = useState(null);

  const fetchData = async (sym) => {
    const d = await axios.get(`/api/data/${sym}`);
    setData(d.data);
    const s = await axios.get(`/api/signals/${sym}`);
    setSignals(s.data);
  };

  useEffect(() => { fetchData(symbol); }, [symbol]);

  return (
    <GoogleOAuthProvider clientId="GOOGLE_CLIENT_ID">
      <div style={{ padding: '1rem' }}>
        {user ? <p>Bienvenido {user.name}</p> :
          <GoogleLogin onSuccess={(cred) => setUser({ name: 'Usuario Google' })} onError={() => alert('Error')} />}
        <select value={symbol} onChange={e => setSymbol(e.target.value)}>
          <option value="aapl">AAPL</option>
          <option value="goog">GOOG</option>
        </select>
        <Chart data={data} signals={signals} />
      </div>
    </GoogleOAuthProvider>
  );
}
