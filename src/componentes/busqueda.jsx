import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/resultado.css"

const Busqueda = ({ equipos }) => {
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    // Verificar si equipos es diferente de null antes de realizar la búsqueda
    if (equipos) {
      // Filtrar equipos en función de la consulta (nombre completo)
      const equiposFiltrados = equipos.filter((equipo) =>
        equipo.strTeam.toLowerCase() === query.toLowerCase()
      );
      setResultados(equiposFiltrados);
    }
  }, [query, equipos]);

  return (
    <div className="resultado">
      <input
        type="text"
        placeholder="Buscar equipos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {resultados.length > 0 && (
        <ul>
          {resultados.map((equipo) => (
            <li key={equipo.idTeam}>
              <Link to={`/equipos/${equipo.idTeam}`}>
                <img src={equipo.strTeamBadge} alt={`Escudo del equipo ${equipo.strTeam}`} />
              </Link>
              {equipo.strTeam}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Busqueda;


