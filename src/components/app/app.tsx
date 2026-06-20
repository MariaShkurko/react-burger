import { ROUTES } from '@/constants/ROUTES';
import {
  FeedPage,
  ForgotPasswordPage,
  Home,
  Ingredient,
  IngredientModal,
  LoginPage,
  NotFoundPage,
  Profile,
  ProfileOrderPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
} from '@/pages';
import { useAppDispatch } from '@/services/store';
import { checkUserAuth } from '@/services/user/actions';
import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, type Location } from 'react-router-dom';

import { ProtectedRoute } from '../protected-route/protected-route';

type TAppState = {
  backgroundLocation: Location;
};

export const App = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const location = useLocation() as Location<TAppState>;
  const backgroundLocation = location.state?.backgroundLocation;

  useEffect(() => {
    void dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route
          path={ROUTES.REGISTER}
          element={
            <ProtectedRoute onlyUnAuth>
              <RegisterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.LOGIN}
          element={
            <ProtectedRoute onlyUnAuth>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.FORGOT_PASSWORD}
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPasswordPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.RESET_PASSWORD}
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPasswordPage />
            </ProtectedRoute>
          }
        />

        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />

        <Route
          path={ROUTES.PROFILE}
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        >
          <Route index element={<Profile />} />
          <Route path={ROUTES.ORDERS} element={<ProfileOrderPage />} />
        </Route>
        <Route path={ROUTES.FEED} element={<FeedPage />} />

        <Route path={`${ROUTES.INGREDIENTS}/:id`} element={<Ingredient />} />
        <Route path={ROUTES.HOME} element={<Home />} />

        <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path={`${ROUTES.INGREDIENTS}/:id`} element={<IngredientModal />} />
        </Routes>
      )}
    </>
  );
};

export default App;
