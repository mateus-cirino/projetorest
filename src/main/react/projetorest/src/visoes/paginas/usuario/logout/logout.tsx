import React, {Dispatch, FC, useEffect} from "react";
import {Usuario} from "../../../../modelos/usuario";
import {Redirect} from "react-router-dom"

export interface LogoutProps {
    setUsuario: Dispatch<Usuario>;
}

const Logout: FC<LogoutProps> = props => {
    const {setUsuario} = props;
    useEffect(() => {
        setUsuario(null);
    }, []);

    return <Redirect to='/login'/>
};

export default Logout;