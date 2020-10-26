import React, {useEffect, useState} from 'react';
import Login from "./visoes/paginas/usuario/login/Login";
import {Usuario} from "./modelos/usuario";
import {BrowserRouter, Switch, Route} from "react-router-dom";

function App() {
  const [usuario, setUsuario] = useState<Usuario>();
  useEffect(() => console.log(usuario), [usuario]);
    return (
        <BrowserRouter>
          <Switch>
            <Route path="/" component={() => <Login setUsuario={setUsuario} />}/>
          </Switch>
        </BrowserRouter>
  );
}

export default App;
