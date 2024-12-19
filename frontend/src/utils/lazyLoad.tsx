import withDynamicImport from '@app/hooks/withDynamicImport';

export const LoginPage = withDynamicImport(() => import('@app/pages/login'), {
  loading: true
});

export const SignUpPage = withDynamicImport(() => import('@app/pages/signUp'), {
  loading: true
});

export const ForgotPasswordPage = withDynamicImport(() => import('@app/pages/forgotPassword'), {
  loading: true
});

export const UserSettingPage = withDynamicImport(() => import('@app/pages/userSetting'), {
  loading: true
});

export const UserAccount = withDynamicImport(() => import('@app/pages/userSetting/userAccount'), {
  loading: true
});

export const PurchasedHistory = withDynamicImport(() => import('@app/pages/userSetting/purchasedHistory'), {
  loading: true
});

export const UserSecurity = withDynamicImport(() => import('@app/pages/userSetting/userSecurity'), {
  loading: true
});

export const UserFavorite = withDynamicImport(() => import('@app/pages/userSetting/userFavorite'), {
  loading: true
});

export const UserAddress = withDynamicImport(() => import('@app/pages/userSetting/userAddress'), {
  loading: true
});

export const UserShare = withDynamicImport(() => import('@app/pages/userSetting/userShare'), {
  loading: true
});

export const ProductDetailPage = withDynamicImport(() => import('@app/pages/productDetail'), {
  loading: true
});

export const ProductCategoryPage = withDynamicImport(() => import('@app/pages/productCategory'), {
  loading: true
});

export const CartPage = withDynamicImport(() => import('@app/pages/cart'), {
  loading: true
});
