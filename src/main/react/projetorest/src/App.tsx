import React, {useState} from 'react';
import Login from "./visoes/paginas/usuario/login/Login";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import UsuarioPesquisa from "./visoes/paginas/usuario/usuario/UsuarioPesquisa";
import UsuarioFormulario from "./visoes/paginas/usuario/usuario/UsuarioFormulario";
import EnderecoPesquisa from "./visoes/paginas/endereco/EnderecoPesquisa";
import EnderecoFormulario from "./visoes/paginas/endereco/EnderecoFormulario";
import Menu from "./visoes/componentes/menu/Menu";
import {ToastProvider} from "react-toast-notifications";
import Logout from "./visoes/paginas/usuario/logout/logout";
import EventoPesquisa from "./visoes/paginas/evento/EventoPesquisa";
import EventoFormulario from "./visoes/paginas/evento/EventoFormulario";
import RealizarBackup from "./visoes/paginas/sistema/RealizarBackup";
import RestaurarBackup from "./visoes/paginas/sistema/RestaurarBackup";
import RelacaoEventoPessoa from "./visoes/paginas/evento/RelacaoEventoPessoa";
import PessoaPesquisa from "./visoes/paginas/pessoa/PessoaPesquisa";
import PessoaFormulario from "./visoes/paginas/pessoa/PessoaFormulario";
import PresencaEventoPessoa from "./visoes/paginas/evento/PresencaEventoPessoa";
import EventoPessoaPesquisa from "./visoes/paginas/evento/EventoPessoaPesquisa";
import PainelInformacoesEvento from "./visoes/paginas/evento/PainelInformacoesEvento";
import RelatorioParticipacao from "./visoes/paginas/evento/relatorios/RelatorioParticipacao";

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
    return (
        <>
            <ToastProvider>
            <BrowserRouter>
                <Menu usuarioLogado={usuarioLogado} setUsuario={setUsuarioLogado} />
                <Switch >
                <Route path="/" exact={true} strict={true} component={() => <Login setUsuario={setUsuarioLogado} />}/>
                <Route path="/logout" exact={true} strict={true} component={() => <Logout setUsuario={setUsuarioLogado} />}/>
                <Route path="/usuario/buscartodos" strict={true} component={() => <UsuarioPesquisa usuarioLogado={usuarioLogado} setSelectedItem={setSelectedItem} />} />
                <Route path="/usuario/persistir" strict={true} component={() => <UsuarioFormulario usuarioLogado={usuarioLogado} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />} />
                <Route path="/endereco/buscartodos" strict={true} component={() => <EnderecoPesquisa usuarioLogado={usuarioLogado} setSelectedItem={setSelectedItem} />} />
                <Route path="/endereco/persistir" strict={true} component={() => <EnderecoFormulario usuarioLogado={usuarioLogado} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />} />
                <Route path="/pessoa/buscartodos" strict={true} component={() => <PessoaPesquisa usuarioLogado={usuarioLogado} setSelectedItem={setSelectedItem} />} />
                <Route path="/pessoa/persistir" strict={true} component={() => <PessoaFormulario usuarioLogado={usuarioLogado} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />} />
                <Route path="/evento/buscartodos" strict={true} component={() => <EventoPesquisa usuarioLogado={usuarioLogado} setSelectedItem={setSelectedItem} />} />
                <Route path="/evento/persistir" strict={true} component={() => <EventoFormulario usuarioLogado={usuarioLogado} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />} />
                <Route path="/evento/adicionareventopessoa" strict={true} component={RelacaoEventoPessoa} />
                <Route path="/evento/adicionarpresencaevento" strict={true} component={PresencaEventoPessoa} />
                <Route path="/evento/inscricoesevento" strict={true} component={() => <EventoPessoaPesquisa usuarioLogado={usuarioLogado} setSelectedItem={setSelectedItem} />} />
                <Route path="/evento/painelinformacoes" strict={true} component={PainelInformacoesEvento} />
                <Route path="/evento/relatorioparticipacao" strict={true} component={RelatorioParticipacao} />
                <Route path="/sistema/realizarbackup" strict={true} component={() => <RealizarBackup usuarioLogado={usuarioLogado} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />} />
                <Route path="/sistema/restaurarbackup" strict={true} component={() => <RestaurarBackup usuarioLogado={usuarioLogado} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />} />
                </Switch>
            </BrowserRouter>
            </ToastProvider>
        </>

  );
}

export default App;
