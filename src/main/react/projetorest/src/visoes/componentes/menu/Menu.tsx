import React, {Dispatch} from "react";
import {FC} from "react";
import {DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, UncontrolledDropdown} from "reactstrap";
import {Link} from "react-router-dom";
import {Usuario} from "../../../modelos/usuario";

interface MenuProps {
    usuarioLogado?: Usuario;
    setUsuario: Dispatch<Usuario>;
}

const Menu: FC<MenuProps> = props => {
    const {usuarioLogado} = props;
    return (
        <div className="d-flex justify-content-center m-2">
            <Nav>
                <NavItem>
                    <Link to="/usuario/buscartodos">
                        <NavLink disabled={usuarioLogado === null}>Usuários</NavLink>
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to="/pessoa/buscartodos">
                        <NavLink disabled={usuarioLogado === null}>Pessoas</NavLink>
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to="/endereco/buscartodos">
                        <NavLink disabled={usuarioLogado === null}>Endereços</NavLink>
                    </Link>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        Eventos
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>
                            <NavItem>
                                <Link to="/evento/buscartodos">
                                    <NavLink disabled={usuarioLogado === null}>Eventos</NavLink>
                                </Link>
                            </NavItem>
                        </DropdownItem>
                        <DropdownItem>
                            <NavItem>
                                <Link to="/evento/adicionareventopessoa">
                                    <NavLink disabled={usuarioLogado === null}>Relação entre pessoas e eventos</NavLink>
                                </Link>
                            </NavItem>
                        </DropdownItem>
                        <DropdownItem>
                            <NavItem>
                                <Link to="/evento/adicionarpresencaevento">
                                    <NavLink>Marcar presenca no evento</NavLink>
                                </Link>
                            </NavItem>
                        </DropdownItem>
                        <DropdownItem>
                            <NavItem>
                                <Link to="/evento/inscricoesevento">
                                    <NavLink>Inscrições nos eventos</NavLink>
                                </Link>
                            </NavItem>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                    <Link to="/sistema/realizarbackup">
                        <NavLink disabled={usuarioLogado === null}>Realizar backup</NavLink>
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to="/sistema/restaurarbackup">
                        <NavLink disabled={usuarioLogado === null}>Restaurar backup</NavLink>
                    </Link>
                </NavItem>
                <NavItem hidden={usuarioLogado === null}>
                    <Link to="/">
                        <NavLink>Logout</NavLink>
                    </Link>
                </NavItem>
            </Nav>
        </div>
    );
};

export default Menu;