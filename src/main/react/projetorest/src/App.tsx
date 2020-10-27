import React, {useState} from 'react';
import Login from "./visoes/paginas/usuario/login/Login";
import {Usuario} from "./modelos/usuario";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import UsuarioPesquisa from "./visoes/paginas/usuario/usuario/UsuarioPesquisa";
import UsuarioFormulario from "./visoes/paginas/usuario/usuario/UsuarioFormulario";

function App() {
  const [usuario, setUsuario] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
    return (
        <BrowserRouter>
          <Switch>
            <Route path="/" exact={true} component={() => <Login setUsuario={setUsuario} />}/>
            <Route path="/usuario/buscartodos" component={() => <UsuarioPesquisa setSelectedItem={setSelectedItem} />} />
            <Route path="/usuario/persistir" component={() => <UsuarioFormulario usuarioLogado={usuario} selectedItem={selectedItem} />} />
          </Switch>
        </BrowserRouter>
  );
}

export default App;
