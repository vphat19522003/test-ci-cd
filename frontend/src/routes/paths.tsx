import { Navigate } from 'react-router-dom';

import { AutoAwesome, Dashboard, FiberManualRecord, ShoppingCart } from '@mui/icons-material';

import EcommercePage from '@app/pages/admin/ecommerce';
import AddNewProductPage from '@app/pages/admin/ecommerce/addNewProductPage';
import CategoryPage from '@app/pages/admin/ecommerce/categoryPage';
import HomePage from '@app/pages/homePage';
import { RouteItemConfig } from '@app/types/route';
import {
  CartPage,
  ForgotPasswordPage,
  LoginPage,
  ProductCategoryPage,
  ProductDetailPage,
  PurchasedHistory,
  SignUpPage,
  UserAccount,
  UserAddress,
  UserFavorite,
  UserSecurity,
  UserSettingPage,
  UserShare
} from '@app/utils/lazyLoad';

export const paths = {
  index: '/',
  login: '/login',
  signUp: '/sign-up',
  verifyAccount: '/verify-account',
  forgotPassword: '/forgot-password',
  pageNotFound: '/page-not-found',
  homePage: '/home-page',
  user: {
    index: '/user',
    account: 'account',
    history: 'order_history',
    security: 'security',
    share: 'share',
    address: 'address',
    favorite: 'favorite'
  },
  admin: {
    dashboard: '/dashboard',
    ecommerce: {
      index: '/ecommerce',
      category: 'category',
      products: 'products',
      createProduct: 'create-product'
    }
  },
  product: {
    category: '/category/:maincategory',
    subCategory: '/category/:maincategory/:subcategory',
    detail: '/product'
  },
  cart: '/cart'
};

export const authenticationRoute: RouteItemConfig[] = [
  {
    element: <LoginPage />,
    path: paths.login
  },
  {
    element: <SignUpPage />,
    path: paths.signUp
  },
  {
    element: <ForgotPasswordPage />,
    path: paths.signUp
  }
];

export const visitorRoute: RouteItemConfig[] = [
  {
    element: <HomePage />,
    path: paths.index
  },
  {
    element: <ProductDetailPage />,
    path: paths.product.detail
  },
  {
    element: <Navigate to={'/category/all'} />,
    path: '/category'
  },
  {
    element: <ProductCategoryPage />,
    path: paths.product.category
  },
  {
    element: <ProductCategoryPage />,
    path: paths.product.subCategory
  }
];

export const shopRoute: RouteItemConfig[] = [
  {
    element: <UserSettingPage />,
    path: paths.user.index,
    child: [
      { element: <UserAccount />, path: paths.user.account },
      { element: <PurchasedHistory />, path: paths.user.history },
      { element: <UserSecurity />, path: paths.user.security },
      { element: <UserFavorite />, path: paths.user.favorite },
      { element: <UserAddress />, path: paths.user.address },
      { element: <UserShare />, path: paths.user.share }
    ]
  },
  {
    element: <ProductDetailPage />,
    path: paths.product.detail
  },
  {
    element: <Navigate to={'/category/all'} />,
    path: '/category'
  },
  {
    element: <ProductCategoryPage />,
    path: paths.product.category
  },
  {
    element: <CartPage />,
    path: paths.cart
  }
];

export const adminRoute: RouteItemConfig[] = [
  {
    element: 'Dashboard',
    path: paths.admin.dashboard,
    sidebarProps: {
      displayText: 'Dashboard',
      icon: <Dashboard />
    }
  },
  {
    path: paths.admin.ecommerce.index,
    element: <Navigate to={'/ecommerce/category'} />
  },
  {
    element: <EcommercePage />,
    path: paths.admin.ecommerce.index,
    sidebarProps: {
      displayText: 'Ecommerce',
      icon: <ShoppingCart />
    },
    child: [
      {
        element: <CategoryPage />,
        path: '/ecommerce/category',
        sidebarProps: {
          displayText: 'Category',
          icon: <FiberManualRecord className='text-[8px]' />
        }
      },
      {
        element: 'Product List',
        path: '/ecommerce/product-list',
        sidebarProps: {
          displayText: 'Product List',
          icon: <FiberManualRecord className='text-[8px]' />
        }
      },
      {
        element: <AddNewProductPage />,
        path: '/ecommerce/add-new-product',
        sidebarProps: {
          displayText: 'Add New Product',
          icon: <FiberManualRecord className='text-[8px]' />
        }
      }
    ]
  },

  {
    element: 'Test',
    path: '/test',
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: '/test',
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: '/test',
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: '/test',
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: '/test',
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: '/test',
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: '/test',
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: '/test',
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: '/test',
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: '/test',
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: '/test',
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: '/test',
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: '/test',
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  },
  {
    element: 'Test',
    path: '/test',
    sidebarProps: {
      displayText: 'Test',
      icon: <AutoAwesome />
    }
  }
];
