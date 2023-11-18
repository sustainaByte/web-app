import React from "react";
import {Navigate} from "react-router-dom";
import {useAuth} from "./login";

export const ProtectedLayout = (Content: any) => {
    // @ts-ignore
    const {logout, authKey} = useAuth()

    if (!authKey) {
        return <Navigate to={"/"}/>
    }

    return <Content />
}