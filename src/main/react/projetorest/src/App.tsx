import React, {useState} from 'react';
import Login from "./visoes/paginas/usuario/login/Login";
import {Usuario} from "./modelos/usuario";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import UsuarioPesquisa from "./visoes/paginas/usuario/usuario/UsuarioPesquisa";

function App() {
  const [usuario, setUsuario] = useState<Usuario>();
    return (
        <BrowserRouter>
          <Switch>
            <Route path="/" exact={true} component={() => <Login setUsuario={setUsuario} />}/>
            <Route path="/usuario/buscartodos" component={UsuarioPesquisa} />
          </Switch>
        </BrowserRouter>
  );
}

export default App;
