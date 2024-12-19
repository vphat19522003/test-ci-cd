import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { UploadFile } from '@mui/icons-material';
import { Button, Stack, Switch } from '@mui/material';

import ButtonForm from '@app/components/atoms/button';
import InputField from '@app/components/atoms/inputField';
import Label from '@app/components/atoms/label';
import TextArea from '@app/components/atoms/textArea';
import { CustomCategoryResponseType } from '@app/types/category';

import { AddNewCategoryFormCustom, AddNewCategoryFormSchema, AddNewCategoryFormType } from './schemas';

type CategoryFormPropsType = {
  handleAddMainCategory: (categoryValue: AddNewCategoryFormCustom) => void;
  handleCloseDialog: () => void;
  isPending: boolean;
  mode: 'Add' | 'Edit';
};

const CategoryForm = ({
  handleAddMainCategory,
  handleCloseDialog,
  isPending,
  name,
  description,
  categoryImg,
  mode
}: CategoryFormPropsType & CustomCategoryResponseType): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<AddNewCategoryFormType>({
    resolver: zodResolver(AddNewCategoryFormSchema),
    defaultValues: {
      name,
      description,
      categoryImg: categoryImg.category_img_url
    }
  });

  const [categoryImgFile, setCategoryImage] = useState<File>();

  const handleSubmitCategory = (category: AddNewCategoryFormType) => {
    handleAddMainCategory({ ...category, categoryImg: categoryImgFile as File });
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitCategory)}>
      <Stack direction={'column'} spacing={3}>
        <Stack direction='column' spacing={2}>
          <Label title='Name' />
          <Controller
            control={control}
            name='name'
            render={({ field: { value, onChange } }) => (
              <InputField
                value={value}
                className='w-full border-8'
                variant='outlined'
                autoFocus
                borderColorFocus='blue.700'
                backgroundColor='white'
                placeholder='Enter category name'
                onChange={onChange}
                error={errors.name}
              />
            )}
          />
        </Stack>
        <Stack direction='column' spacing={2}>
          <Label title='Description' />
          <Controller
            control={control}
            name='description'
            render={({ field: { value, onChange } }) => (
              <TextArea
                className='w-full border-8 text-md'
                variant='outlined'
                borderColorFocus='blue.700'
                backgroundColor='white'
                placeholder='Enter category description'
                resize
                value={value}
                onChange={onChange}
                error={errors.description}
              />
            )}
          />
        </Stack>

        <Label title='Category Image' />
        <Controller
          control={control}
          name='categoryImg'
          render={({ field: { value, onChange } }) => (
            <Stack className={'border-[1px] rounded-2xl h-96 max-w-fit'} justifyContent={'center'}>
              <input
                type='file'
                id='upload-thumbnail'
                accept='image/*'
                hidden
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    const categoryImage = URL.createObjectURL(e.target.files?.[0]);
                    onChange(categoryImage);
                    setCategoryImage(e.target.files?.[0]);
                  }
                }}
              />
              {!value && (
                <label
                  htmlFor='upload-thumbnail'
                  style={{
                    width: '160px',
                    height: '160px',
                    textAlign: 'center',
                    transition: 'all 0.3s',
                    backgroundColor: 'white',
                    borderColor: errors.categoryImg ? 'red' : '#cbd5e1',
                    borderStyle: 'dashed',
                    cursor: 'pointer',
                    borderWidth: '1px',
                    color: '#94a3b8',
                    borderRadius: '1rem'
                  }}>
                  <UploadFile
                    style={{
                      marginTop: '60px'
                    }}
                  />
                  <p
                    style={{
                      marginTop: '6px'
                    }}>
                    Upload image
                  </p>
                </label>
              )}
              {!!errors.categoryImg && (
                <p
                  style={{
                    fontSize: '12px',
                    color: 'red'
                  }}>
                  Require category image
                </p>
              )}
              {value && (
                <label
                  htmlFor='upload-thumbnail'
                  style={{
                    position: 'relative',
                    display: 'block',
                    overflow: 'hidden',
                    textAlign: 'center',
                    transition: 'all 0.3s',
                    backgroundColor: 'white',
                    borderWidth: '2px',
                    borderColor: '#cbd5e1',
                    borderStyle: 'solid',
                    cursor: 'pointer',
                    width: '160px',
                    height: '160px',
                    color: '#94a3b8',
                    borderRadius: '1rem'
                  }}>
                  <img
                    src={value}
                    style={{
                      objectFit: 'cover',
                      width: '160px',
                      height: '160px'
                    }}
                  />
                </label>
              )}
            </Stack>
          )}
        />

        {/* PENDING - NOT USE AT THIS TIME */}
        <Stack direction='column'>
          <Label title='Enabled' />
          <Switch />
        </Stack>
        <Stack direction={'row'} justifyContent={'flex-end'} spacing={1}>
          <Button color='secondary' onClick={handleCloseDialog}>
            Cancel
          </Button>

          <ButtonForm variant='contained' type='submit' disabled={isPending}>
            {mode}
          </ButtonForm>
        </Stack>
      </Stack>
    </form>
  );
};

export default CategoryForm;
