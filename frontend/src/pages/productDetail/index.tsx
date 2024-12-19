import { useSearchParams } from 'react-router-dom';

import { Stack } from '@mui/material';

import { useGetDetailProduct } from '@app/api/hooks/product.hook';
import BreadCrumb from '@app/components/organisms/breadcrumb';
import { useDevice } from '@app/hooks/useDevice';

import { getProductDetailCustom } from '../admin/ecommerce/addNewProductPage/components/schemas';
import ProductAction from './components/ProductAction';
import ProductComment from './components/ProductComment';
import ProductDescription from './components/ProductDescription';
import ProductImage from './components/ProductImage';

const ProductDetailPage = (): JSX.Element => {
  const [searchParams] = useSearchParams();

  const productId = searchParams.get('productId');

  const { data: productDetail, isPending } = useGetDetailProduct(productId as string);

  const { isMobile } = useDevice();

  return (
    <Stack>
      <BreadCrumb
        productName={productDetail?.productName}
        mainCategory={productDetail?.category.name as string}
        subCategories={[]}
        isCategory
      />
      <Stack direction={isMobile ? 'column' : 'row'} spacing={4} className='mb-4 max-h-max'>
        {/* 2 section : {Product Image, Product description} {Product comment} */}
        <Stack direction={'column'} spacing={4} className={`${isMobile ? 'w-full' : 'w-9/12'}`}>
          {/* Product Image & Description */}
          <Stack direction={isMobile ? 'column' : 'row'} spacing={4} className='max-h-max min-h-[100px] '>
            {/* Product Image Section */}
            <Stack
              className={`${isMobile ? 'w-full' : 'w-2/5'} bg-white rounded-lg max-h-max`}
              style={{
                position: isMobile ? 'unset' : 'sticky',
                top: isMobile ? '0px' : '16px',
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
              }}>
              <ProductImage productDetail={productDetail as getProductDetailCustom} />
            </Stack>
            {/* Product Description Section */}
            <Stack className={`${isMobile ? 'w-full' : 'w-3/5'} max-h-max`}>
              <ProductDescription productDetail={productDetail as getProductDetailCustom} />
            </Stack>
          </Stack>
          {/* Product comment */}
          <Stack
            className='w-full bg-white rounded-lg'
            style={{
              boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
            }}>
            <ProductComment productDetail={productDetail} />
          </Stack>
        </Stack>
        {/* Product detail action : add to cart, buy now */}
        {!isMobile && (
          <Stack
            direction={isMobile ? 'column' : 'row'}
            className={`${isMobile ? 'w-full' : 'w-3/12'} bg-white rounded-lg max-h-[300px]`}
            style={{
              position: isMobile ? 'unset' : 'sticky',
              top: isMobile ? '0px' : '16px',
              boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
            }}>
            <ProductAction productId={productDetail?._id as string} />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default ProductDetailPage;
