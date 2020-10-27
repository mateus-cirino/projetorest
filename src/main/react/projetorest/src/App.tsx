import React, {useState} from 'react';
import Login from "./visoes/paginas/usuario/login/Login";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import UsuarioPesquisa from "./visoes/paginas/usuario/usuario/UsuarioPesquisa";
import UsuarioFormulario from "./visoes/paginas/usuario/usuario/UsuarioFormulario";
import EnderecoPesquisa from "./visoes/paginas/endereco/EnderecoPesquisa";
import EnderecoFormulario from "./visoes/paginas/endereco/EnderecoFormulario";
import Menu from "./visoes/componentes/menu/Menu";
import ClientePesquisa from "./visoes/paginas/cliente/ClientePesquisa";
import ClienteFormulario from "./visoes/paginas/cliente/ClienteFormulario";

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
    return (
        <>
            <BrowserRouter>
                <Menu usuarioLogado={usuarioLogado} />
                <Switch>
                <Route path="/" exact={true} component={() => <Login setUsuario={setUsuarioLogado} />}/>
                <Route path="/usuario/buscartodos" component={() => <UsuarioPesquisa setSelectedItem={setSelectedItem} />} />
                <Route path="/usuario/persistir" component={() => <UsuarioFormulario usuarioLogado={usuarioLogado} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />} />
                <Route path="/endereco/buscartodos" component={() => <EnderecoPesquisa setSelectedItem={setSelectedItem} />} />
                <Route path="/endereco/persistir" component={() => <EnderecoFormulario usuarioLogado={usuarioLogado} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />} />
                <Route path="/cliente/buscartodos" component={() => <ClientePesquisa setSelectedItem={setSelectedItem} />} />
                <Route path="/cliente/persistir" component={() => <ClienteFormulario usuarioLogado={usuarioLogado} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />} />
                </Switch>
            </BrowserRouter>
        </>

  );
}

export default App;
