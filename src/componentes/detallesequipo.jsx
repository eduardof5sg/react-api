import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./navbar";
import "../styles/detallesequipo.css"

const DetallesEquipo = () => {
  const { id } = useParams();
  const [equipo, setEquipo] = useState(null);

  useEffect(() => {
    const obtenerDetallesEquipo = async () => {
      try {
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?s=Soccer&c=Spain`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();

        // Buscar el equipo específico por id en el array de equipos
        const equipoEncontrado = data.teams.find((team) => team.idTeam === id);

        if (equipoEncontrado) {
          // Establecer el equipo encontrado en el estado
          setEquipo(equipoEncontrado);
        } else {
          console.error("No se encontraron detalles del equipo");
        }
      } catch (error) {
        console.error("Error al obtener detalles del equipo:", error.message);
      }
    };

    obtenerDetallesEquipo();
  }, [id]);

  return (
    <div className="general">
      <div className="navbar"><Navbar />
      </div>
      <h2>Detalles del Equipo</h2>
      {equipo ? (
        <div className="equipo">
          <h3>{equipo.strTeam}</h3>
          <img src={equipo.strTeamBadge} alt={`Escudo del equipo ${equipo.strTeam}`} />
          {equipo.strDescriptionEN && (
            <p>{equipo.strDescriptionEN}</p>
          )}
          {/* Mostrar otros detalles del equipo según la API */}
        </div>
      ) : (
        <p>Cargando detalles del equipo...</p>
      )}
    </div>
  );
};

export default DetallesEquipo;

