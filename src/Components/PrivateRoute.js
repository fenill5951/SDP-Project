import React,{useContext} from 'react';
import { Route,Navigate} from 'react-router-dom';
import {useNavigate,Routes} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

function PrivateRoute({children}) {
    const {user} = useContext(AuthContext) 
    // const history=useNavigate();
    return (
        user ? children : <Navigate to="/login" />
    )
}

export default PrivateRoute