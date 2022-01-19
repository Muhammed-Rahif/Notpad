import './StatusBar.scss';
import os from 'os-utils';
import { useEffect, useState } from 'react';

function StatusBar() {
  const [cpuUsage, setCpuUsage] = useState(0);

  useEffect(() => {
    setInterval(() => {
      os.cpuUsage((usage) => setCpuUsage(Number((usage * 100).toFixed(1))));
    }, 500);
  }, []);

  return (
    <div className="status-bar">
      <p className="status-bar-field">Press F1 for help</p>
      <p className="status-bar-field">Slide 1</p>
      <p className="status-bar-field">CPU Usage: {cpuUsage}%</p>
    </div>
  );
}

export default StatusBar;
