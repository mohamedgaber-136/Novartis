import React, { useContext } from 'react'
import {Navigate} from 'react-router-dom'
import { FireBaseContext } from '../../Context/FireBase'
export const Protected = ({children}) => {
    const {currentUsr}=useContext(FireBaseContext)
if(!currentUsr){
    return <Navigate to='/' replace/>
}else{
    return children
}
}
