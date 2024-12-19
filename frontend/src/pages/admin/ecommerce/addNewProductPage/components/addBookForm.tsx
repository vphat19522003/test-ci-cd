import { Control, Controller, FieldErrors } from 'react-hook-form';

import { AssignmentInd, CoPresent, MenuBook } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';

import InputField from '@app/components/atoms/inputField';
import Label from '@app/components/atoms/label';
import { useDevice } from '@app/hooks/useDevice';

import { AddNewProductFormType } from './schemas';

type AddBookFormPropsType = {
  control: Control<AddNewProductFormType>;
  errors: FieldErrors<AddNewProductFormType>;
};

const AddBookForm = ({ control, errors }: AddBookFormPropsType): JSX.Element => {
  const { isMobile } = useDevice();
  return (
    <Box className='bg-[#f9f9f9] rounded-lg p-4'>
      <Typography variant='subtitle1' className='mb-4 font-medium'>
        Book Information
      </Typography>
      <Stack direction={`${isMobile ? 'column' : 'row'}`} spacing={4}>
        <Stack className='w-full'>
          <Stack direction='column' className='gap-2 mb-4'>
            <Label title='Author' />
            <Controller
              control={control}
              name='author'
              render={({ field: { value, onChange } }) => (
                <InputField
                  value={value}
                  onChange={onChange}
                  className='w-full border-8'
                  variant='outlined'
                  borderColorFocus='blue.700'
                  backgroundColor='#eeeeee'
                  startAdornment={<AssignmentInd />}
                  error={errors.author}
                />
              )}
            />
          </Stack>
          <Stack direction='column' className='gap-2'>
            <Label title='Page Number' />
            <Controller
              control={control}
              name='page_number'
              render={({ field: { value, onChange } }) => (
                <InputField
                  className='w-full border-8'
                  variant='outlined'
                  borderColorFocus='blue.700'
                  backgroundColor='#eeeeee'
                  type='number'
                  value={value}
                  startAdornment={<MenuBook />}
                  max={2000}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const newValue = Number(e.target.value);

                    if (Number(newValue) >= 0 && Number(newValue) <= 2000) {
                      onChange(newValue);
                    }
                  }}
                  error={errors.page_number}
                />
              )}
            />
          </Stack>
        </Stack>
        <Stack className='w-full'>
          <Stack direction='column' className='gap-2'>
            <Label title='Publisher' />
            <Controller
              control={control}
              name='publisher'
              render={({ field: { value, onChange } }) => (
                <InputField
                  value={value}
                  onChange={onChange}
                  className='w-full border-8'
                  variant='outlined'
                  borderColorFocus='blue.700'
                  backgroundColor='#eeeeee'
                  startAdornment={<CoPresent />}
                  error={errors.publisher}
                />
              )}
            />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AddBookForm;
