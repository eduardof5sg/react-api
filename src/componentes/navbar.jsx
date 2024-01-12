import React from "react";

const Navbar = () => {
  // Ruta local de la imagen
  let imgUrl = process.env.PUBLIC_URL + "/logo32.png";

  return (
    <nav>
      <div>
        <img src={imgUrl} alt="Logo de PokeAPI" className="logo" />
      </div>
    </nav>
  );
};

export default Navbar;