import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;