import React from "react";
import {FC} from "react";
import {Nav, NavItem, NavLink} from "reactstrap";
import {Link} from "react-router-dom";

const Menu: FC = () => {
    return (
        <div className="d-flex justify-content-center m-2">
            <Nav>
                <NavItem>
                    <Link to="/usuario/buscartodos">
                        <NavLink>Usuários</NavLink>
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to="/clientes/buscartodos">
                        <NavLink>Clientes</NavLink>
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to="/eventos/buscartodos">
                        <NavLink>Eventos</NavLink>
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to="/enderecos/buscartodos">
                        <NavLink>Endereços</NavLink>
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