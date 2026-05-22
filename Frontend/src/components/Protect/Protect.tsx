import React, { useEffect } from 'react'
import { useAppSelector } from '../../features/hook';
import { useNavigate } from 'react-router-dom';

interface AuthProtectionProps {
    children: React.ReactNode;
}

const Protect: React.FC<AuthProtectionProps> = ({ children }) => {

    const { user, loading,token } = useAppSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;

        if(!token) {
            navigate("/signin", { replace: true });
            return;
        }

        if (!user) {
            navigate("/signin", { replace: true });
            return;
        }

        if (!user.verified) {
            navigate("/verify-email", { replace: true });
            return;
        }

        navigate("/", { replace: true });
    }, [user, token, loading, navigate]);
    return (
        children
    )
}

export default Protect