import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import AuthLayout from '@app/layouts/authLayout';
import { paths } from '@app/routes/paths';
import { RootState } from '@app/store';

const AuthenticateLayout = (): JSX.Element => {
  const userAuthenticated = useSelector((state: RootState) => state.auth.user);

  if (userAuthenticated && userAuthenticated.isVerified) {
    if (userAuthenticated.role === 'User') return <Navigate to={paths.index} replace />;

    return <Navigate to={paths.admin.dashboard} replace />;
  }

  if (userAuthenticated) {
    return <Navigate to={paths.verifyAccount} replace />;
  }

  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};

export default AuthenticateLayout;
