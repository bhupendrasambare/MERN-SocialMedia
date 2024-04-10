import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Authenticate = ({children}) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user )
    useEffect(()=>{
        if(user==null || user == undefined){
            navigate("/")
        }
    },[])
  return (
    <>{children}</>
  )
}

export default Authenticate