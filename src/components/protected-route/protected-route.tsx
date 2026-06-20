import { ROUTES } from '@/constants/ROUTES';
import { useAppSelector } from '@/services/store';
import { selectIsAuthChecked, selectUser } from '@/services/user/user-slice';
import { Navigate, useLocation, type Location } from 'react-router-dom';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
};

export const ProtectedRoute: React.FC<TProtectedRouteProps> = ({
  onlyUnAuth = false,
  children,
}) => {
  const isAuthChecked = useAppSelector(selectIsAuthChecked);
  const user = useAppSelector(selectUser);
  const location = useLocation() as Location<{ from: Location }>;

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state ?? { from: { pathname: ROUTES.HOME } };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
