import React from 'react';
import { Navigate } from "react-router-dom"; 

export default function ProtectedRouteSign ({ component: Component, ...props  }) {
    return (
        props.loggedIn ? <Navigate to="/movies"/> : <Component {...props} />
    )
}

