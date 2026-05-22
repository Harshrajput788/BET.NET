import React, { useEffect } from 'react'
import { useAppSelector } from '../../features/hook';
import { useNavigate } from 'react-router-dom';

interface AuthProtectionProps {
  children: React.ReactNode;
}

const AuthProtection: React.FC<AuthProtectionProps> = ({ children }) => {

  const {token,loading} = useAppSelector(state => state.auth);

  const navigate = useNavigate();

  useEffect(() =>{
    if(loading) return;

    if(token){
      navigate("/");
    }
  },[token])

  return (
    children
  )
}

export default AuthProtection