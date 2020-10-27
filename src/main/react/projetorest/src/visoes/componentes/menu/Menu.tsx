import React from "react";
import {FC} from "react";
import {Nav, NavItem, NavLink} from "reactstrap";
import {Link} from "react-router-dom";
import {Usuario} from "../../../modelos/usuario";

interface MenuProps {
    usuarioLogado?: Usuario;
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
                    <Link to="/cliente/buscartodos">
                        <NavLink disabled={usuarioLogado === null}>Clientes</NavLink>
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to="/evento/buscartodos">
                        <NavLink disabled={usuarioLogado === null}>Eventos</NavLink>
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to="/endereco/buscartodos">
                        <NavLink disabled={usuarioLogado === null}>Endereços</NavLink>
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to="/">
                        <NavLink>Login</NavLink>
                    </Link>
                </NavItem>
            </Nav>
        </div>
    );
};

export default Menu;