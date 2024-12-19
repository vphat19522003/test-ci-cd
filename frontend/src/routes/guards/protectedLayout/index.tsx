import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

import MainLayout from '@app/layouts/mainLayout';
import { clearUser } from '@app/redux/authSlice';
import { paths } from '@app/routes/paths';
import { RootState } from '@app/store';
import { USER_ROLE } from '@app/types/user';
import { getTokenFromCache, removeTokenFromCache } from '@app/utils/persistCache/auth';

type allowRoles = USER_ROLE;

type ProtectedLayoutPropsType = {
  allowRoles: allowRoles[];
};

const ProtectedLayout = ({ allowRoles }: ProtectedLayoutPropsType): JSX.Element => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const { access_token, refresh_token } = getTokenFromCache();

  if (!user) return <Navigate to={paths.login} replace />;

  if (!refresh_token) {
    dispatch(clearUser());
    removeTokenFromCache();

    toast.error('Your session has expired. Please log in again.');

    return <Navigate to={paths.login} replace />;
  }

  if (!user.isVerified) return <Navigate to={paths.verifyAccount} replace />;

  if (!allowRoles.includes(user.role)) {
    return <Navigate to={paths.pageNotFound} replace />;
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default ProtectedLayout;
