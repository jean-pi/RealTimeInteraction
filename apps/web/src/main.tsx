import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const App = () => {
  return (
    <div className="app-container">
      <h1>RealTime Interaction</h1>
      <p>Módulos cargados exitosamente. Arquitectura base de monorepo inicializada.</p>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
