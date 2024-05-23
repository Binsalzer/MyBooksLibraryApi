import { Navigate } from 'react-router-dom';
import { useAuthentication } from './AuthenticationContext'

const PrivateRoute = ({ children }) => {
    const { user } = useAuthentication();

    return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute