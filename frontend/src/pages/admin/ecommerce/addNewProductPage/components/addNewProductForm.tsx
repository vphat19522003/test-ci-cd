import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { AddCircle, AttachMoney, Discount, Inventory, PointOfSale, UploadFile } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';

import { useGetSubCategory } from '@app/api/hooks/category.hook';
import CustomComboBox from '@app/components/atoms/comboBox';
import InputField from '@app/components/atoms/inputField';
import Label from '@app/components/atoms/label';
import NumberField from '@app/components/atoms/numberFormatCustom';
import TextArea from '@app/components/atoms/textArea';
import PageTitle from '@app/components/molecules/admin/pageTitle';
import { useDevice } from '@app/hooks/useDevice';
import { CustomCategoryResponseType } from '@app/types/category';
import { mapCategoryData } from '@app/utils/mapLocationData';

import AddBookForm from './addBookForm';
import AddNewProductAction from './addNewProductAction';
import { AddNewProductFormCustom, AddNewProductFormSchema, AddNewProductFormType } from './schemas';

type AddNewProductFormProps = {
  mainCategory: CustomCategoryResponseType[];
  handleAddNewProduct: (value: AddNewProductFormCustom) => void;
  isAddNewProductPending: boolean;
};

const AddNewProductForm = ({
  mainCategory,
  handleAddNewProduct,
  isAddNewProductPending
}: AddNewProductFormProps): JSX.Element => {
  const [productType, setProductType] = useState('');
  const [subProductType, setSubProductType] = useState('');

  const [thumbnailImage, setThumbnailImage] = useState<File>();
  const [descriptionImages, setDescriptionImages] = useState<File[]>([]);
  const [listSubCategory, setListSubCategory] = useState<CustomCategoryResponseType[]>();
  const { isMobile } = useDevice();

  const { mutate: getSubCategory } = useGetSubCategory();

  const {
    control,
    formState: { errors },
    setValue,
    getValues,
    reset,
    handleSubmit
  } = useForm<AddNewProductFormType>({
    resolver: zodResolver(AddNewProductFormSchema),
    defaultValues: {
      productName: '',
      productPrice: 0,
      productThumbImg: '',
      description: '',
      productDescImg: [],
      category: '',
      stockQuantity: 0,
      author: '',
      page_number: 0,
      publisher: '',
      subCategory: ''
    }
  });

  const handleChangeDescriptionImage = (e: React.ChangeEvent<HTMLInputElement>, index) => {
    const descriptionImages = e.target.files?.[0];
    if (descriptionImages) {
      const newImageURL = URL.createObjectURL(descriptionImages);
      setDescriptionImages((prev) => {
        const updateImages = [...prev];
        //updateImages[index] = newImageURL;
        return updateImages;
      });
    }
  };

  const handleSubmitForm = (value: AddNewProductFormType) => {
    const tempProduct = { ...value, productThumbImg: thumbnailImage as File, productDescImg: descriptionImages };
    console.log({ tempProduct });
    handleAddNewProduct(tempProduct);
  };

  useEffect(() => {
    if (getValues('category')) {
      getSubCategory(getValues('category'), {
        onSuccess: (data) => {
          setSubProductType('');
          setValue('subCategory', '');
          setValue('listSubCategory', data);
          setListSubCategory(data);
        }
      });
    } else {
      setListSubCategory([]);
    }
  }, [productType]);
  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} className='mb-4'>
        <PageTitle />
        <AddNewProductAction
          reset={reset}
          isAddNewProductPending={isAddNewProductPending}
          setProductType={setProductType}
          setSubProducType={setSubProductType}
        />
      </Stack>
      <Stack direction={`${isMobile ? 'column' : 'row'}`} spacing={4}>
        <Stack direction={'column'} spacing={4} className={`${!isMobile && 'w-8/12'}`}>
          {/* General Information */}
          <Stack className='bg-[#f9f9f9] rounded-lg p-4' spacing={4}>
            <Typography variant='subtitle1' className='mb-4 font-medium'>
              General Information
            </Typography>
            <Stack direction='column' className='gap-2'>
              <Label title='Product Name' />
              <Controller
                control={control}
                name='productName'
                render={({ field: { value, onChange } }) => (
                  <InputField
                    value={value}
                    onChange={onChange}
                    error={errors.productName}
                    className='w-full border-8'
                    variant='outlined'
                    borderColorFocus='blue.700'
                    backgroundColor='#eeeeee'
                    autoFocus
                  />
                )}
              />
            </Stack>
            <Stack direction='column' className='gap-2'>
              <Label title='Description' />
              <Controller
                control={control}
                name='description'
                render={({ field: { value, onChange } }) => (
                  <TextArea
                    value={value}
                    onChange={onChange}
                    className='w-full border-8'
                    variant='outlined'
                    borderColorFocus='blue.700'
                    backgroundColor='#eeeeee'
                    error={errors.description}
                    resize
                  />
                )}
              />
            </Stack>
          </Stack>
          {/* Pricing and Stock */}
          <Box className='bg-[#f9f9f9] rounded-lg p-4'>
            <Typography variant='subtitle1' className='mb-4 font-medium'>
              Pricing and Stock
            </Typography>
            {/*  */}
            <Stack direction={`${isMobile ? 'column' : 'row'}`} spacing={2}>
              <Stack className='w-full' spacing={4}>
                <Stack direction='column' className='gap-2'>
                  <Label title='Price' />

                  <Controller
                    control={control}
                    name='productPrice'
                    render={({ field: { value, onChange } }) => (
                      <NumberField
                        value={value}
                        className='w-full border-8'
                        variant='outlined'
                        borderColorFocus='blue.700'
                        backgroundColor='#eeeeee'
                        startAdornment={<AttachMoney />}
                        decimalScale={2}
                        onChange={(e) => {
                          const numericValue = parseFloat(e.target.value) || 0;
                          onChange(numericValue);
                        }}
                        error={errors.productPrice}
                      />
                    )}
                  />
                </Stack>
                <Stack direction='column' className='gap-2'>
                  <Label title='Stock' />
                  <Controller
                    control={control}
                    name='stockQuantity'
                    render={({ field: { value, onChange } }) => (
                      <InputField
                        className='w-full border-8'
                        variant='outlined'
                        borderColorFocus='blue.700'
                        backgroundColor='#eeeeee'
                        type='number'
                        value={value}
                        startAdornment={<Inventory />}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const newValue = Number(e.target.value);

                          if (Number(newValue) >= 0 && Number(newValue) <= 100) {
                            onChange(newValue);
                          }
                        }}
                        error={errors.stockQuantity}
                      />
                    )}
                  />
                </Stack>
              </Stack>
              <Stack className='w-full' spacing={4}>
                <Stack direction='column' className='gap-2'>
                  <Label title='Discount' />
                  <InputField
                    className='w-full border-8'
                    variant='outlined'
                    borderColorFocus='blue.700'
                    backgroundColor='#eeeeee'
                    startAdornment={<Discount />}
                  />
                </Stack>
                <Stack direction='column' className='gap-2'>
                  <Label title='Discount Type' />
                  <InputField
                    className='w-full border-8'
                    variant='outlined'
                    borderColorFocus='blue.700'
                    backgroundColor='#eeeeee'
                    startAdornment={<PointOfSale />}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Box>
          {productType === 'Book' && !isMobile && <AddBookForm control={control} errors={errors} />}
        </Stack>
        <Stack direction={'column'} spacing={4} className={`${!isMobile && 'w-4/12'}`}>
          {/* Upload Images */}
          <Stack className='bg-[#f9f9f9] rounded-lg p-4 min-h-96'>
            <Typography variant='subtitle1' className='mb-4 font-medium'>
              Upload Images
            </Typography>
            <Typography variant='subtitle2' className='mb-4 font-medium'>
              Thumbnail Image
            </Typography>
            <Controller
              control={control}
              name='productThumbImg'
              render={({ field: { value, onChange } }) => (
                <Stack className={'border-[1px] rounded-2xl h-96'} justifyContent={'center'}>
                  <input
                    type='file'
                    id='upload-thumbnail'
                    accept='image/*'
                    hidden
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        const thumbnailImage = URL.createObjectURL(e.target.files?.[0]);
                        onChange(thumbnailImage);
                        setThumbnailImage(e.target.files?.[0]);
                      }
                    }}
                  />
                  {!value && (
                    <label
                      htmlFor='upload-thumbnail'
                      className={`${!!errors.productThumbImg && 'border-red-500'} border-gray-400 px-2 py-2 text-center transition-all duration-300 bg-white border-2  border-dashed cursor-pointer h-96 text-slate-400 rounded-2xl hover:bg-slate-100 hover:text-white`}>
                      <UploadFile className='text-blue-700 mt-36' />
                      <p className='text-blue-700'>Upload product thumbnail</p>
                    </label>
                  )}
                  {!!errors.productThumbImg && <p className='text-sm text-red-500'>Require thumbnail images</p>}
                  {value && (
                    <label
                      htmlFor='upload-thumbnail'
                      className='relative block overflow-hidden text-center transition-all duration-300 bg-white border-2 border-gray-400 border-solid cursor-pointer h-96 text-slate-400 rounded-2xl hover:border-blue-700'>
                      <img src={value} className='object-cover w-full h-96' />
                    </label>
                  )}
                </Stack>
              )}
            />

            <Typography variant='subtitle2' className='my-4 font-medium'>
              Description Images
            </Typography>
            {/* Description Images */}
            <Stack direction={'row'} gap={2}>
              {[...Array(4)].map((_, index) => (
                <Controller
                  control={control}
                  name={`productDescImg.${index}`}
                  key={'description' + index}
                  render={({ field: { value, onChange } }) => (
                    <Stack className={`border-[1px] rounded-2xl w-1/4 ${isMobile ? 'h-24' : 'h-27'}`}>
                      <input
                        type='file'
                        id={`upload-description-${index}`}
                        accept='image/*'
                        hidden
                        onChange={(e) => {
                          handleChangeDescriptionImage(e, index);

                          const descriptionImages = e.target.files?.[0];
                          if (descriptionImages) {
                            setDescriptionImages((prev) => {
                              const updateImages = [...prev];
                              updateImages[index] = descriptionImages;
                              return updateImages;
                            });

                            const newImageURL = URL.createObjectURL(descriptionImages);
                            onChange(newImageURL);
                          }
                        }}
                      />
                      {!value && (
                        <label
                          htmlFor={`upload-description-${index}`}
                          className={`${!!errors?.productDescImg?.[index] && 'border-red-500'} border-gray-400 px-2 py-2 text-center transition-all duration-300 bg-white border-2  border-dashed cursor-pointer ${isMobile ? 'h-24' : 'h-27'} grow text-slate-400 rounded-2xl hover:bg-slate-100 hover:text-white`}>
                          <AddCircle className='text-3xl text-blue-700 mt-7' />
                        </label>
                      )}
                      {value && (
                        <label
                          htmlFor={`upload-description-${index}`}
                          className={`relative flex overflow-hidden text-center transition-all duration-300 bg-white border-2 border-gray-400 border-solid cursor-pointer ${isMobile ? 'h-24' : 'h-27'} text-slate-400 rounded-2xl hover:border-blue-700`}>
                          <img src={value} className='object-cover w-full h-full' />
                        </label>
                      )}
                    </Stack>
                  )}
                />
              ))}
            </Stack>
            {!!errors?.productDescImg && <p className='text-sm text-red-500'>{errors.productDescImg.message}</p>}
          </Stack>
          {/* Category */}
          <Stack className='bg-[#f9f9f9] rounded-lg p-4'>
            <Typography variant='subtitle1' className='mb-4 font-medium'>
              Category
            </Typography>
            <Typography variant='subtitle2' className='my-4 font-medium'>
              Product Category
            </Typography>
            <Controller
              control={control}
              name='category'
              render={({ field: { onChange, value } }) => (
                <CustomComboBox
                  label='Category'
                  value={value}
                  data={mapCategoryData(mainCategory)}
                  onChange={(e, newValue) => {
                    if (React.isValidElement(newValue)) {
                      const label = newValue.props.children;
                      setProductType(label);
                      onChange(e.target.value);
                      setValue('categoryLabel', label);
                    }
                  }}
                  error={errors.category}
                />
              )}
            />
            {listSubCategory && listSubCategory?.length > 0 && (
              <>
                <Typography variant='subtitle2' className='my-2 font-medium'>
                  Sub Category
                </Typography>
                <Controller
                  control={control}
                  name='subCategory'
                  render={({ field: { onChange, value } }) => (
                    <CustomComboBox
                      label='Sub Category'
                      value={value}
                      data={mapCategoryData(listSubCategory)}
                      onChange={(e, newValue) => {
                        if (React.isValidElement(newValue)) {
                          const label = newValue.props.children;
                          setSubProductType(label);
                          onChange(e.target.value);
                          setValue('subCategoryLabel', label);
                        }
                      }}
                      error={errors.subCategory}
                    />
                  )}
                />
              </>
            )}
          </Stack>
          {productType === 'Book' && isMobile && <AddBookForm control={control} errors={errors} />}
        </Stack>
      </Stack>
    </form>
  );
};

export default AddNewProductForm;
