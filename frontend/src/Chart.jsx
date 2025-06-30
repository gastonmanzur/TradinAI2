import { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

export default function Chart({ data, signals }) {
  const containerRef = useRef(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;
    const chart = createChart(containerRef.current, { width: clientWidth, height: clientHeight });
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
    const handleResize = () => {
      chart.resize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, signals]);
  return <div ref={containerRef} className="w-100" style={{ height: '100vh' }} />;
}
