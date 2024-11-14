import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store'; // Adjust the path based on your store file location

interface AuthState {
  userInfo: {
    name: string;
    email: string;
    // Add any other properties your `userInfo` object contains
  } | null;
}

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userInfo } = useSelector((state: RootState) => state.auth as AuthState);

  return userInfo ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
