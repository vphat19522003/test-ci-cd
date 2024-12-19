import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { AddAPhoto, HighlightOff } from '@mui/icons-material';
import { Box, IconButton, Rating, Stack, Typography } from '@mui/material';

import ButtonForm from '@app/components/atoms/button';
import TextArea from '@app/components/atoms/textArea';
import { getProductDetailCustom } from '@app/pages/admin/ecommerce/addNewProductPage/components/schemas';

import { addNewCommentFormSchemas, AddNewCommentFormType } from './schemas';

type CommentFormProps = {
  productDetail?: getProductDetailCustom;
  handleAddComment: (comment: AddNewCommentFormType) => void;
  isPending: boolean;
};

export const commentRatelabels: { [index: string]: string } = {
  1: 'Bad+',
  2: 'Bad',
  3: 'Normal',
  4: 'Good',
  5: 'Excellent'
};
const CommentForm = ({ productDetail, handleAddComment, isPending }: CommentFormProps): JSX.Element => {
  const [listCommentImg, setListCommentImg] = useState<{ item: File; url: string }[]>([]);

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors }
  } = useForm<AddNewCommentFormType>({
    resolver: zodResolver(addNewCommentFormSchemas),
    defaultValues: {
      content: '',
      comment_vote: 5,
      comment_images: []
    }
  });

  const handleSubmitComment = (value: AddNewCommentFormType) => {
    handleAddComment(value);
  };

  const handleRemoveCommentImg = (image: { item: File; url: string }) => {
    const filterImgList = listCommentImg.filter((img) => img.item.name !== image.item.name);

    setValue(
      'comment_images',
      filterImgList.map((img) => img.item)
    );
    setListCommentImg(filterImgList);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitComment)}>
      <Stack>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
          <img
            src={productDetail?.productThumbImg.url}
            alt=''
            style={{
              width: '140px',
              height: '140px',
              objectFit: 'contain'
            }}
          />
        </Box>
        <Typography style={{ textAlign: 'center', marginTop: '10px', fontSize: '20px', fontWeight: 'bold' }}>
          {productDetail?.productName}
        </Typography>
        <Controller
          control={control}
          name='comment_vote'
          render={({ field: { value } }) => (
            <Stack
              direction={'row'}
              justifyContent={'center'}
              spacing={4}
              alignItems={'center'}
              style={{ marginBottom: '16px' }}>
              <Box
                style={{
                  position: 'relative'
                }}>
                <Rating
                  name='rating'
                  precision={1}
                  size='large'
                  style={{
                    fontSize: '2rem'
                  }}
                  value={value}
                  onChange={(event, newValue) => {
                    console.log(newValue);
                    if (newValue === null) {
                      console.log(newValue);
                    } else {
                      setValue('comment_vote', newValue);
                    }
                  }}
                />
                <span style={{ position: 'absolute', right: 'auto', top: 6, color: '#faaf00', marginLeft: '4px' }}>
                  {commentRatelabels[getValues('comment_vote')]}
                </span>
              </Box>
            </Stack>
          )}
        />

        <Controller
          control={control}
          name='content'
          render={({ field: { onChange, value } }) => (
            <TextArea
              variant='outlined'
              borderColorFocus='blue.700'
              backgroundColor='white'
              placeholder='Nêu cảm nhận của bạn về sản phẩm'
              size='small'
              style={{
                maxHeight: '90px !important',
                fontSize: '14px'
              }}
              value={value}
              onChange={onChange}
              error={errors.content}
            />
          )}
        />

        <Stack direction={'row'} justifyContent={'flex-end'}>
          <Controller
            control={control}
            name='comment_images'
            render={({ field: { value, onChange } }) => (
              <Stack spacing={2}>
                <Stack>
                  <input
                    type='file'
                    id='upload-comment-images'
                    accept='.jpg,.jpeg,.png'
                    hidden
                    multiple
                    onChange={(e) => {
                      const descriptionImages = e.target.files;
                      if (descriptionImages && descriptionImages.length > 0) {
                        if (descriptionImages.length > 3) {
                          alert('Please select 3 images at max');
                        }

                        const tempArrImg = Array.from(descriptionImages)
                          .slice(0, 3)
                          .map((img) => ({
                            url: URL.createObjectURL(img),
                            item: img
                          }));

                        const customArr = [...tempArrImg, ...listCommentImg].slice(0, 3);

                        setListCommentImg(customArr);
                        onChange(customArr.map((imgObj) => imgObj.item));
                      }
                    }}
                  />

                  <label htmlFor='upload-comment-images'>
                    <Stack direction={'row'} spacing={2} alignItems={'center'} style={{ marginTop: '6px' }}>
                      <AddAPhoto
                        style={{
                          color: '#1D4ED8'
                        }}
                      />
                      <p
                        style={{
                          color: '#1D4ED8',
                          fontSize: '12px'
                        }}>
                        Gửi ảnh thực tế <span>(Tối đa 3 ảnh)</span>
                      </p>
                    </Stack>
                  </label>
                </Stack>

                {listCommentImg.length > 0 && (
                  <Stack direction={'row'} spacing={2}>
                    {listCommentImg.map((item, index) => (
                      <Stack
                        key={index}
                        style={{
                          position: 'relative'
                        }}>
                        <img
                          src={item.url}
                          style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'cover'
                          }}
                        />
                        <IconButton
                          style={{
                            width: '20px',
                            height: '20px',
                            position: 'absolute',
                            right: '0',
                            top: '-10px',
                            backgroundColor: 'white'
                          }}
                          onClick={() => handleRemoveCommentImg(item)}>
                          <HighlightOff />
                        </IconButton>
                      </Stack>
                    ))}
                  </Stack>
                )}
              </Stack>
            )}
          />
        </Stack>
        <ButtonForm variant='contained' style={{ marginTop: '16px' }} type='submit' disabled={isPending}>
          Gửi đánh giá
        </ButtonForm>
      </Stack>
    </form>
  );
};

export default CommentForm;
