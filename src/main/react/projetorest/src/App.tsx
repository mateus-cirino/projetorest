import React, {useEffect, useState} from 'react';
import Login from "./visoes/paginas/usuario/login/Login";
import {Usuario} from "./modelos/usuario";

function App() {
  const [usuario, setUsuario] = useState<Usuario>();
  useEffect(() => console.log(usuario), [usuario]);
    return (
      <Login setUsuario={setUsuario} />
  );
}

export default App;
