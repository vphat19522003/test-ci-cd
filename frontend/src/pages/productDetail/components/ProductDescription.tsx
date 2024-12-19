import { useState } from 'react';

import { Box, Divider, Rating, Stack, Typography } from '@mui/material';

import Address from '@app/assets/address.png';
import ButtonForm from '@app/components/atoms/button';
import { useDevice } from '@app/hooks/useDevice';
import { getProductDetailCustom } from '@app/pages/admin/ecommerce/addNewProductPage/components/schemas';

import ProductAction from './ProductAction';

type ProductDescriptionProps = {
  productDetail: getProductDetailCustom;
};

const MAX_DESCRIPTION_LENGTH = 1000;

type DetailInfoItem = {
  label: string;
  value: string;
};

const details: DetailInfoItem[] = [
  { label: 'Phiên bản sách', value: 'Phiên bản thường' },
  { label: 'Công ty phát hành', value: 'Nhã Nam' },
  { label: 'Ngày xuất bản', value: '2021-06-01' },
  { label: 'Kích thước', value: '15 x 24 cm' },
  { label: 'Dịch Giả', value: 'Diệu Thư' },
  { label: 'Loại bìa', value: 'Bìa mềm' },
  { label: 'Số trang', value: '628' },
  { label: 'Nhà xuất bản', value: 'Nhà Xuất Bản Hội Nhà Văn' }
];

const ProductDescription = ({ productDetail }: ProductDescriptionProps): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isMobile } = useDevice();

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Stack spacing={4}>
      {/* General Information */}
      <Stack
        className='bg-white rounded-lg p-4'
        style={{
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
        }}
        spacing={4}>
        <Typography className='text-2xl font-semibold'>{productDetail?.productName}</Typography>
        {/* Product Rate */}
        <Stack direction={'row'} spacing={2} alignItems={'center'}>
          <Typography className='font-semibold'>{productDetail?.productVoteRate}</Typography>
          <Rating
            name='rating-read'
            value={Number(productDetail?.productVoteRate)}
            precision={1}
            size='small'
            readOnly
          />
          {/* Comment Quantity - Saled Quantity*/}
          <Stack direction={'row'} spacing={2} alignItems={'center'}>
            <Typography className='text-slate-400'>({productDetail?.totalComment})</Typography>
            <Typography className='text-slate-400 text-md'>| Saled 200</Typography>
          </Stack>
        </Stack>
        {/* Price */}
        <Stack direction='row' alignItems={'center'} spacing={1}>
          <Typography className='text-3xl font-semibold text-pink-500 !mb-0'>$100.000</Typography>
          <Typography className='text-sm line-through text-slate-500'>$399.00</Typography>
        </Stack>

        {/* In Stock */}
        <Typography className='text-slate-400 text-md mt-2'>Product in stock: 300</Typography>
      </Stack>

      {/* Mobile Product Action */}
      {isMobile && (
        <Stack
          direction={isMobile ? 'column' : 'row'}
          className={`${isMobile ? 'w-full' : 'w-3/12'} bg-white rounded-lg max-h-[300px]`}
          style={{
            position: isMobile ? 'unset' : 'sticky',
            top: isMobile ? '0px' : '16px',
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
          }}>
          <ProductAction productId={productDetail?._id} />
        </Stack>
      )}

      {/* Shipping Information */}
      <Stack
        className='bg-white rounded-lg p-4'
        style={{
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
        }}>
        <Typography className='font-extrabold'>Shipping Information</Typography>
        <Stack direction={'row'} className='mt-3'>
          <Box className='w-2/12'>
            <img src={Address} alt='' className='w-full h-full object-contain' />
          </Box>
          <Stack className='w-10/12'>
            <Typography className='text-md text-justify'>
              Bạn hãy nhập địa chỉ nhận hàng để được dự báo thời gian & chi phí giao hàng chính xác nhất.
            </Typography>
            <ButtonForm variant='outlined' className='mt-2 w-28'>
              Add address
            </ButtonForm>
          </Stack>
        </Stack>
      </Stack>
      {/* Detail Information */}
      <Stack
        className='bg-white rounded-lg p-4 max-h-max'
        style={{
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
        }}>
        <Typography className='font-extrabold mb-3'>Detail Information</Typography>

        <Stack>
          {details.map((item, index) => (
            <Stack key={index}>
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '10px',
                  paddingBottom: '10px'
                }}>
                <Typography className='text-slate-500 text-md'>{item.label}</Typography>
                <Typography className='text-md'>{item.value}</Typography>
              </Box>
              {index !== details.length - 1 && <Divider />}
            </Stack>
          ))}
        </Stack>
      </Stack>
      {/* Description */}
      <Stack
        className='bg-white rounded-lg p-4'
        style={{
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
        }}>
        <Typography className='font-extrabold mb-3'>Description</Typography>
        <Typography className='text-justify text-md'>
          {isExpanded || !productDetail?.description
            ? productDetail?.description
            : `${productDetail?.description.slice(0, MAX_DESCRIPTION_LENGTH)}...`}
        </Typography>
        {productDetail?.description?.length > MAX_DESCRIPTION_LENGTH && (
          <ButtonForm variant='text' className='text-blue-500 text-sm mt-2' onClick={toggleDescription}>
            {isExpanded ? 'Ẩn bớt' : 'Xem thêm'}
          </ButtonForm>
        )}
      </Stack>
    </Stack>
  );
};

export default ProductDescription;
