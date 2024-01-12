import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Liga from "./componentes/liga";
import DetallesEquipo from "./componentes/detallesequipo";
import Busqueda from "./componentes/busqueda";  

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Liga />} />
        <Route path="/equipos/:id" element={<DetallesEquipo />} />
        <Route path="/busqueda" element={<Busqueda />} />
      </Routes>
    </Router>
  );
};

export default App;
