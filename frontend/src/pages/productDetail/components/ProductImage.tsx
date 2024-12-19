import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Box, Divider, Stack } from '@mui/material';

import { getProductDetailCustom } from '@app/pages/admin/ecommerce/addNewProductPage/components/schemas';
import { showImageViewer } from '@app/redux/uiSlice';

type ProductImageProps = {
  productDetail: getProductDetailCustom;
};
const ProductImage = ({ productDetail }: ProductImageProps): JSX.Element => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [fade, setFade] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleImageChange = (imageUrl: string) => {
    setFade(true);
    setTimeout(() => {
      setSelectedImage(imageUrl);
      setFade(false);
    }, 200);
  };

  useEffect(() => {
    setSelectedImage(productDetail?.productThumbImg.url);
  }, [productDetail]);

  const imageArrTemp = [
    productDetail?.productThumbImg?.url,
    ...(productDetail?.productDescImg.map((image) => image.url) || [])
  ];

  const handleImageClick = (index: number) => {
    dispatch(
      showImageViewer({
        index,
        images: imageArrTemp
      })
    );
  };
  return (
    <>
      <Stack direction={'column'} className='max-h-max'>
        <Stack className='px-4 py-2'>
          {/* Main Image */}
          <Stack
            className='h-[368px] border-[0.2px] border-solid border-slate-200 rounded-lg'
            onClick={() => handleImageClick(imageArrTemp.findIndex((item) => item === selectedImage))}>
            <img
              src={selectedImage}
              alt={productDetail?.productName}
              className={`w-full h-full object-contain transition-opacity duration-200 ${fade ? 'opacity-0' : 'opacity-100'}`}
            />
          </Stack>
          {/* List Image */}
          <Stack direction={'row'} spacing={2} className='pt-2'>
            <Box
              className={`cursor-pointer size-16 border-[0.2px] border-solid border-slate-200 rounded-lg overflow-hidden ${selectedImage === productDetail?.productThumbImg.url ? 'border-blue-700 border-[1.4px]' : ' border-[0.2px]  border-slate-200'}`}
              onClick={() => handleImageChange(productDetail?.productThumbImg.url)}>
              <img
                src={productDetail?.productThumbImg.url}
                alt={productDetail?.productName}
                className='w-full h-full object-contain'
              />
            </Box>
            {productDetail?.productDescImg.length > 0 &&
              productDetail.productDescImg.map((productDescImage, index) => (
                <Box
                  className={`cursor-pointer size-16 border-solid rounded-lg overflow-hidden ${selectedImage === productDescImage.url ? 'border-blue-700 border-[1.4px]' : ' border-[0.2px]  border-slate-200'}`}
                  key={index}
                  onClick={() => handleImageChange(productDescImage.url)}>
                  <img
                    src={productDescImage.url}
                    alt={productDetail?.productName}
                    className='w-full h-full object-contain'
                  />
                </Box>
              ))}
          </Stack>
        </Stack>
        <Divider />
        {/* Some Action */}
        <Stack>
          <p className='px-4'>Xem tóm tắt</p>
        </Stack>
      </Stack>
    </>
  );
};

export default ProductImage;
