// import React, { useEffect, useState } from 'react';
// import '../componentes/navbar'
// import '../styles/poke.css';
// import Navbar from '../componentes/navbar';

// function PokemonList() {
//   const [pokemonData, setPokemonData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage * 25}&offset=0`);
//         if (!response.ok) {
//           throw new Error('Network response was not ok.');
//         }
//         const data = await response.json();
//         const pokemonList = data.results;
//         console.log(data)

//         const pokemonWithImages = await Promise.all(
//           pokemonList.map(async (pokemon) => {
//             const pokemonResponse = await fetch(pokemon.url);
//             if (!pokemonResponse.ok) {
//               throw new Error('Network response for Pokemon details was not ok.');
//             }
//             const pokemonDetails = await pokemonResponse.json();
//             return {
//               name: pokemon.name,
//               image: pokemonDetails.sprites.front_default,
//             };
//           })
//         );

//         setPokemonData(pokemonWithImages);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }

//     fetchData();
//   }, [itemsPerPage]);

//   const totalPages = Math.ceil(pokemonData.length / itemsPerPage);

//   const handleNextPage = () => {
//     setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
//   };

//   const handlePrevPage = () => {
//     setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
//   };

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = Math.min(startIndex + itemsPerPage, pokemonData.length);
//   const currentPokemonData = pokemonData.slice(startIndex, endIndex);

//   return (
//     <>
//       <div>
//         <Navbar />
//       </div>
//       <div>
//         <h1>Pokémon List</h1>
//         <div className="pagination">
//           <button onClick={handlePrevPage} disabled={currentPage === 1}>
//             Prev
//           </button>
//           <span>{`Page ${currentPage} of ${totalPages}`}</span>
//           <button onClick={handleNextPage} disabled={currentPage === totalPages}>
//             Next
//           </button>
//         </div>
//         <div className="pokemon-container">
//           {currentPokemonData.map((pokemon, index) => (
//             <div key={index} className="pokemon-item">
//               <p>{pokemon.name}</p>
//               <img src={pokemon.image} alt={pokemon.name} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
  
// }

// export default PokemonList;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Busqueda from "./busqueda";
import Navbar from "./navbar";
import "../styles/liga.css"

function Liga() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const teamsPerPage = 3;

  useEffect(() => {
    fetch('https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?s=Soccer&c=Spain')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data.teams);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Calcula los índices de los equipos para la página actual
  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = data?.slice(indexOfFirstTeam, indexOfLastTeam);

  const renderTeams = () => {
    return currentTeams?.map((team) => (
      <li key={team.idTeam}>
        <Link to={`/equipos/${team.idTeam}`}>
          <img src={team.strTeamBadge} alt={`Escudo del equipo ${team.strTeam}`} />
        </Link>
        {team.strTeam}
      </li>
    ));
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <div className="navbar"><Navbar />
      </div>
      
      <div className="busqueda">
        <Busqueda equipos={data} />
      </div>

      <div className="equipo">
        <ul>
          {renderTeams()}
        </ul>
        <div className="boton">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
          <span>Página {currentPage}</span>
          <button onClick={handleNextPage} disabled={currentTeams && currentTeams.length < teamsPerPage}>Siguiente</button>
        </div>
      </div>
    </div>
  );
}

export default Liga;



