import { useEffect } from 'react';

import { SwiperSlide } from 'swiper/react';

import { useGetAllLatestProduct } from '@app/api/hooks/product.hook';
import ProductCard from '@app/components/organisms/productCard';
import ProductSlider from '@app/components/organisms/productSlider';

const AllLatestProduct = (): JSX.Element => {
  const { data: AllLatestProducts = [] } = useGetAllLatestProduct(8);

  useEffect(() => {
    console.log({ AllLatestProducts });
  }, []);
  return (
    <>
      <ProductSlider>
        {AllLatestProducts.map((item, index) => (
          <SwiperSlide key={index}>
            <ProductCard
              productId={item._id}
              productName={item.productName}
              productPrice={item.productPrice}
              productThumbImg={item.productThumbImg}
              description={item.description}
            />
          </SwiperSlide>
        ))}
      </ProductSlider>
    </>
  );
};

export default AllLatestProduct;
