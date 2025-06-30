import { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

export default function Chart({ data, signals }) {
  const containerRef = useRef(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const chart = createChart(containerRef.current, { height: 400 });
    const candleSeries = chart.addCandlestickSeries();
    candleSeries.setData(
      data.map(d => ({ time: d[0]/1000, open: d[1], high: d[2], low: d[3], close: d[4] }))
    );
    const markers = signals.map(s => ({
      time: s.time/1000,
      position: s.type === 'buy' ? 'belowBar' : 'aboveBar',
      color: s.type === 'buy' ? 'green' : 'red',
      shape: 'text',
      text: s.type === 'buy' ? 'COMPRA' : 'VENTA'
    }));
    candleSeries.setMarkers(markers);
    return () => chart.remove();
  }, [data, signals]);
  return <div ref={containerRef} />;
}
