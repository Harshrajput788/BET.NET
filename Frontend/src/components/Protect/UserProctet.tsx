import React, { useEffect } from 'react'
import { useAppSelector } from '../../features/hook';
import { useNavigate } from 'react-router-dom';

interface AuthProtectionProps {
    children: React.ReactNode;
}

const Protect: React.FC<AuthProtectionProps> = ({ children }) => {

    const {  loading,token } = useAppSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;

    }, [ token, loading, navigate]);
    return (
        children
    )
}

export default Protect