import { CircularProgress, Stack } from '@mui/material';

import ButtonForm from '@app/components/atoms/button';
import ProductCard from '@app/components/organisms/productCard';
import { useDevice } from '@app/hooks/useDevice';
import { getProductTypeCustom } from '@app/pages/admin/ecommerce/addNewProductPage/components/schemas';

type ProductCategoryListProps = {
  listProduct: getProductTypeCustom[];
  handleLoadMoreProduct: () => void;
  totalValue: number;
  isPending: boolean;
};

const ProductCategoryList = ({
  listProduct,
  handleLoadMoreProduct,
  totalValue,
  isPending
}: ProductCategoryListProps): JSX.Element => {
  const { isMobile } = useDevice();
  return (
    <Stack>
      <div className={`grid gap-4  ${isMobile ? 'sm:grid-cols-3 xs:grid-cols-2' : 'grid-cols-4'}`}>
        {listProduct.map((item, index) => (
          <ProductCard
            key={index}
            productId={item._id}
            productName={item.productName}
            productPrice={item.productPrice}
            productThumbImg={item.productThumbImg}
            description={item.description}
          />
        ))}
      </div>
      {isPending && <CircularProgress className='mx-auto' />}
      {listProduct.length < totalValue && (
        <ButtonForm
          variant='outlined'
          onClick={handleLoadMoreProduct}
          className='mt-4 max-w-[240px] mx-auto'
          disabled={isPending}>
          Tải thêm sản phẩm
        </ButtonForm>
      )}
    </Stack>
  );
};

export default ProductCategoryList;
